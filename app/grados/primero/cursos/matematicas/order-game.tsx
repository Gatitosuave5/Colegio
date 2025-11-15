"use client";

import { useState, useEffect } from "react";
import { Card } from "./card";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface OrderItem {
  id: string;
  value: string | number;
  displayValue: string;
}

export default function OrderGame({ topic, onBack }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [userOrder, setUserOrder] = useState<OrderItem[]>([]);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateRound();
  }, [topic]);

  const generateRound = () => {
    let newItems: OrderItem[] = [];

    if (topic.id === "restas-1-10") {
      type Operation = {
        val: number;
        display: string;
      };

      const operations: Operation[] = [
        { val: 9, display: "9 - 2" },
        { val: 5, display: "8 - 3" },
        { val: 7, display: "10 - 3" },
        { val: 3, display: "5 - 2" },
        { val: 4, display: "6 - 2" },
      ];

      newItems = operations.map((op, idx) => ({
        id: `op-${idx}`,
        value: op.val,
        displayValue: op.display,
      }));
    } else if (topic.id === "clasificacion") {
      const animals = [
        { val: 1, display: "🦁 León" },
        { val: 2, display: "🐘 Elefante" },
        { val: 3, display: "🦒 Jirafa" },
        { val: 4, display: "🦓 Cebra" },
        { val: 5, display: "🦏 Rinoceronte" },
      ];
      newItems = animals.map((animal, idx) => ({
        id: `animal-${idx}`,
        value: animal.val,
        displayValue: animal.display,
      }));
    } else if (topic.id === "mayor-menor") {
      const numbers = [
        { val: 3, display: "3" },
        { val: 15, display: "15" },
        { val: 7, display: "7" },
        { val: 20, display: "20" },
        { val: 9, display: "9" },
      ];
      newItems = numbers.map((num, idx) => ({
        id: `num-${idx}`,
        value: num.val,
        displayValue: num.display,
      }));
    } else if (topic.id === "ordenar") {
      const numbers = [
        { val: 5, display: "5" },
        { val: 12, display: "12" },
        { val: 3, display: "3" },
        { val: 18, display: "18" },
        { val: 8, display: "8" },
      ];
      newItems = numbers.map((num, idx) => ({
        id: `num-${idx}`,
        value: num.val,
        displayValue: num.display,
      }));
    }

    newItems = newItems.sort(() => Math.random() - 0.5);
    setItems(newItems);
    setUserOrder([]);
    setRounds(rounds + 1);
  };

  const handleDragStart = (e: React.DragEvent, item: OrderItem) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const item = items.find((i) => i.id === itemId);
    if (item && !userOrder.find((i) => i.id === itemId)) {
      setUserOrder([...userOrder, item]);
    }
  };

  const removeFromOrder = (id: string) => {
    setUserOrder(userOrder.filter((i) => i.id !== id));
  };

  const checkOrder = () => {
  if (userOrder.length !== items.length) return;

  const isCorrect = userOrder.every(
    (item, idx, arr) =>
      idx === 0 || Number(arr[idx - 1].value) <= Number(item.value)
  );

  if (isCorrect) {
    setScore(score + 1);
    setTimeout(() => generateRound(), 1500);
  }
};


  const completeGame = () => {
    setGameComplete(true);
  };

  if (gameComplete) {
    return (
      <Card className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">¡Completaste el juego! 🎉</h2>
        <p className="text-xl mb-6 text-black font-semibold">
          Acertaste <span className="font-bold text-purple-600">{score}</span>{" "}
          de <span className="font-bold">{rounds}</span> rondas
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
          >
            Volver
          </button>
          <button
            onClick={() => {
              setScore(0);
              setRounds(0);
              setGameComplete(false);
              generateRound();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Jugar de nuevo
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-black">
          📊 Ordenar de Menor a Mayor
        </h2>
        <div className="w-8"></div>
      </div>

      <Card className="p-4 bg-blue-50 text-center">
        <p className="text-lg font-semibold text-black">
          Puntuación: {score} | Ronda: {rounds}
        </p>
      </Card>

      <div
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  className="grid grid-cols-2 md:grid-cols-5 gap-3 p-6 bg-purple-50 rounded-lg border-2 border-dashed border-purple-300 min-h-32 text-black"
>
  {items.length > 0 && !userOrder.length
    ? items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          className="bg-white border-2 border-purple-400 p-4 rounded-lg cursor-move hover:shadow-lg transition text-center font-semibold"
        >
          {item.displayValue}
        </div>
      ))
    : items
        .filter((i) => !userOrder.find((u) => u.id === i.id))
        .map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="bg-white border-2 border-purple-400 p-4 rounded-lg cursor-move hover:shadow-lg transition text-center font-semibold"
          >
            {item.displayValue}
          </div>
        ))}
</div>


      <Card className="p-6 bg-green-50">
        <p className="text-sm text-green-700 mb-4 font-semibold">Tu orden:</p>
        <div className="flex gap-2 flex-wrap mb-4 min-h-12 bg-white p-4 rounded-lg border-2 border-green-300">
          {userOrder.map((item) => (
            <button
              key={item.id}
              onClick={() => removeFromOrder(item.id)}
              className="bg-green-200 hover:bg-green-300 border-2 border-green-400 px-4 py-2 rounded-lg font-semibold cursor-pointer transition text-green-800"
            >
              {item.displayValue} ✕
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {userOrder.length === items.length ? (
            <>
              <button
                onClick={checkOrder}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                ✓ Verificar
              </button>
              <button
                onClick={completeGame}
                className="px-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
              >
                Terminar
              </button>
            </>
          ) : (
            <p className="text-purple-700 text-center flex-1">
              Arrastra los elementos para ordenarlos ({userOrder.length}/
              {items.length})
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
