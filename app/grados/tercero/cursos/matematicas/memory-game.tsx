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

    if (topic.id === "multiplicacion") {
      const pairs = [
        { op: "6×7", result: "42" },
        { op: "8×9", result: "72" },
        { op: "7×7", result: "49" },
        { op: "9×8", result: "72" },
        { op: "10×5", result: "50" },
        { op: "6×8", result: "48" },
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
    else if (topic.id === "perimetro") {
      const pairs = [
        { desc: "Cuadrado lado 5 cm", result: "20 cm" },
        { desc: "Rectángulo 5×3 cm", result: "16 cm" },
        { desc: "Triángulo equilátero lado 5 cm", result: "15 cm" },
        { desc: "Cuadrado lado 7 cm", result: "28 cm" },
        { desc: "Rectángulo 8×2 cm", result: "20 cm" },
        { desc: "Triángulo lados 4,5,6 cm", result: "15 cm" },
      ];
      gameCards = pairs.flatMap((pair, idx) => [
        {
          id: `desc-${idx}`,
          value: pair.desc,
          type: "operation" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `result-${idx}`,
          value: pair.result,
          type: "result" as const,
          pairId: `pair-${idx}`,
          isFlipped: false,
          isMatched: false,
        },
      ]);
    }
    else if (topic.id === "figuras-geometricas") {
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
    }
    else if (topic.id === "suma-resta-llevadas") {
      const pairs = [
        { op: "234+178", result: "412" },
        { op: "567-234", result: "333" },
        { op: "456+345", result: "801" },
        { op: "789-456", result: "333" },
        { op: "678+234", result: "912" },
        { op: "567-189", result: "378" },
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
