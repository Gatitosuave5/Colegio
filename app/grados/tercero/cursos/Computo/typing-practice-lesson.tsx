"use client"

import { Card } from "@/app/components/ui/card"
import { ArrowLeft, Keyboard } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string[]
}

export default function TypingPracticeLessonReader({
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
    "bg-white border-l-4 border-blue-300",
    "bg-cyan-50 border-l-4 border-cyan-300",
    "bg-blue-50 border-l-4 border-blue-300",
  ]

  const isGamesUnlocked =
  (typeof window !== "undefined" &&
    sessionStorage.getItem(`unlocked-${lesson.id}`) === "true") ||
  quizScore >= 65

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{lesson.title}</h2>
            <p className="text-gray-600">Aprende a escribir con velocidad</p>
          </div>
        </div>
        <div className="text-5xl">⌨️</div>
      </div>

      <Card className="bg-gradient-to-b from-blue-50 to-white border-0 shadow-lg p-8 mb-8 rounded-2xl">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Posición Correcta de Manos</h3>
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Tzk1Fflru3aIba9npZrjyXzXtOkNSP.png" 
            alt="Posición correcta de manos en el teclado"
            className="w-full max-w-2xl mx-auto rounded-xl shadow-md mb-6"
          />
          <div className="bg-blue-100 p-6 rounded-xl">
            <p className="text-gray-800 font-semibold mb-3">Instrucciones:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Coloca tus dedos índices en las teclas F y J (tienen pequeños salientes)</li>
              <li>Mantén los dedos curvados y relajados</li>
              <li>Practica presionar cada tecla sin mirar el teclado</li>
              <li>Aumenta gradualmente tu velocidad conforme mejores</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          {lesson.content.map((paragraph, index) => (
            <div key={index} className={`p-6 rounded-xl ${colors[index % colors.length]}`}>
              <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-2 border-blue-300">
          <p className="text-center text-gray-900 font-bold text-lg">✨ ¡Estás listo para practicar! ✨</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Keyboard className="w-5 h-5" />
          Responder Cuestionario
        </button>
        <div className="relative group">
          <button
            onClick={onGamesStart}
            disabled={!isGamesUnlocked}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isGamesUnlocked
                ? "bg-cyan-500 hover:bg-cyan-600 text-white hover:shadow-lg cursor-pointer"
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
