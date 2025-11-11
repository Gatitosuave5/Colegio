"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MultiplicacionPage() {
  const router = useRouter();
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const verificar = () => {
    if (parseInt(respuesta) === num1 * num2) {
      setMensaje("✅ ¡Correcto!");
    } else {
      setMensaje("❌ Inténtalo nuevamente");
    }
  };

  const siguiente = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setRespuesta("");
    setMensaje("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8ec] p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 flex items-center text-yellow-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-yellow-600 mb-6">
        ✖️ Multiplicación
      </h1>

      <div className="bg-white shadow-md rounded-xl p-8 text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {num1} × {num2} = ?
        </h2>
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          className="border rounded-lg p-2 text-center text-lg w-24"
          placeholder="?"
        />
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={verificar}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Verificar
          </button>
          <button
            onClick={siguiente}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Siguiente
          </button>
        </div>
        {mensaje && (
          <p className="mt-4 text-lg font-semibold text-gray-700">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
