"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import StoryList from "@/app/grados/primero/cursos/Lectura/story-list"
import StoryReader from "@/app/grados/primero/cursos/Lectura/story-reader"
import QuizComponent from "@/app/grados/primero/cursos/Lectura/quiz-component"
import GamesComponent from "@/app/grados/primero/cursos/Lectura/games-component"

type View = "list" | "reading" | "quiz" | "games"

interface Story {
  id: string
  title: string
  author: string
  cover: string
  content: string[]
  difficulty: "fácil" | "medio" | "difícil"
}
export default function LiteratureModule({ onBack }) {

  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [contenidosActivos, setContenidosActivos] = useState<string[]>([])
  const stories: Story[] = [
    {
      id: "caperucita-roja",
      title: "Caperucita Roja",
      author: "Cuento Tradicional",
      cover: "🔴",
      difficulty: "fácil",
      content: [
        "Había una vez una niña pequeña que vivía en una casita al borde del bosque. Su abuela le había regalado un hermoso vestido rojo con una caperuza, y la niña lo amaba tanto que todos la llamaban Caperucita Roja.",
        'Un día, su mamá le pidió que llevara una canasta con comida a su abuela, que vivía al otro lado del bosque. "Ten cuidado", le advirtió su madre, "y no hables con extraños en el camino".',
        "Caperucita salió feliz con su canasta, caminando por el sendero del bosque. Las flores silvestres brillaban bajo el sol, y los pájaros cantaban alegremente. Pero en lo profundo del bosque, un lobo astuto la vio pasar.",
        'El lobo se acercó a Caperucita con una sonrisa falsa. "¿Adónde vas, pequeña?" preguntó. Sin pensar en el consejo de su madre, Caperucita le contó todo: que iba a visitar a su abuela, que vivía sola en el bosque, y que llevaba comida deliciosa.',
        "El lobo, con sus intenciones malvadas, le sugirió que recogiera flores para su abuela. Mientras Caperucita se distraía buscando las flores más bonitas, el lobo corrió rápidamente hacia la casa de la abuela.",
        'Cuando Caperucita finalmente llegó a la casa de su abuela, algo extraño notó. "Abuela, ¿por qué tienes los ojos tan grandes?" preguntó. "Para verte mejor, mi niña", respondió una voz extraña. "¿Por qué tienes las orejas tan grandes?" "Para escucharte mejor". "¿Y por qué tienes los dientes tan grandes?" "¡Para comerte mejor!" rugió el lobo.',
        "Caperucita gritó asustada, pero en ese momento, un cazador que pasaba cerca escuchó sus gritos. Entró rápidamente a la casa y ahuyentó al lobo. La abuela, que estaba escondida, salió ilesa. Caperucita aprendió una lección importante: siempre debe escuchar los consejos de sus padres y nunca hablar con extraños.",
        "Y así, Caperucita regresó a casa con su abuela, más sabia y cuidadosa que antes.",
      ],
    },
    {
      id: "el-patito-feo",
      title: "El Patito Feo",
      author: "Hans Christian Andersen",
      cover: "🦆",
      difficulty: "medio",
      content: [
        "En una granja tranquila, una pata empollaba sus huevos con paciencia. Cuando finalmente eclosionaron, salieron patitos amarillos y adorables. Pero había un huevo más grande que no había eclosionado aún.",
        "Después de varios días, ese huevo finalmente se rompió. De él salió un patito muy diferente: era gris, grande y feo. Los otros patitos se burlaban de él constantemente.",
        "El patito feo se sentía rechazado y triste. Decidió huir de la granja para buscar un lugar donde pudiera ser aceptado. Viajó por muchos lugares, pero en todas partes lo rechazaban por su apariencia.",
        "Pasaron los meses y llegó el invierno. El patito feo sufrió mucho frío y hambre. Pero cuando llegó la primavera, algo mágico sucedió. El patito feo se dio cuenta de que había cambiado.",
        "Mirándose en el agua, descubrió que ya no era un patito feo. Se había convertido en un hermoso cisne blanco. Los otros cisnes lo rodearon con admiración y lo aceptaron como uno de los suyos.",
        "El patito feo finalmente encontró su lugar en el mundo. Aprendió que la verdadera belleza no está en la apariencia, sino en el corazón, y que todos merecemos ser aceptados tal como somos.",
      ],
    },
    {
      id: "cenicienta",
      title: "Cenicienta",
      author: "Cuento Tradicional",
      cover: "👗",
      difficulty: "medio",
      content: [
        "Había una vez una joven hermosa llamada Cenicienta que vivía con su madrastra y sus dos hermanastras. Después de la muerte de su padre, la trataban como una sirvienta, obligándola a hacer todos los trabajos de la casa.",
        "Un día, el príncipe del reino organizó un gran baile para encontrar esposa. Todas las jóvenes del reino fueron invitadas. Las hermanastras de Cenicienta estaban emocionadas, pero no le permitieron asistir.",
        "Cenicienta estaba triste en la cocina cuando apareció su hada madrina. Con un toque de su varita mágica, transformó un calabaza en una hermosa carroza, los ratones en caballos, y los harapos de Cenicienta en un vestido de ensueño.",
        '"Pero recuerda", advirtió el hada madrina, "el hechizo se romperá a la medianoche. Debes regresar antes de que suene la última campana".',
        "En el baile, el príncipe quedó maravillado por la belleza de Cenicienta. Bailaron toda la noche juntos. Pero cuando el reloj comenzó a sonar la medianoche, Cenicienta recordó la advertencia y huyó.",
        "En su prisa, perdió una de sus zapatillas de cristal. El príncipe, determinado a encontrarla, viajó por todo el reino probando la zapatilla en cada joven. Cuando llegó a la casa de Cenicienta, la zapatilla le quedó perfectamente.",
        "El príncipe reconoció a Cenicienta y le pidió que se casara con él. Cenicienta aceptó feliz, y vivieron juntos en el castillo, donde ella fue tratada con el amor y respeto que siempre merecía.",
      ],
    },
  ]

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story)
    setCurrentView("reading")
  }

  const handleQuizStart = () => {
    setCurrentView("quiz")
  }

  const handleGamesStart = () => {
    setCurrentView("games")
  }

  useEffect(() => {
    const cargarContenidos = async () => {
      const codigo = localStorage.getItem("codigoSalon")
      if (!codigo) return
      
      const res = await fetch(`http://localhost:3001/api/contenidos?codigo=${codigo}`)
      const data = await res.json()
  
      // 🔥 GUARDAR SOLO STORY IDs
      const activos = (data.contenidos || [])
        .filter(c => c.categoria === "Lectura")
        .map(c => c.storyId)
  
      setContenidosActivos(activos)
    }
    cargarContenidos()
  }, [])
  

  const handleBack = () => {
    if (currentView === "reading") {
      setCurrentView("list")
      setSelectedStory(null)
    } else if (currentView === "quiz" || currentView === "games") {
      setCurrentView("reading")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Literatura</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === "list" && (
            <StoryList
            stories={stories.filter(s => contenidosActivos.includes(s.id))}
              onSelectStory={handleStorySelect}
            />
          )}

          {currentView === "reading" && selectedStory && (
            <StoryReader
              story={selectedStory}
              onQuizStart={handleQuizStart}
              onGamesStart={handleGamesStart}
              onBack={handleBack}
            />
          )}

          {currentView === "quiz" && selectedStory && (
            <QuizComponent story={selectedStory} onBack={handleBack} />
          )}

          {currentView === "games" && selectedStory && (
            <GamesComponent story={selectedStory} onBack={handleBack} />
          )}
        </section>
    </main>
  )
}
