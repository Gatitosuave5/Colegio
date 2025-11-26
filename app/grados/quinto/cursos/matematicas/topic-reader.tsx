"use client";

import { useEffect, useState } from "react";
import { Card } from "./card";
import { ArrowLeft } from 'lucide-react';

export default function TopicReader({
  topic,
  onQuizStart,
  onGamesStart,
  onBack,
}) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const key = `math_unlock_${topic.id}`;
    const isUnlocked = localStorage.getItem(key) === "true";
    setUnlocked(isUnlocked);
  }, [topic.id]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div>
          <h2 className="text-3xl font-bold text-gray-900">{topic.title}</h2>
        </div>
      </div>

      {/* EXPLICACIÓN */}
      <p className="text-gray-700 leading-relaxed text-lg mb-6">
        {topic.explanation}
      </p>

      {/* IMAGEN — SIEMPRE CENTRADA */}
      <div className="w-full flex justify-center mb-10">
        <img
          src={topic.image || "/placeholder.svg"}
          alt="Imagen del tema"
          className="w-full max-w-2xl rounded-2xl shadow-md border object-contain"
        />
      </div>

      {/* CONTENIDO */}
      <Card className="bg-white shadow-lg p-6 rounded-2xl mb-8">
        <h3 className="text-xl mb-4 text-black">Ejemplos</h3>

        <div className="space-y-4">
          {topic.examples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-xl"
            >
              <p className="text-black font-semibold">{ex.operation}</p>
              <p className="text-black">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* BOTONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold"
        >
          Resolver Cuestionario
        </button>

        <button
          onClick={() => unlocked && onGamesStart()}
          disabled={!unlocked}
          className={`
            font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
            ${
              unlocked
                ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          🎮 Juegos Interactivos
          {!unlocked && (
            <span className="text-xs ml-2">(Obtén 70% para desbloquear)</span>
          )}
        </button>
      </div>
    </div>
  );
}
