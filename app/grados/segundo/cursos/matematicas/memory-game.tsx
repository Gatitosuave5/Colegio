"use client";

import { useState, useEffect } from "react";
import { Card } from "./card";
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface MemoryCard {
  id: string;
  value: string;
  type: "operation" | "result";
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame({ topic, onBack }) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [topic]);

  const initializeGame = () => {
    let gameCards: MemoryCard[] = [];

    if (topic.id === "sumas-llevadas") {
      const pairs = [
        { op: "15+17", result: "32" },
        { op: "27+25", result: "52" },
        { op: "19+14", result: "33" },
        { op: "26+18", result: "44" },
        { op: "28+13", result: "41" },
        { op: "24+17", result: "41" },
      ];
      gameCards = pairs.flatMap((pair, idx) => [
        {
          id: `op-${idx}`,
          value: pair.op,
          type: "operation" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `res-${idx}`,
          value: pair.result,
          type: "result" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
      ]);
    } else if (topic.id === "figuras-lados") {
      const pairs = [
        { shape: "🔷 Triángulo", desc: "3 lados" },
        { shape: "⬜ Cuadrado", desc: "4 lados iguales" },
        { shape: "▭ Rectángulo", desc: "Lados opuestos" },
        { shape: "🟠 Círculo", desc: "Sin lados" },
        { shape: "⬠ Hexágono", desc: "6 lados" },
        { shape: "⭐ Pentágono", desc: "5 lados" },
      ];
      gameCards = pairs.flatMap((pair, idx) => [
        {
          id: `shape-${idx}`,
          value: pair.shape,
          type: "operation" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `desc-${idx}`,
          value: pair.desc,
          type: "result" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
      ]);
    } else if (topic.id === "tablas-1-5") {
      const pairs = [
        { op: "2×3", result: "6" },
        { op: "3×4", result: "12" },
        { op: "5×2", result: "10" },
        { op: "4×3", result: "12" },
        { op: "5×4", result: "20" },
        { op: "3×5", result: "15" },
      ];
      gameCards = pairs.flatMap((pair, idx) => [
        {
          id: `op-${idx}`,
          value: pair.op,
          type: "operation" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `res-${idx}`,
          value: pair.result,
          type: "result" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
      ]);
    }

    gameCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: string) => {
    if (flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find((c) => c.id === newFlipped[0]);
      const card2 = cards.find((c) => c.id === newFlipped[1]);

      setMoves(moves + 1);

      if (card1?.pairId === card2?.pairId) {
        setMatched([...matched, card1.id, card2.id]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-black/10 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h2 className="text-2xl font-bold text-black">🧠 Juego de Memoria</h2>
        <button
          onClick={initializeGame}
          className="p-2 hover:bg-blue-100 rounded-lg transition"
        >
          <RefreshCw className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      <Card className="p-4 bg-blue-50 text-center">
        <p className="text-lg font-semibold text-black">Movimientos: {moves}</p>
      </Card>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              h-24 rounded-lg font-bold text-xl transition-all
              ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-white border-2 border-green-400 cursor-default text-black"
                  : "bg-gradient-to-br from-purple-400 to-pink-400 hover:scale-105 cursor-pointer text-white"
              }
            `}
          >
            {flipped.includes(card.id) || matched.includes(card.id)
              ? card.value
              : "?"}
          </button>
        ))}
      </div>

      {gameWon && (
        <Card className="p-6 bg-green-100 text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">¡Ganaste! 🎉</h3>
          <p className="text-green-600 mb-4">
            Lo completaste en {moves} movimientos
          </p>
          <button
            onClick={initializeGame}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Jugar de nuevo
          </button>
        </Card>
      )}
    </div>
  );
}
