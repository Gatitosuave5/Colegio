"use client";
import React, { useState } from "react";

// Este componente se mostrará cuando el usuario haga clic en “Profesores”
// Puedes personalizar los campos o el estilo más adelante.

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === "profesor" && contraseña === "1234") {
      window.location.href = "/profesor"; // Redirige al panel del profesor
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-bold text-blue-700 mb-4">Inicio de sesión para profesores</h2>
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
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 text-xs mt-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
