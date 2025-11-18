"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { CheckCircle } from 'lucide-react'

const animals = [
  { id: 1, name: "León", habitat: "Sabana" },
  { id: 2, name: "Pez", habitat: "Océano" },
  { id: 3, name: "Oso", habitat: "Bosque" },
  { id: 4, name: "Camello", habitat: "Desierto" },
  { id: 5, name: "Loro", habitat: "Selva" },
  { id: 6, name: "Pingüino", habitat: "Polo" },
]

const shuffleArray = (array: string[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
  
}

export function AnimalMatcher({ onComplete }: { onComplete: (score: number) => void }) {
  const [matches, setMatches] = useState<Record<number, string>>({})
  const [correct, setCorrect] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [shuffledHabitats, setShuffledHabitats] = useState<string[]>([])

  const habitats = ["Sabana", "Océano", "Bosque", "Desierto", "Selva", "Polo"]

  useEffect(() => {
    setShuffledHabitats(shuffleArray(habitats))
  }, [])

  const handleMatch = (animalId: number, habitat: string) => {
    const animal = animals.find(a => a.id === animalId)
    if (animal && animal.habitat === habitat) {
      setMatches(prev => ({ ...prev, [animalId]: habitat }))
      setCorrect(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (correct === animals.length) {
      setCompleted(true)
      setTimeout(() => onComplete(100), 1500)
    }
  }, [correct, onComplete])

  if (completed) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-2xl font-bold text-green-600">¡Perfecto! ¡Todos los animales emparejados!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-black">
        Emparejados: {correct}/{animals.length}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-3 text-lg text-black">Animales 🦁</h3>
          <div className="space-y-2">
            {animals.map(animal => (
              <div
                key={animal.id}
                className={`p-3 rounded-lg cursor-move text-center font-semibold transition-all ${
                  matches[animal.id]
                    ? "bg-green-100 border-2 border-green-500 text-green-900"
                    : "bg-blue-100 border-2 border-blue-300 hover:bg-blue-200 text-blue-900"
                }`}
              >
                {animal.name}
                {matches[animal.id] && <CheckCircle className="w-4 h-4 inline ml-2" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-lg text-black">Hábitats 🌍</h3>
          <div className="space-y-2">
            {shuffledHabitats.map(habitat => (
              <button
                key={habitat}
                onClick={() => {
                  const unmatchedAnimal = animals.find(
                    a => a.habitat === habitat && !matches[a.id]
                  )
                  if (unmatchedAnimal) {
                    handleMatch(unmatchedAnimal.id, habitat)
                  }
                }}
                className="w-full p-3 rounded-lg bg-green-100 border-2 border-green-300 hover:bg-green-200 font-bold text-green-900 transition-all"
              >
                {habitat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 font-medium text-center">
        💡 Haz clic en un hábitat para emparejar con su animal
      </div>
    </div>
  )
}
