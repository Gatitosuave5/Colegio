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
  const [timeLeft, setTimeLeft] = useState(50);
  const [gameActive, setGameActive] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);


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

    if (topic.id === "problemas-multdiv") {
      qs = [
        { question: "5 cajas con 8 pelotas cada una = ?", options: ["38", "39", "40"], correct: 2 },
        { question: "Repartir 48 chocolates entre 6 amigos = ?", options: ["7", "8", "9"], correct: 1 },
        { question: "7 filas con 9 plantas cada una = ?", options: ["61", "62", "63"], correct: 2 },
        { question: "56 caramelos entre 8 niños = ?", options: ["6", "7", "8"], correct: 1 },
        { question: "3 paquetes con 12 galletitas = ?", options: ["35", "36", "37"], correct: 1 },
        { question: "72 páginas entre 9 capítulos = ?", options: ["7", "8", "9"], correct: 1 },
      ];
    }
    else if (topic.id === "lectura-numeros") {
      qs = [
        { 
          question: "¿Cómo se lee 345?", 
          options: ["Trescientos cuarenta y cinco", "Tres mil cuarenta y cinco", "Treinta y cuatro con cinco"], 
          correct: 0 
        },
        { 
          question: "¿Cuál es mayor: 278 o 287?", 
          options: ["278", "287", "Son iguales"], 
          correct: 1 
        },
        { 
          question: "¿Cuál es menor: 590 o 509?", 
          options: ["590", "509", "Son iguales"], 
          correct: 1 
        },
        { 
          question: "¿Cómo se escribe 'Cuatrocientos doce'?", 
          options: ["412", "421", "402"], 
          correct: 0 
        },
        { 
          question: "¿Qué número es mayor: 736 o 763?", 
          options: ["736", "763", "Son iguales"], 
          correct: 1 
        },
        { 
          question: "¿Cómo se lee 829?", 
          options: ["Ochocientos veinte y nueve", "Ochocientos veintinueve", "Ochenta dos nueve"], 
          correct: 1 
        }
      ];
    }

    setQuestions(qs.sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setAnswered(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (!answered) {
      setSelectedOption(optionIdx);
  
      if (optionIdx === questions[currentIdx].correct) {
        setScore(score + 1);
      }
  
      setAnswered(true);
  
      setTimeout(() => {
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setAnswered(false);
          setSelectedOption(null);
          setTimeLeft(60);
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
                  : idx === selectedOption
                  ? "bg-red-500 text-white scale-105 shadow"          
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
