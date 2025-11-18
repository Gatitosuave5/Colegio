"use client"

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { AnimalMatcher } from "./games/animal-matcher"
import { FoodChain } from "./games/food-chain"
import { HabitatQuiz } from "./games/habitat-quiz"
import { BodyParts } from "./games/body-parts"
import { OrganFunction } from "./games/organ-function"
import { HealthyHabits } from "./games/healthy-habits"
import { ClimateZones } from "./games/climate-zones"
import { NaturalResources } from "./games/natural-resources"
import { PlanetLayers } from "./games/planet-layer"
import { ForceExamples } from "./games/force-examples"
import { EnergyForms } from "./games/energy-forms"
import { MotionRace } from "./games/motion-race"


interface Game {
  id: string
  name: string
  description: string
  icon: string
  component: React.ComponentType<{ onComplete: (score: number) => void }>
}

const games: Record<string, Game[]> = {
  living: [
    {
      id: "animal-matcher",
      name: "Emparejar Animales",
      description: "Relaciona animales con sus hábitats",
      icon: "🦁",
      component: AnimalMatcher,
    },
    {
      id: "food-chain",
      name: "Cadena Alimenticia",
      description: "Ordena los seres según la cadena alimenticia",
      icon: "🍃",
      component: FoodChain,
    },
    {
      id: "habitat-quiz",
      name: "Adivina el Hábitat",
      description: "Identifica dónde viven diferentes animales",
      icon: "🌳",
      component: HabitatQuiz,
    },
  ],
  body: [
    {
      id: "body-parts",
      name: "Partes del Cuerpo",
      description: "Identifica y nombra las partes del cuerpo humano",
      icon: "👁️",
      component: BodyParts,
    },
    {
      id: "organ-function",
      name: "Función de Órganos",
      description: "Relaciona órganos con sus funciones",
      icon: "❤️",
      component: OrganFunction,
    },
    {
      id: "healthy-habits",
      name: "Hábitos Saludables",
      description: "Aprende actividades para cuidar tu cuerpo",
      icon: "🏃",
      component: HealthyHabits,
    },
  ],
  earth: [
    {
      id: "climate-zones",
      name: "Zonas Climáticas",
      description: "Descubre los diferentes climas del planeta",
      icon: "🌡️",
      component: ClimateZones,
    },
    {
      id: "natural-resources",
      name: "Recursos Naturales",
      description: "Identifica y clasifica recursos de la naturaleza",
      icon: "💧",
      component: NaturalResources,
    },
    {
      id: "planet-layers",
      name: "Capas de la Tierra",
      description: "Conoce la estructura de nuestro planeta",
      icon: "🌍",
      component: PlanetLayers,
    },
  ],
  energy: [
    {
      id: "force-examples",
      name: "Ejemplos de Fuerza",
      description: "Identifica fuerzas en actividades cotidianas",
      icon: "💪",
      component: ForceExamples,
    },
    {
      id: "energy-forms",
      name: "Formas de Energía",
      description: "Reconoce diferentes tipos de energía",
      icon: "⚡",
      component: EnergyForms,
    },
    {
      id: "motion-race",
      name: "Carrera de Movimiento",
      description: "Experimenta con velocidad y aceleración",
      icon: "🚀",
      component: MotionRace,
    },
  ],
}

export default function ScienceGames({
  moduleType,
  onBack,
  quizScore = 0,
}: {
  moduleType: "living" | "body" | "earth" | "energy"
  onBack: () => void
  quizScore?: number
}) {
  const moduleGames = games[moduleType] || []
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const selectedGame = moduleGames.find(g => g.id === selectedGameId)
  const GameComponent = selectedGame?.component

  const handleGameComplete = (score: number) => {
    setGameScore(score)
    setShowScore(true)
    setTimeout(() => {
      setSelectedGameId(null)
      setShowScore(false)
    }, 2000)
  }

  if (selectedGameId && GameComponent && !showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedGameId(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mb-6"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <Card className="p-8 bg-gradient-to-b from-white to-gray-50">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">{selectedGame?.name}</h2>
            <GameComponent onComplete={handleGameComplete} />
          </Card>
        </div>
      </div>
    )
  }

  if (showScore) {
    let feedback = ""
    let emoji = ""
    
    if (gameScore >= 90) {
      feedback = "¡Excelente!"
      emoji = "🎉"
    } else if (gameScore >= 70) {
      feedback = "¡Muy Bien!"
      emoji = "👏"
    } else if (gameScore >= 50) {
      feedback = "Bien"
      emoji = "👍"
    } else {
      feedback = "Necesitas practicar más"
      emoji = "💪"
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <p className="text-2xl font-bold text-green-600 mb-2">{feedback}</p>
          <p className="text-xl text-gray-700">Obtuviste {gameScore}/100 puntos</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-black">Juegos Interactivos</h2>
        <div className="w-10"></div>
      </div>

      <div className="text-center mb-12">
        <p className="text-lg text-gray-600 mb-2">Puntuación del cuestionario: {quizScore}/100</p>
        <p className="text-xl text-black">Elige un juego para practicar y divertirte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moduleGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGameId(game.id)}
            className="group text-left transition-all duration-300 hover:scale-105"
          >
            <Card
              className="text-white border-0 shadow-lg hover:shadow-2xl transition-all h-full p-8 rounded-2xl cursor-pointer bg-gradient-to-br from-indigo-400 to-purple-400"
            >
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
