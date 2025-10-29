"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface StoryEvent {
  id: number
  text: string
  correctOrder: number
}

const storyEvents: Record<string, StoryEvent[]> = {
  caperucita: [
    { id: 1, text: "La abuela le regala una caperuza roja", correctOrder: 1 },
    { id: 2, text: "Caperucita sale hacia la casa de su abuela", correctOrder: 2 },
    { id: 3, text: "Se encuentra con el lobo en el bosque", correctOrder: 3 },
    { id: 4, text: "El lobo llega primero a la casa", correctOrder: 4 },
    { id: 5, text: "Caperucita llega y descubre la verdad", correctOrder: 5 },
    { id: 6, text: "Caperucita aprende a escuchar a sus padres", correctOrder: 6 },
  ],
  patito: [
    { id: 1, text: "Nace un patito diferente a los demás", correctOrder: 1 },
    { id: 2, text: "Los otros animales lo rechazan", correctOrder: 2 },
    { id: 3, text: "El patito se va solo al mundo", correctOrder: 3 },
    { id: 4, text: "Pasa el invierno sufriendo", correctOrder: 4 },
    { id: 5, text: "Llega la primavera y se convierte en cisne", correctOrder: 5 },
    { id: 6, text: "Descubre que siempre fue un cisne hermoso", correctOrder: 6 },
  ],
  cenicienta: [
    { id: 1, text: "Cenicienta vive con su madrastra", correctOrder: 1 },
    { id: 2, text: "Se anuncia el baile del príncipe", correctOrder: 2 },
    { id: 3, text: "El hada madrina la ayuda con magia", correctOrder: 3 },
    { id: 4, text: "Cenicienta baila con el príncipe", correctOrder: 4 },
    { id: 5, text: "Se le cae la zapatilla de cristal", correctOrder: 5 },
    { id: 6, text: "El príncipe la encuentra y se casan", correctOrder: 6 },
  ],
}

export default function OrderStoryGame({
  storyId,
  onBack,
}: {
  storyId: string
  onBack: () => void
}) {
  const events = storyEvents[storyId] || storyEvents.caperucita
  const [currentOrder, setCurrentOrder] = useState<number[]>(
    [...events].sort(() => Math.random() - 0.5).map((e) => e.id),
  )
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))

    if (dragIndex === dropIndex) return

    const newOrder = [...currentOrder]
    ;[newOrder[dragIndex], newOrder[dropIndex]] = [newOrder[dropIndex], newOrder[dragIndex]]
    setCurrentOrder(newOrder)
  }

  const checkOrder = () => {
    const correctOrder = events.map((e) => e.id)
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder)

    if (isCorrect) {
      setScore(100)
      setCompleted(true)
    } else {
      setScore(0)
      alert("El orden no es correcto. ¡Intenta de nuevo!")
    }
  }

  if (completed) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Correcto!</h2>
          <p className="text-2xl text-gray-600 mb-8">
            Ordenaste la historia perfectamente. Obtuviste <span className="font-bold text-purple-600">{score}</span>{" "}
            puntos
          </p>
          <button
            onClick={onBack}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver a Juegos
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Ordena la Historia</h2>
        <div className="w-10"></div>
      </div>

      <p className="text-center text-gray-600 mb-8">Arrastra los eventos para ordenarlos correctamente</p>

      <div className="space-y-3 mb-8">
        {currentOrder.map((eventId, index) => {
          const event = events.find((e) => e.id === eventId)
          return (
            <div
              key={eventId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-lg cursor-move hover:shadow-lg transition-all transform hover:scale-102"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white text-blue-500 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-lg">{event?.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={checkOrder}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Verificar Orden
        </button>
      </div>
    </div>
  )
}
