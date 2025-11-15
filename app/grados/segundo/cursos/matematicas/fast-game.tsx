"use client";

import { useState, useEffect } from "react";
import { Card } from "./card";
import { ArrowLeft, Clock } from 'lucide-react';

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

    if (topic.id === "medidas-basicas") {
      qs = [
        { question: "¿Con qué se mide la altura?", options: ["Kilogramos", "Metros"], correct: 1 },
        { question: "¿Con qué se mide el peso?", options: ["Metros", "Kilogramos"], correct: 1 },
        { question: "¿Con qué se mide el agua?", options: ["Metros", "Litros"], correct: 1 },
        { question: "Un metro tiene:", options: ["50 cm", "100 cm"], correct: 1 },
        { question: "¿2 kg + 3 kg = ?", options: ["4 kg", "5 kg"], correct: 1 },
        { question: "¿3 litros + 2 litros = ?", options: ["4 litros", "5 litros"], correct: 1 },
      ];
    } else if (topic.id === "problemas-dinero") {
      qs = [
        { question: "3 dulces de 10 pesos = ?", options: ["20 pesos", "30 pesos"], correct: 1 },
        { question: "Juguete 25 pesos. Pago 50. Cambio = ?", options: ["20 pesos", "25 pesos"], correct: 1 },
        { question: "Pan 8 + leche 12 = ?", options: ["18 pesos", "20 pesos"], correct: 0 },
        { question: "Tengo 40. Gasto 15. Me quedan:", options: ["23 pesos", "25 pesos"], correct: 0 },
        { question: "2 cosas de 20 pesos cada una = ?", options: ["35 pesos", "40 pesos"], correct: 1 },
        { question: "4 cuadernos de 12 pesos = ?", options: ["45 pesos", "48 pesos"], correct: 1 },
      ];
    } else if (topic.id === "series-avanzadas") {
      qs = [
        { question: "¿3, 6, 9, 12, __?", options: ["14", "15"], correct: 1 },
        { question: "¿5, 10, 15, 20, __?", options: ["24", "25"], correct: 1 },
        { question: "¿2, 4, 6, 8, __?", options: ["9", "10"], correct: 1 },
        { question: "¿4, 8, 12, 16, __?", options: ["19", "20"], correct: 1 },
        { question: "¿10, 20, 30, 40, __?", options: ["49", "50"], correct: 1 },
        { question: "¿6, 12, 18, 24, __?", options: ["29", "30"], correct: 1 },
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

      <Card className="p-8 bg-white shadow-xl border">
        <h3 className="text-2xl font-bold mb-6 text-center text-black">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
