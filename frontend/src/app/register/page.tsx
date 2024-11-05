"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { register, error } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, username, password, passwordConfirmation);
  };

  return (
    <main className="w-full">
      <div className="flex flex-col max-w-md p-4 mx-auto text-center text-black bg-[#333333ff]"
      style={{ boxShadow: '4px 15px 10px rgba(0, 0, 0, 0.233)', zIndex: 1, borderRadius: '10px' }}>
        <h1 className="mb-4 text-white font-bold">Página de Registro</h1>
        <form className="flex flex-col items-center gap-4" onSubmit={handleRegister}>
          <input id="InputLogReg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none"
            type="text"
            placeholder="Digite seu nome"
            required
          />
          <input id="InputLogReg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none"
            type="email"
            placeholder="Digite seu email"
            autoComplete="new-password"
            required
          />
          <input id="InputLogReg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="new-password"
            required
          />
          <input id="InputLogReg"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 text-black bg-white border border-gray-300 outline-none"
            type="password"
            placeholder="Confirme sua senha"
            required
          />
          <button id="RegLogButton"
            className="px-4 py-2 font-bold text-white bg-[#0044ff] max-w-32"
            type="submit"
            style={{ boxShadow: '4px 5px 10px rgba(0, 0, 0, 0.233)', zIndex: 1, borderRadius: '10px' }}
          >
            Registrar
          </button>

          <p className="text-white">Ja tem uma conta?</p>
          <a className="text-blue-600" href="/login">Clique aqui</a>
          

          {error && <p className="text-red-600">{error.message}</p>}
        </form>
      </div>
    </main>
  );
};

export default Page;
