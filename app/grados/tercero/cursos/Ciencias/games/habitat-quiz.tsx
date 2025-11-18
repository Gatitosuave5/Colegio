"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from 'lucide-react'

const habitatQuestions = [
  { animal: "🐠", options: ["Océano", "Bosque", "Desierto"], correct: "Océano" },
  { animal: "🐻", options: ["Polo", "Bosque", "Sabana"], correct: "Bosque" },
  { animal: "🦁", options: ["Océano", "Bosque", "Sabana"], correct: "Sabana" },
  { animal: "🐪", options: ["Desierto", "Bosque", "Polo"], correct: "Desierto" },
  { animal: "🦜", options: ["Polo", "Selva", "Desierto"], correct: "Selva" },
]

export function HabitatQuiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const current = habitatQuestions[currentIndex]
  const isCorrect = selected === current.correct

  const handleAnswer = (answer: string) => {
    setSelected(answer)
    setAnswered(true)
    if (answer === current.correct) {
      setScore(prev => prev + 20)
    }
  }

  const handleNext = () => {
    if (currentIndex < habitatQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setAnswered(false)
      setSelected(null)
    } else {
      onComplete(score)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-900">Pregunta {currentIndex + 1}/{habitatQuestions.length}</p>
      </div>

      <div className="bg-gradient-to-b from-blue-50 to-cyan-50 p-8 rounded-lg text-center">
        <p className="text-6xl mb-4">{current.animal}</p>
        <p className="text-xl font-bold text-black">¿Dónde vive este animal?</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {current.options.map(option => (
          <button
            key={option}
            onClick={() => !answered && handleAnswer(option)}
            disabled={answered}
            className={`p-4 rounded-lg font-bold text-lg text-gray-900 transition-all ${
              selected === option
                ? isCorrect
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
                : "bg-gray-100 border-2 border-gray-300 hover:border-blue-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selected === option && (
                isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
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
          {currentIndex === habitatQuestions.length - 1 ? "Ver Resultados" : "Siguiente"}
        </button>
      )}
    </div>
  )
}
