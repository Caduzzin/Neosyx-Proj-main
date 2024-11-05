"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="w-full">
      <div className="flex flex-col max-w-md p-4 mx-auto text-center text-black bg-[#333333ff]"
      style={{ boxShadow: '4px 15px 10px rgba(0, 0, 0, 0.233)', zIndex: 1, borderRadius: '10px' }}
      >
        <h1 className="mb-4 text-white font-bold">Login</h1>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleLogin}
        >
          <input id="InputLogReg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-black bg-[#4b4b4b] border border-[#6b6b6b] outline-none "
            type="text"
            placeholder="Digite seu email"
            autoComplete="new-email"
          />
          <input id="InputLogReg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-black bg-[#4b4b4b] border border-[#6b6b6b] outline-none"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="new-password"
          />
          <button id="RegLogButton"
            className="px-4 py-2 font-bold text-white bg-blue-600 max-w-32"
            type="submit"
          >
            Login
          </button>

          <p className="text-white">Não tem uma conta?</p>
          <a className="text-blue-600" href="/register">Clique aqui</a>

          <p className="text-red-600">{error?.message}</p>
        </form>
      </div>
    </main>
  );
};

export default Page;
