"use client"

import { Card } from "@/app/components/ui/card"
import { ArrowLeft, BookOpen } from 'lucide-react'

interface Story {
  id: string
  title: string
  content: string
  questions: string[]
}

export default function ReadingLessonViewer({
  story,
  moduleTitle,
  onQuizStart,
  onGamesStart,
  onBack,
  quizScore = 0,
  storyImage, // Added storyImage prop
}: {
  story: Story
  moduleTitle: string
  onQuizStart: () => void
  onGamesStart: () => void
  onBack: () => void
  quizScore?: number
  storyImage?: string // Added image URL prop
}) {
  const isGamesUnlocked = quizScore >= 65
  const paragraphs = story.content.split('\n\n')

  const colors = [
    "bg-white border-l-4 border-purple-300",
    "bg-purple-50 border-l-4 border-purple-300",
    "bg-violet-50 border-l-4 border-violet-300",
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{story.title}</h2>
            <p className="text-gray-600 flex items-center gap-2"><BookOpen className="w-4 h-4" /> {moduleTitle}</p>
          </div>
        </div>
        <div className="text-5xl">📖</div>
      </div>

      <Card className="bg-white border-0 shadow-lg p-8 mb-8 rounded-2xl">
        {storyImage && (
          <div className="mb-8 flex justify-center">
            <img src={storyImage || "/placeholder.svg"} alt={story.title} className="max-w-full h-auto rounded-xl shadow-md max-h-96" />
          </div>
        )}

        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 p-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl border-2 border-purple-300">
          <p className="text-center text-gray-900 font-bold text-lg">✨ ¡Ahora demuestra que comprendiste! ✨</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          📝 Responder Cuestionario
        </button>
        <div className="relative group">
          <button
            onClick={onGamesStart}
            disabled={!isGamesUnlocked}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isGamesUnlocked
                ? "bg-violet-500 hover:bg-violet-600 text-white hover:shadow-lg cursor-pointer"
                : "bg-gray-400 text-white cursor-not-allowed opacity-60"
            }`}
          >
            {isGamesUnlocked ? "🎮 Jugar Juegos" : "🔒 Jugar Juegos"}
          </button>
          {!isGamesUnlocked && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Se desbloquea con {65 - quizScore} puntos más en cuestionario
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
