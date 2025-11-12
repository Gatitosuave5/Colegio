"use client";
import React, { useMemo, useState } from "react";

/** Tipos */
type Story = { id: string; title: string; content: string[]; };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** Drag & Drop simple con HTML5 */
export default function OrderStoryGameReading({ story }: { story: Story }) {
  const base = useMemo(() => story.content.slice(0, 5), [story]);
  const [items, setItems] = useState(() =>
    shuffle(base.map((t, i) => ({ id: i + 1, text: t })))
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const onDragStart = (idx: number) => setDragIndex(idx);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const onDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    const copy = [...items];
    const [moved] = copy.splice(dragIndex, 1);
    copy.splice(idx, 0, moved);
    setItems(copy);
    setDragIndex(null);
  };

  const verificar = () => {
    const ok = items.every((it, i) => it.text === base[i]);
    setResult(ok ? "✅ ¡Orden correcto!" : "❌ Hay pasos fuera de orden");
  };

  const reiniciar = () => {
    setItems(shuffle(base.map((t, i) => ({ id: i + 1, text: t }))));
    setResult(null);
  };

  return (
    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
      <h3 className="font-bold mb-3">🎯 Ordena la historia</h3>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div
            key={it.id}
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(idx)}
            className="p-3 bg-white border border-blue-300 rounded-md cursor-move hover:bg-blue-50"
          >
            <span className="inline-block w-6 h-6 text-center mr-2 rounded bg-blue-200 text-blue-800 font-bold">
              {idx + 1}
            </span>
            {it.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-3">
        <button
          onClick={verificar}
          className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
        >
          Verificar
        </button>
        <button
          onClick={reiniciar}
          className="px-3 py-2 rounded-md text-blue-700 bg-white border border-blue-300 hover:bg-blue-100 text-sm"
        >
          Reiniciar
        </button>
        {result && (
          <span className={`px-3 py-2 rounded-md text-sm font-semibold
            ${result.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {result}
          </span>
        )}
      </div>
    </div>
  );
}
