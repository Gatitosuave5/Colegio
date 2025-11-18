"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from 'lucide-react'

const climateQuestions = [
  { climate: "Tropical", description: "Muy caliente y lluvioso", emoji: "☀️🌧️", correct: 0 },
  { climate: "Desértico", description: "Muy seco y caliente", emoji: "🏜️☀️", correct: 1 },
  { climate: "Templado", description: "Moderado, con cuatro estaciones", emoji: "🍂⛅", correct: 2 },
  { climate: "Polar", description: "Muy frío con hielo y nieve", emoji: "❄️🧊", correct: 3 },
  { climate: "Montañoso", description: "Frío por la altura, muy variado", emoji: "⛰️❄️", correct: 4 },
]

export function ClimateZones({ onComplete }: { onComplete: (score: number) => void }) {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const options = ["Tropical", "Desértico", "Templado", "Polar", "Montañoso"]
  const question = climateQuestions[current]
  const isCorrect = selected === question.correct

  const handleAnswer = (index: number) => {
    setSelected(index)
    setAnswered(true)
    if (index === question.correct) {
      setScore(prev => prev + 20)
    }
  }

  const handleNext = () => {
    if (current < climateQuestions.length - 1) {
      setCurrent(prev => prev + 1)
      setAnswered(false)
      setSelected(null)
    } else {
      onComplete(score)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-semibold text-black">Pregunta {current + 1}/{climateQuestions.length}</p>
      </div>

      <div className="bg-gradient-to-b from-sky-50 to-blue-50 p-8 rounded-lg text-center">
        <p className="text-5xl mb-4">{question.emoji}</p>
        <p className="text-xl font-bold text-black mb-2">Identifica el clima:</p>
        <p className="text-lg font-semibold text-black italic">{question.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => !answered && handleAnswer(index)}
            disabled={answered}
            className={`p-4 rounded-lg font-bold text-lg text-black transition-all ${
              selected === index
                ? isCorrect
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
                : "bg-gray-100 border-2 border-gray-300 hover:border-blue-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selected === index && (
                isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )
              )}
            </div>
          </button>
        ))}
      </div>

      {answered && (
        <button
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {current === climateQuestions.length - 1 ? "Ver Resultados" : "Siguiente"}
        </button>
      )}
    </div>
  )
}
