"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginProfesor() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === "profesor" && contraseña === "1234") {
      router.push("/panel?v=DFa8lJ92aLkj23D");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Iniciar sesión como profesor
        </h2>
        <form onSubmit={manejarLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

