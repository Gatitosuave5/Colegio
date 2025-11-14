// quiz-module.tsx
"use client";

import { useState } from "react";
import { topicsData } from "./topicsData";

export default function QuizModule({ id }: { id: string }) {
  const topic = topicsData[id];
  const questions = topic.quiz;

  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
  const [score, setScore] = useState<number | null>(null);

  const submitQuiz = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });

    const percentage = Math.round((correct / questions.length) * 100);
    setScore(percentage);

    if (percentage >= 70) {
      localStorage.setItem(`math_pass_${id}`, "true");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cuestionario: {topic.title}</h1>

      {questions.map((q, qi) => (
        <div key={qi} className="mb-6 bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">{q.question}</p>

          {q.options.map((op, oi) => (
            <label key={oi} className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                name={`q${qi}`}
                value={oi}
                onChange={() =>
                  setAnswers({ ...answers, [qi]: oi })
                }
              />
              {op}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitQuiz}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Enviar respuestas
      </button>

      {score !== null && (
        <div className="mt-4 text-lg">
          <p>Tu puntaje: <strong>{score}%</strong></p>
          {score >= 70 ? (
            <p className="text-green-600 font-bold">¡Aprobaste! Juegos desbloqueados 🎉</p>
          ) : (
            <p className="text-red-600 font-bold">No aprobaste. Intenta nuevamente.</p>
          )}
        </div>
      )}
    </div>
  );
}
