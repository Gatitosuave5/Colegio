"use client";
import React, { useEffect, useMemo, useState } from "react";

/** Tipos */
type Story = {
  id: string;
  title: string;
  content: string[];
};

type Card = {
  id: number;
  word: string;
  flipped: boolean;
  matched: boolean;
};

function extractKeywordsFromStory(story: Story, max = 6): string[] {
  const text = story?.content?.join(" ").toLowerCase() || "";
  // stopwords muy básicas en español
  const stop = new Set([
    "el","la","los","las","un","una","unos","unas","de","del","al","a","y","o","u","que",
    "en","por","para","con","como","se","su","sus","es","era","fue","muy","más","menos",
    "lo","le","les","ya","no","sí","pero","y","e","también","había","cuando","donde"
  ]);
  const words = text
    .normalize("NFD").replace(/\p{Diacritic}/gu,"") // quitar acentos
    .replace(/[^a-zñ\s]/gi, " ")
    .split(/\s+/)
    .filter(w => w.length >= 4 && !stop.has(w))
    .slice(0, 100);

  // frec simple
  const freq: Record<string, number> = {};
  words.forEach(w => (freq[w] = (freq[w] || 0) + 1));
  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  const unique = Array.from(new Set(sorted));
  return unique.slice(0, max) || ["magia","amigos","castillo","valiente","arcoiris","ballena"].slice(0,max);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MemoryGameReading({ story }: { story: Story }) {
  const keywords = useMemo(() => extractKeywordsFromStory(story, 6), [story]);
  const [cards, setCards] = useState<Card[]>([]);
  const [lock, setLock] = useState(false);
  const [first, setFirst] = useState<Card | null>(null);
  const [second, setSecond] = useState<Card | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    // crear pares
    const deckWords = [...keywords, ...keywords];
    const deck: Card[] = shuffle(deckWords).map((w, i) => ({
      id: i,
      word: w,
      flipped: false,
      matched: false
    }));
    setCards(deck);
    setMoves(0);
    setWon(false);
    setFirst(null);
    setSecond(null);
    setLock(false);
  }, [keywords]);

  useEffect(() => {
    if (cards.length && cards.every(c => c.matched)) setWon(true);
  }, [cards]);

  const onFlip = (card: Card) => {
    if (lock || card.flipped || card.matched) return;

    const newCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (!first) {
      setFirst({ ...card, flipped: true });
      return;
    }
    if (!second) {
      setSecond({ ...card, flipped: true });
      setLock(true);
      setMoves(m => m + 1);

      // evaluar
      setTimeout(() => {
        if (first.word === card.word) {
          setCards(prev =>
            prev.map(c =>
              c.flipped && (c.id === first.id || c.id === card.id)
                ? { ...c, matched: true }
                : c
            )
          );
        } else {
          setCards(prev =>
            prev.map(c =>
              c.id === first.id || c.id === card.id ? { ...c, flipped: false } : c
            )
          );
        }
        setFirst(null);
        setSecond(null);
        setLock(false);
      }, 800);
    }
  };

  const restart = () => {
    const deckWords = [...keywords, ...keywords];
    const deck: Card[] = shuffle(deckWords).map((w, i) => ({
      id: i,
      word: w,
      flipped: false,
      matched: false
    }));
    setCards(deck);
    setMoves(0);
    setWon(false);
    setFirst(null);
    setSecond(null);
    setLock(false);
  };

  return (
    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">🧠 Memoria</h3>
        <div className="text-sm text-purple-700 font-semibold">Movimientos: {moves}</div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => onFlip(card)}
            className={`h-16 sm:h-20 rounded-lg border-2 text-sm sm:text-base font-bold transition
              ${card.matched ? "bg-green-200 border-green-400 text-green-900" :
              card.flipped ? "bg-white border-purple-500 text-purple-700" :
              "bg-purple-200 border-purple-300 text-purple-900 hover:brightness-95"}`}
          >
            {card.flipped || card.matched ? card.word : "?"}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-3">
        <button
          onClick={restart}
          className="px-3 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 text-sm"
        >
          Reiniciar
        </button>
        {won && (
          <span className="inline-block px-3 py-2 rounded-md bg-green-100 text-green-700 text-sm font-semibold">
            ¡Completado! 🎉
          </span>
        )}
      </div>
    </div>
  );
}
