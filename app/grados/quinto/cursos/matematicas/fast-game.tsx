"use client";

import { useState, useEffect } from "react";
import { Card } from "./card";
import { ArrowLeft, Clock } from "lucide-react";

interface FastQuestion {
  question: string;
  options: string[];
  correct: number;
}

export default function FastGame({ topic, onBack }) {
  const [questions, setQuestions] = useState<FastQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, [topic]);

  useEffect(() => {
    if (!gameActive || answered) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, answered]);

  const generateQuestions = () => {
    let qs: FastQuestion[] = [];

    if (topic.id === "numeros-100") {
      qs = [
        { question: "¿45 es mayor que 38?", options: ["Sí", "No"], correct: 0 },
        { question: "¿23 < 32?", options: ["Sí", "No"], correct: 0 },
        { question: "¿50 - 10 = ?", options: ["40", "30", "60"], correct: 0 },
        {
          question: "¿Número después de 67?",
          options: ["68", "66", "70"],
          correct: 0,
        },
        {
          question: "¿Número antes de 51?",
          options: ["50", "52", "49"],
          correct: 0,
        },
        {
          question: "¿Entre 14 y 16 está?",
          options: ["15", "14", "17"],
          correct: 0,
        },
        {
          question: "¿89 es más grande que 98?",
          options: ["No", "Sí"],
          correct: 0,
        },
        {
          question: "¿Ordena: 45, 12, 67?",
          options: ["12,45,67", "67,45,12"],
          correct: 0,
        },
      ];
    } else if (topic.id === "problemas-suma") {
      qs = [
        { question: "3 + 2 = ?", options: ["5", "4", "6"], correct: 0 },
        { question: "7 + 1 = ?", options: ["8", "7", "9"], correct: 0 },
        { question: "4 + 3 = ?", options: ["7", "6", "8"], correct: 0 },
        { question: "2 + 5 = ?", options: ["7", "6", "8"], correct: 0 },
        { question: "6 + 2 = ?", options: ["8", "7", "9"], correct: 0 },
        { question: "1 + 9 = ?", options: ["10", "9", "11"], correct: 0 },
        { question: "5 + 3 = ?", options: ["8", "7", "9"], correct: 0 },
        { question: "4 + 4 = ?", options: ["8", "7", "9"], correct: 0 },
      ];
    } else if (topic.id === "series") {
      qs = [
        { question: "¿2, 4, 6, ?", options: ["8", "7", "9"], correct: 0 },
        { question: "¿1, 3, 5, ?", options: ["7", "6", "8"], correct: 0 },
        { question: "¿10, 9, 8, ?", options: ["7", "8", "9"], correct: 0 },
        { question: "¿3, 6, 9, ?", options: ["12", "11", "13"], correct: 0 },
        { question: "¿5, 10, 15, ?", options: ["20", "19", "21"], correct: 0 },
        { question: "¿0, 2, 4, 6, ?", options: ["8", "7", "9"], correct: 0 },
        { question: "¿1, 2, 3, 4, ?", options: ["5", "4", "6"], correct: 0 },
        { question: "¿4, 8, 12, ?", options: ["16", "15", "17"], correct: 0 },
      ];
    }

    setQuestions(qs.sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setAnswered(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (!answered) {
      if (optionIdx === questions[currentIdx].correct) {
        setScore(score + 1);
      }
      setAnswered(true);

      setTimeout(() => {
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setAnswered(false);
          setTimeLeft(30);
        } else {
          setGameActive(false);
        }
      }, 1200);
    }
  };

  if (!gameActive || currentIdx >= questions.length) {
    return (
      <Card className="p-8 bg-gradient-to-br from-orange-100 to-red-100 text-center">
        <h2 className="text-4xl font-bold mb-4 text-red-700">¡Tiempo! ⏰</h2>

        <p className="text-2xl mb-6 text-black font-semibold">
          Acertaste <span className="text-red-700 font-bold">{score}</span> de{" "}
          <span className="font-bold">{questions.length}</span> preguntas
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Volver
          </button>

          <button
            onClick={generateQuestions}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
          >
            Jugar de nuevo
          </button>
        </div>
      </Card>
    );
  }

   const q = questions[currentIdx];

  return (
    <div className="space-y-8 text-black">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-3 hover:bg-gray-200 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>

        <h2 className="text-3xl font-bold text-black">⚡ Resuelve Rápido</h2>

        <div className="w-8"></div>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card className="p-4 bg-blue-100 shadow">
          <p className="text-sm text-gray-600">Puntuación</p>
          <p className="text-3xl font-bold text-blue-700">{score}</p>
        </Card>

        <Card className="p-4 bg-purple-100 shadow">
          <p className="text-sm text-gray-600">Pregunta</p>
          <p className="text-3xl font-bold text-purple-700">
            {currentIdx + 1}/{questions.length}
          </p>
        </Card>

        <Card className="p-4 bg-red-100 shadow">
          <p className="text-sm text-gray-600">Tiempo</p>
          <p className="text-3xl font-bold text-red-700">{timeLeft}s</p>
        </Card>
      </div>

      {/* PREGUNTA */}
      <Card className="p-8 bg-white shadow-xl border">
        <h3 className="text-2xl font-bold mb-6 text-center text-black">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`
                p-6 rounded-lg font-bold text-lg transition-all 
                ${
                  answered
                    ? idx === q.correct
                      ? "bg-green-500 text-white scale-110 shadow-lg"
                      : "bg-gray-300 text-gray-600 opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
