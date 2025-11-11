"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MedidasPage() {
  const router = useRouter();
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const verificar = (r) => {
    setRespuesta(r);
    if (r === "30 cm") {
      setMensaje("✅ ¡Correcto!");
    } else {
      setMensaje("❌ Vuelve a intentarlo");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eef2ff] p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 flex items-center text-indigo-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-indigo-600 mb-6">📏 Medidas</h1>

      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-6">
          ¿Cuánto mide una regla estándar?
        </h2>
        <div className="flex flex-col gap-3">
          {["15 cm", "30 cm", "1 metro"].map((r) => (
            <button
              key={r}
              onClick={() => verificar(r)}
              className="border border-gray-300 hover:border-indigo-500 text-gray-700 rounded-lg py-2 transition"
            >
              {r}
            </button>
          ))}
        </div>
        {mensaje && (
          <p className="mt-4 text-lg font-semibold text-gray-700">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
