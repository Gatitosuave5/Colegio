"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">

      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-96 md:w-[500px] text-center animate-slideDown">

        {/* Botón X en esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Inicio de sesión para profesores
        </h2>

        <form onSubmit={manejarLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />

          <div className="relative">
            <input
              type={mostrarContraseña ? "text" : "password"}
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="border rounded px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
              aria-label={mostrarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-base"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>

        </form>
      </div>
    </div>
  );
}
