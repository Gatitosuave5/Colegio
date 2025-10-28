"use client";
import React, { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await res.json();
      setCargando(false);

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", data.usuario);
      window.location.href = "/profesor/panel";

    } catch (error) {
      alert("No se pudo conectar con el servidor");
      setCargando(false);
    }
  };

  return (
    // 🔹 Fondo con blur y opacidad, sin poner negro sólido
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">

      {/* Modal con animación desde arriba */}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-80 text-center animate-slideDown">

        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Inicio de sesión para profesores
        </h2>

        <form onSubmit={manejarLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>

          <button
            type="button"
            className="text-gray-500 text-xs mt-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
