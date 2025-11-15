"use client"

import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string[]
}

export default function TextCopyingLessonReader({
  lesson,
  onQuizStart,
  onGamesStart,
  onBack,
  quizScore = 0,
}: {
  lesson: Lesson
  onQuizStart: () => void
  onGamesStart: () => void
  onBack: () => void
  quizScore?: number
}) {
  const colors = [
    "bg-white border-l-4 border-green-300",
    "bg-green-50 border-l-4 border-green-300",
    "bg-emerald-50 border-l-4 border-emerald-300",
  ]

  const isGamesUnlocked = quizScore >= 65

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{lesson.title}</h2>
            <p className="text-gray-600">Practica copiando textos</p>
          </div>
        </div>
        <div className="text-5xl">📝</div>
      </div>

      <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-8 mb-8 rounded-2xl">
        <div className="mb-8">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j030CZyO9LEo7fwMkj7WrZHJzWedqQ.png" 
            alt="Perro escribiendo en el teclado"
            className="w-full max-w-md mx-auto rounded-xl shadow-md mb-6"
          />
        </div>
        <div className="space-y-4">
          {lesson.content.map((paragraph, index) => (
            <div key={index} className={`p-6 rounded-xl ${colors[index % colors.length]}`}>
              <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300">
          <p className="text-center text-gray-900 font-bold text-lg">✨ ¡Comienza a copiar! ✨</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          Responder Cuestionario
        </button>
        <div className="relative group">
          <button
            onClick={onGamesStart}
            disabled={!isGamesUnlocked}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isGamesUnlocked
                ? "bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg cursor-pointer"
                : "bg-gray-400 text-white cursor-not-allowed opacity-60"
            }`}
          >
            {isGamesUnlocked ? "🎮 Jugar Juegos" : "🔒 Jugar Juegos"}
          </button>
          {!isGamesUnlocked && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Se desbloquea con 65 puntos en el cuestionario
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
