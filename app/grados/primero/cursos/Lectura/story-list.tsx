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
  const storyBackgrounds: { [key: string]: string } = {
    "caperucita-roja":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qtJ5lh5Xh2ECgktKwr6DnEd5D6BQWF.png",
    "el-patito-feo": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOCzekqSePpu0dWADgd88XhQIBhyX9.png",
    "cenicienta": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qsZdyGVPe2yH00PO0BCh7wcZBBzsTC.png",
  }

  const getBackgroundImage = (storyId: string) => {
    return storyBackgrounds[storyId] || ""
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Cuentos Disponibles</h2>
        <p className="text-xl text-gray-600">Elige un cuento y comienza a leer</p>
      </div>

      <div className="space-y-4">
        {/* ✅ Reemplazar data.map con stories.map */}
        {stories.map((story) => {
          const bgImage = getBackgroundImage(story.id)

          return (
            <button
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="w-full group text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Card
                className="border-0 shadow-lg hover:shadow-2xl transition-all h-48 p-6 rounded-2xl cursor-pointer text-white relative overflow-hidden"
                style={{
                  backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all rounded-2xl" />

                <div className="relative flex items-center justify-between h-full z-10">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="text-7xl flex-shrink-0">{story.cover}</div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-1">{story.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{story.author}</p>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white bg-opacity-30">
                        {story.difficulty}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-8 h-8 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
