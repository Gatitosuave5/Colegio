"use client"

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from "lucide-react"
import MemoryGame from "../../../../components/games/memory-game"
import OrderStoryGame from "../../../../components/games/order-story-game"
import HiddenWordsGame from "../../../../components/games/hidden-words-game"

interface Story {
  id: string
  title: string
}

interface Game {
  id: string
  name: string
  description: string
  icon: string
}

const storyIdMap: Record<string, string> = {
  "caperucita-roja": "caperucita",
  "el-patito-feo": "patito",
  "cenicienta": "cenicienta"
}


const games: Record<string, Game[]> = {
  caperucita: [
    {
      id: "memory",
      name: "Juego de Memoria",
      description: "Encuentra los pares de personajes del cuento",
      icon: "🧠",
    },
    {
      id: "order",
      name: "Ordena la Historia",
      description: "Coloca los eventos en el orden correcto",
      icon: "📋",
    },
    {
      id: "words",
      name: "Palabras Ocultas",
      description: "Encuentra palabras clave del cuento",
      icon: "🔤",
    },
  ],
  patito: [
    {
      id: "memory",
      name: "Juego de Memoria",
      description: "Encuentra los pares de escenas del cuento",
      icon: "🧠",
    },
    {
      id: "order",
      name: "Ordena la Historia",
      description: "Coloca los eventos en el orden correcto",
      icon: "📋",
    },
    {
      id: "words",
      name: "Palabras Ocultas",
      description: "Encuentra palabras clave del cuento",
      icon: "🔤",
    },
  ],
  cenicienta: [
    {
      id: "memory",
      name: "Juego de Memoria",
      description: "Encuentra los pares de personajes del cuento",
      icon: "🧠",
    },
    {
      id: "order",
      name: "Ordena la Historia",
      description: "Coloca los eventos en el orden correcto",
      icon: "📋",
    },
    {
      id: "words",
      name: "Palabras Ocultas",
      description: "Encuentra palabras clave del cuento",
      icon: "🔤",
    },
  ],
}

export default function GamesComponent({
  story,
  onBack,
}: {
  story: Story
  onBack: () => void
}) {
  const storyGames = games[storyIdMap[story.id]] || []
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  if (selectedGame === "memory") {
    return <MemoryGame storyId={story.id} onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "order") {
    return <OrderStoryGame storyId={story.id} onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "words") {
    return <HiddenWordsGame storyId={story.id} onBack={() => setSelectedGame(null)} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Juegos Interactivos</h2>
        <div className="w-10"></div>
      </div>

      <div className="text-center mb-12">
        <p className="text-xl text-gray-600">Elige un juego para divertirte mientras aprendes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storyGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className="group text-left transition-all duration-300 hover:scale-105"
          >
            <Card className="bg-gradient-to-br from-purple-400 to-pink-400 text-white border-0 shadow-lg hover:shadow-2xl transition-all h-full p-8 rounded-2xl cursor-pointer">
              <div className="text-6xl mb-4">{game.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
              <p className="text-sm opacity-90">{game.description}</p>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
