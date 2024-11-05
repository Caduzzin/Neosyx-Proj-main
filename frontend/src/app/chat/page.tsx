
'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";

export default function Page() {
  const room = 'general';
  const { user } = useAuth();
  const { selectedUser } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/auth/getMessages');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }

      const data = await response.json();

      setMessages(data);

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {

    getMessages();

    if (!selectedUser || !user) return;

    socket.emit("join-room", selectedUser.id);
    socket.emit("join-room", user.id);
    console.log("Usuário conectado ao socket:", user);

    socket.on("message", (msg) => {
      console.log("Mensagem recebida:", msg);

      setMessages((prev) => [...prev, msg]);
      getMessages();
    });

    return () => {
      socket.off("message");
    };
  }, [selectedUser, user]);

  const sendMessage = async () => {
    if (!messageContent.trim()) return;
  
    let newMessage: Message = {
      to: selectedUser as User,
      sender: user as User,
      content: messageContent,
    };
  
    try {
      const response = await fetch('http://localhost:8888/api/auth/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar a mensagem');
      }
  
      socket.emit("message", { to: selectedUser, message: newMessage });
      setMessageContent("");

      setMessages((prev) => [...prev, newMessage]);
      getMessages();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const filteredMessages = messages.filter((message) => 
    (message.from_user_id === user?.id && message.to_user_id === selectedUser?.id) || 
    (message.from_user_id === selectedUser?.id && message.to_user_id === user?.id)
  );

  return (
    selectedUser && (
      <main id="BGChat" className="flex flex-col justify-between min-h-screen h-full w-full flex-1">
        <div className="flex flex-col w-full p-3 text-black overflow-y-scroll">
        {filteredMessages.map((message, index) => {
            const showName = index === 0 || message.from_user_id !== filteredMessages[index - 1].from_user_id;

            return (
                <div key={index} className={`flex flex-row w-full ${message.from_user_id === user?.id ? "justify-end" : "justify-start"}`}>
                    <div id="MessageChat"
                      className={`mt-1 ${message.from_user_id === user?.id ? "bg-[#008069]" : "bg-gray-600"} rounded-lg w-fit`} >
                        {showName && (
                            <span className="p-2 font-bold text-green-300">
                                ~ {message.username}
                            </span>
                        )}
                        <p className="px-2 mt-2 font-medium text-right text-white rounded-md w-fit">
                            {message.message}
                        </p>
                    </div>
                </div>
            );
        })}
        </div>
        <div className="flex items-center p-2">
        <input id="InputChat"
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg outline-none"
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
            className="px-4 py-2 bg-[#008069] text-white rounded-r-lg"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      </main>
    )
  );
}
