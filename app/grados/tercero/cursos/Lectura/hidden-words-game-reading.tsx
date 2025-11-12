"use client";
import React, { useMemo, useState } from "react";

/** Tipos */
type Story = { id: string; title: string; content: string[]; };

function extractKeywords(story: Story): string[] {
  const text = story?.content?.join(" ").toLowerCase() || "";
  const words = text
    .normalize("NFD").replace(/\p{Diacritic}/gu,"") // quita acentos
    .replace(/[^a-zñ\s]/gi, " ")
    .split(/\s+/)
    .filter(w => w.length >= 4);
  const freq: Record<string, number> = {};
  words.forEach(w => (freq[w] = (freq[w] || 0) + 1));
  const sorted = Object.keys(freq).sort((a,b) => freq[b] - freq[a]);
  const unique = Array.from(new Set(sorted));
  return unique.slice(0, 10).length ? unique.slice(0, 10) : ["magia","amigos","castillo","valiente","arcoiris","ballena"];
}

const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export default function HiddenWordsGameReading({ story }: { story: Story }) {
  const pool = useMemo(() => extractKeywords(story), [story]);
  const [index, setIndex] = useState(0);
  const [used, setUsed] = useState<string[]>([]);
  const [fails, setFails] = useState(0);

  const word = useMemo(() => pool[index] || "magia", [pool, index]);
  const normalized = useMemo(
    () => word.normalize("NFD").replace(/\p{Diacritic}/gu,"").toUpperCase(),
    [word]
  );

  const guessed = (ch: string) => used.includes(ch);
  const visible = normalized
    .split("")
    .map(ch => (/[A-ZÑ]/.test(ch) ? (used.includes(ch) ? ch : "_") : ch))
    .join(" ");

  const onPick = (ch: string) => {
    if (used.includes(ch)) return;
    setUsed(prev => [...prev, ch]);
    if (!normalized.includes(ch)) setFails(f => f + 1);
  };

  const won = normalized.split("").every(ch => !/[A-ZÑ]/.test(ch) || used.includes(ch));
  const lost = fails >= 6;

  const nextWord = () => {
    setIndex(i => (i + 1) % pool.length);
    setUsed([]);
    setFails(0);
  };

  return (
    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
      <h3 className="font-bold mb-2">🔤 Palabras ocultas</h3>
      <p className="text-sm text-gray-600 mb-2">Adivina la palabra del cuento</p>

      {/* Estado */}
      <div className="mb-3">
        <div className="text-2xl font-mono tracking-widest text-green-800">{visible}</div>
        <div className="mt-1 text-sm text-green-700">Fallos: {fails} / 6</div>
      </div>

      {/* Teclado */}
      <div className="grid grid-cols-12 gap-1">
        {ABC.map(ch => (
          <button
            key={ch}
            onClick={() => onPick(ch)}
            disabled={guessed(ch) || won || lost}
            className={`py-1 text-xs rounded-md border
              ${guessed(ch) ? "bg-gray-200 border-gray-300 text-gray-500" :
              "bg-white border-green-300 text-green-800 hover:bg-green-100"}`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Controles */}
      <div className="mt-3 flex gap-3 items-center">
        {(won || lost) ? (
          <span className={`px-3 py-2 rounded-md text-sm font-semibold
            ${won ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {won ? "¡Correcto! 🎉" : `La palabra era: ${normalized}`}
          </span>
        ) : null}

        <button
          onClick={nextWord}
          className="px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm"
        >
          {won || lost ? "Siguiente palabra" : "Cambiar palabra"}
        </button>
      </div>
    </div>
  );
}
