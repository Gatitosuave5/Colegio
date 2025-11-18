"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from 'lucide-react'

const forceExamples = [
  { id: 1, activity: "Patear un balón 🦶⚽", isForce: true },
  { id: 2, activity: "Estar sentado 🪑", isForce: false },
  { id: 3, activity: "Lanzar una pelota 🤸", isForce: true },
  { id: 4, activity: "Empujar una puerta 🚪", isForce: true },
  { id: 5, activity: "Dormir 😴", isForce: false },
]

export function ForceExamples({ onComplete }: { onComplete: (score: number) => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean>>({})
  const [score, setScore] = useState(0)

  const handleAnswer = (id: number, selected: boolean) => {
    if (answered[id] !== undefined) return

    const example = forceExamples.find(e => e.id === id)
    const isCorrect = example?.isForce === selected
    
    setAnswered(prev => ({ ...prev, [id]: selected }))

    if (isCorrect) {
      setScore(prev => prev + 20)
    }

    if (Object.keys(answered).length === forceExamples.length - 1) {
      setTimeout(() => onComplete(score + (isCorrect ? 20 : 0)), 800)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-black">¿Se aplica una fuerza?</p>
        <p className="text-sm font-bold text-black">Respondidas: {Object.keys(answered).length}/{forceExamples.length}</p>
      </div>

      <div className="space-y-3">
        {forceExamples.map(example => {
          const userAnswered = answered[example.id]
          const isCorrect = userAnswered === example.isForce

          return (
            <div
              key={example.id}
              className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200"
            >
              <p className="font-bold mb-3 text-lg text-black">{example.activity}</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAnswer(example.id, true)}
                  disabled={answered[example.id] !== undefined}
                  className={`p-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    userAnswered === true
                      ? isCorrect
                        ? "bg-green-100 border-2 border-green-500 text-black"
                        : "bg-red-100 border-2 border-red-500 text-black"
                      : "bg-blue-200 border-2 border-blue-400 hover:bg-blue-300 text-black"
                  }`}
                >
                  Sí hay fuerza
                  {userAnswered === true && (
                    isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )
                  )}
                </button>
                <button
                  onClick={() => handleAnswer(example.id, false)}
                  disabled={answered[example.id] !== undefined}
                  className={`p-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    userAnswered === false
                      ? isCorrect
                        ? "bg-green-100 border-2 border-green-500 text-black"
                        : "bg-red-100 border-2 border-red-500 text-black"
                      : "bg-orange-200 border-2 border-orange-400 hover:bg-orange-300 text-black"
                  }`}
                >
                  No hay fuerza
                  {userAnswered === false && (
                    isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
