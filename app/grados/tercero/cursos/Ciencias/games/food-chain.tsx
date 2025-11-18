"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { CheckCircle } from 'lucide-react'

const foodChainItems = [
  { id: 1, name: "🌱 Planta", level: 1, emoji: "🌱" },
  { id: 2, name: "🐰 Conejo", level: 2, emoji: "🐰" },
  { id: 3, name: "🦅 Águila", level: 3, emoji: "🦅" },
]
   
export function FoodChain({ onComplete }: { onComplete: (score: number) => void }) {
  const [shuffled, setShuffled] = useState(foodChainItems)
  const [ordered, setOrdered] = useState<typeof foodChainItems>([])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setShuffled([...foodChainItems].sort(() => Math.random() - 0.5))
  }, [])

  const handleDragStart = (item: typeof foodChainItems[0]) => {
    return item
  }

  const handleAddToChain = (item: typeof foodChainItems[0]) => {
    if (!ordered.find(o => o.id === item.id)) {
      setOrdered(prev => [...prev, item])
      setShuffled(prev => prev.filter(i => i.id !== item.id))
    }
  }

  const handleRemoveFromChain = (index: number) => {
    const item = ordered[index]
    setOrdered(prev => prev.filter((_, i) => i !== index))
    setShuffled(prev => [...prev, item])
  }

  useEffect(() => {
    const isCorrect =
      ordered.length === 3 &&
      ordered[0].level === 1 &&
      ordered[1].level === 2 &&
      ordered[2].level === 3

    if (isCorrect) {
      setCompleted(true)
      setTimeout(() => onComplete(100), 1500)
    }
  }, [ordered, onComplete])

  if (completed) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-2xl font-bold text-green-600">¡Cadena alimenticia correcta!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-bold text-lg text-gray-900">
          Ordena la cadena alimenticia correctamente
        </p>
      </div>

      {/* Cadena Ordenada */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
        <p className="text-sm font-semibold text-gray-900 mb-3">Cadena Alimenticia:</p>
        <div className="space-y-2">
          {ordered.length === 0 ? (
            <p className="text-gray-700 text-center py-8 font-semibold">Arrastra los elementos aquí</p>
          ) : (
            ordered.map((item, index) => (
              <button
                key={index}
                onClick={() => handleRemoveFromChain(index)}
                className="w-full p-3 bg-white border-2 border-green-400 rounded-lg font-bold text-gray-900 flex items-center justify-between hover:bg-red-50 transition-colors"
              >
                <span className="text-2xl">{item.emoji} {item.name}</span>
                {index < ordered.length - 1 && <span className="text-2xl">→</span>}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Elementos Disponibles */}
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-3">Elementos:</p>
        <div className="grid grid-cols-3 gap-2">
          {shuffled.map(item => (
            <button
              key={item.id}
              onClick={() => handleAddToChain(item)}
              className="p-3 bg-blue-100 border-2 border-blue-300 rounded-lg font-semibold hover:bg-blue-200 transition-all text-center"
            >
              <div className="text-3xl mb-1">{item.emoji}</div>
              <div className="text-xs">{item.name.split(" ")[1]}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-800 text-center">
        💡 Haz clic en los elementos para ordenarlos en la cadena correcta
      </div>
    </div>
  )
}
