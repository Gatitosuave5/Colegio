"use client";

import { useState } from "react";
import { Card } from "./card";
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

async function agregarPuntos(puntos: number, storyId: string | number) {
  const idAlumno = sessionStorage.getItem("idAlumno");  // ID REAL
  const codigoSalon = localStorage.getItem("codigoSalon");

  if (!idAlumno || !codigoSalon || !storyId) return;

  storyId = storyId.toString();

  //  Clave única por alumno + contenido + salón
  const key = `puntaje-guardado-${codigoSalon}-${storyId}-${idAlumno}`;

  console.log("🔎 Key generada:", key);

  //  Evita doble registro SOLO para ese alumno
  if (localStorage.getItem(key) === "true") {
    console.log(`⚠ Puntaje ya registrado para ${storyId} (Alumno ${idAlumno})`);
    return;
  }

  //  Enviar puntaje directamente con ID real
  await fetch("http://localhost:3001/api/alumnos_temporales/puntaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: idAlumno,
      puntaje: puntos
    })
  });

  //  Guardar bloqueo
  localStorage.setItem(key, "true");

  console.log("✔ Puntaje registrado y bloqueado:", key);
}



export default function TopicQuiz({ topic, onBack }) {
  const questions = topic.quiz;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i: number) => {
    setSelected(i);
    setShowExplanation(true);
    if (i === questions[current].correct) setScore(score + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    if (percentage >= 70) {
      localStorage.setItem(`math_unlock_${topic.id}`, "true");
    }

    agregarPuntos(score, topic.id)

    return (
      <div className="text-center">
        <Card className="p-10 bg-white shadow-lg rounded-2xl">
          <h2 className="text-4xl mb-4 text-black">¡Completado!</h2>
          <p className="text-2xl mb-6 text-black">
            Tu puntaje: <span className="text-black">{score}</span> de{" "}
            {questions.length}
          </p>

          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Volver
          </button>
        </Card>
      </div>
    );

    
  }

  const q = questions[current];
  const answered = selected !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-neutral-200 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl text-black">Cuestionario</h2>
          <p className="text-black">
            Pregunta {current + 1} de {questions.length}
          </p>
        </div>

        <div className="w-10"></div>
      </div>

      <Card className="p-6 bg-white shadow-lg rounded-2xl">
        <h3 className="text-xl mb-6 text-black">{q.question}</h3>

        <div className="space-y-3">
          {q.options.map((op, i) => (
            <button
              key={i}
              disabled={answered}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left p-4 rounded-xl border-2 transition
                ${
                  selected === i
                    ? i === q.correct
                      ? "bg-green-100 border-green-400"
                      : "bg-red-100 border-red-400"
                    : "bg-white hover:bg-neutral-200 border-black"
                }
              `}
            >
              <div className="flex justify-between">
                <span className="text-black">{op}</span>

                {answered &&
                  selected === i &&
                  (i === q.correct ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  ))}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <button
            onClick={next}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl"
          >
            {current === questions.length - 1 ? "Ver resultados" : "Siguiente"}
          </button>
        )}
      </Card>
    </div>
  );
}
