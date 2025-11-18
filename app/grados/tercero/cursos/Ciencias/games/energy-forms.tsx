"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from 'lucide-react'

const energyForms = [
  { id: 1, name: "Energía Térmica 🔥", icon: "🔥" },
  { id: 2, name: "Energía Luminosa 💡", icon: "💡" },
  { id: 3, name: "Energía Cinética 🏃", icon: "🏃" },
  { id: 4, name: "Energía Eléctrica ⚡", icon: "⚡" },
]

const examples = [
  { example: "Fuego", correctId: 1 },
  { example: "Luz del sol", correctId: 2 },
  { example: "Pelota que cae", correctId: 3 },
  { example: "Enchufe", correctId: 4 },
  { example: "Radiador caliente", correctId: 1 },
]

export function EnergyForms({ onComplete }: { onComplete: (score: number) => void }) {
  const [matches, setMatches] = useState<Record<number, number | null>>({})
  const [score, setScore] = useState(0)

  const handleMatch = (exampleIndex: number, energyId: number) => {
    const isCorrect = examples[exampleIndex].correctId === energyId
    
    if (isCorrect) {
      setMatches(prev => ({ ...prev, [exampleIndex]: energyId }))
      setScore(prev => prev + 20)
    }
  }

  useEffect(() => {
    if (Object.keys(matches).length === examples.length) {
      setTimeout(() => onComplete(score), 800)
    }
  }, [matches, score, onComplete])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-black">Clasifica formas de energía</p>
        <p className="text-sm font-semibold text-gray-800">Clasificadas: {Object.keys(matches).length}/{examples.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ejemplos */}
        <div>
          <p className="font-bold mb-3 text-lg text-black">Ejemplos:</p>
          <div className="space-y-2">
            {examples.map((item, index) => (
              <div key={index} className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300">
                <p className="font-semibold mb-2 text-gray-900">{item.example}</p>
                <div className="grid grid-cols-2 gap-1">
                  {energyForms.map(energy => (
                    <button
                      key={energy.id}
                      onClick={() => handleMatch(index, energy.id)}
                      disabled={matches[index] !== undefined}
                      className={`p-1 rounded text-xs font-semibold transition-all ${
                        matches[index] === energy.id
                          ? "bg-green-100 border border-green-500"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {energy.icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formas de Energía */}
        <div>
          <p className="font-bold mb-3 text-lg text-black">Formas de Energía:</p>
          <div className="space-y-2">
            {energyForms.map(energy => {
              const count = Object.values(matches).filter(m => m === energy.id).length
              return (
                <div
                  key={energy.id}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-400"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{energy.name}</p>
                      <p className="text-xs font-semibold text-gray-700">
                        {count} ejemplo{count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    {count > 0 && <CheckCircle className="w-6 h-6 text-green-600" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
