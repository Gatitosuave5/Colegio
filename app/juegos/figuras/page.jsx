"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FigurasPage() {
  const router = useRouter();
  const figuras = [
    { nombre: "Triángulo", color: "border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-blue-400" },
    { nombre: "Cuadrado", color: "bg-yellow-400 w-24 h-24" },
    { nombre: "Círculo", color: "bg-pink-400 w-24 h-24 rounded-full" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf5ff] p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 flex items-center text-purple-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-purple-600 mb-6">🔺 Figuras 2D</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {figuras.map((fig, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`flex items-center justify-center ${fig.color}`} />
            <p className="mt-4 text-gray-800 font-semibold">{fig.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
