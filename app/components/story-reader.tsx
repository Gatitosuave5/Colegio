"use client"

import { Card } from "@/app/components/ui/card"
import { ArrowLeft, BookOpen } from "lucide-react"

interface Story {
  id: string
  title: string
  author: string
  content: string[]
}

export default function StoryReader({
  story,
  onQuizStart,
  onGamesStart,
  onBack,
}: {
  story: Story
  onQuizStart: () => void
  onGamesStart: () => void
  onBack: () => void
}) {
  const colors = [
    "bg-white border-l-4 border-pink-300",
    "bg-yellow-50 border-l-4 border-yellow-300",
    "bg-green-50 border-l-4 border-green-300",
    "bg-blue-50 border-l-4 border-blue-300",
    "bg-purple-50 border-l-4 border-purple-300",
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{story.title}</h2>
            <p className="text-gray-600">{story.author}</p>
          </div>
        </div>
        <div className="text-5xl">📖</div>
      </div>

      {/* Story Content */}
      <Card className="bg-gradient-to-b from-pink-50 to-white border-0 shadow-lg p-8 mb-8 rounded-2xl">
        <div className="space-y-4">
          {story.content.map((paragraph, index) => (
            <div key={index} className={`p-6 rounded-xl ${colors[index % colors.length]}`}>
              <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Moral or Conclusion */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl border-2 border-pink-300">
          <p className="text-center text-gray-900 font-bold text-lg">✨ Fin del cuento ✨</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          Responder Cuestionario
        </button>
        <button
          onClick={onGamesStart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          🎮 Jugar Juegos
        </button>
      </div>
    </div>
  )
}
