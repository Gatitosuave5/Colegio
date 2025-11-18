"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from 'lucide-react'

const habits = [
  { id: 1, habit: "Comer frutas y verduras 🥗", healthy: true },
  { id: 2, habit: "Dormir 8 horas 😴", healthy: true },
  { id: 3, habit: "Hacer ejercicio 🏃", healthy: true },
  { id: 4, habit: "Comer muchos dulces 🍬", healthy: false },
  { id: 5, habit: "Ver TV todo el día 📺", healthy: false },
]

export function HealthyHabits({ onComplete }: { onComplete: (score: number) => void }) {
  const [answered, setAnswered] = useState<Record<number, boolean | null>>({})
  const [score, setScore] = useState(0)

  const handleAnswer = (id: number, isHealthy: boolean) => {
    if (answered[id] !== null && answered[id] !== undefined) return

    const habit = habits.find(h => h.id === id)
    const correct = habit?.healthy === isHealthy
    
    setAnswered(prev => ({ ...prev, [id]: isHealthy }))
    
    if (correct) {
      setScore(prev => prev + 20)
    }

    if (Object.keys(answered).length === habits.length - 1) {
      setTimeout(() => onComplete(score + (correct ? 20 : 0)), 800)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-900">¿Es un hábito saludable?</p>
        <p className="text-sm font-semibold text-gray-800">Respondidas: {Object.keys(answered).length}/{habits.length}</p>
      </div>

      <div className="space-y-3">
        {habits.map(habit => (
          <div key={habit.id} className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold mb-3 text-lg text-gray-900">{habit.habit}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAnswer(habit.id, true)}
                disabled={answered[habit.id] !== null && answered[habit.id] !== undefined}
                className={`p-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  answered[habit.id] === true
                    ? habit.healthy
                      ? "bg-green-100 border-2 border-green-500 text-gray-900"
                      : "bg-red-100 border-2 border-red-500 text-gray-900"
                    : "bg-green-200 border-2 border-green-400 hover:bg-green-300 text-gray-900"
                }`}
              >
                ✅ Saludable
                {answered[habit.id] === true && (
                  habit.healthy ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )
                )}
              </button>
              <button
                onClick={() => handleAnswer(habit.id, false)}
                disabled={answered[habit.id] !== null && answered[habit.id] !== undefined}
                className={`p-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  answered[habit.id] === false
                    ? !habit.healthy
                      ? "bg-green-100 border-2 border-green-500 text-gray-900"
                      : "bg-red-100 border-2 border-red-500 text-gray-900"
                    : "bg-orange-200 border-2 border-orange-400 hover:bg-orange-300 text-gray-900"
                }`}
              >
                ❌ No saludable
                {answered[habit.id] === false && (
                  !habit.healthy ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
