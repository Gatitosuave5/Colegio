"use client"

import { Card } from "@/app/components/ui/card"
import { ChevronRight } from "lucide-react"

interface Story {
  id: string
  title: string
  author: string
  cover: string
  difficulty: "fácil" | "medio" | "difícil"
}

export default function StoryList({
  stories,
  onSelectStory,
}: {
  stories: Story[]
  onSelectStory: (story: Story) => void
}) {
  const difficultyColors = {
    fácil: "bg-green-100 text-green-800",
    medio: "bg-yellow-100 text-yellow-800",
    difícil: "bg-red-100 text-red-800",
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Cuentos Disponibles</h2>
        <p className="text-xl text-gray-600">Elige un cuento y comienza a leer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="group text-left transition-all duration-300 hover:scale-105"
          >
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all h-full p-6 rounded-2xl cursor-pointer bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="text-6xl">{story.cover}</div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{story.author}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColors[story.difficulty]}`}>
                  {story.difficulty}
                </span>
                <span className="text-xs text-gray-500">Leer →</span>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
