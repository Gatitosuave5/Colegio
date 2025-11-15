"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "./card";

// Importar cada juego individual
import MemoryGame from "./memory-game";
import OrderGame from "./order-game";
import FastGame from "./fast-game";

// Componente principal de Juegos
export default function TopicGames({ topic, onBack }) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // juegos disponibles
  const games = [
    {
      id: "memory",
      name: "Juego de Memoria",
      icon: "🧠",
      description: "Empareja operaciones y resultados.",
      component: MemoryGame,
    },
    {
      id: "order",
      name: "Ordena los Números",
      icon: "📊",
      description: "Acomoda los números de menor a mayor.",
      component: OrderGame,
    },
    {
      id: "fast",
      name: "Resuelve Rápido",
      icon: "⚡",
      description: "Responde antes que acabe el tiempo.",
      component: FastGame,
    },
  ];

  // seleccionar juego por gameId del topic
  const selectedGame = games.find((g) => g.id === topic.gameId);

  // si ya estamos dentro de un juego
  if (activeGame && selectedGame) {
    const GameComponent = games.find((g) => g.id === activeGame)?.component;
    return <GameComponent topic={topic} onBack={() => setActiveGame(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-black">Juego Interactivo</h2>

        <div className="w-10"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {selectedGame && (
          <button
            onClick={() => setActiveGame(selectedGame.id)}
            className="group hover:scale-105 transition"
          >
            <Card className="bg-gradient-to-br from-purple-400 to-pink-400 text-white p-8 rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">{selectedGame.icon}</div>
              <h3 className="text-2xl font-bold text-left">{selectedGame.name}</h3>
              <p className="text-left opacity-90">{selectedGame.description}</p>
            </Card>
          </button>
        )}
      </div>
    </div>
  );
}
