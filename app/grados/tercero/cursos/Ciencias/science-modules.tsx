"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import ScienceLessonReader from "./science-lesson-reader"
import QuizGames from "@/app/grados/tercero/cursos/Ciencias/science-quiz" // Fixed import path for ScienceQuiz
import ScienceGames from "./science-games"
import ScienceQuiz from "@/app/grados/tercero/cursos/Ciencias/science-quiz"

const scienceTopicMap = {
  "seres-vivos-entorno": "living",
  "cuerpo-humano": "body",
  "tierra-clima-recursos": "earth",
  "fuerza-movimiento-energia": "energy",
} as const;

interface ContenidoActivo {
  storyId: keyof typeof scienceTopicMap;
}

type View = "list" | "reading" | "quiz" | "games"

interface Lesson {
  id: string
  title: string
  content: string[]
}

const modules: Record<string, { title: string; icon: string; color: string; lessons: Lesson[]; emoji: string; description: string; image: string }> = {
  living: {
    title: "Seres vivos y su entorno",
    icon: "🦁",
    color: "from-green-400 to-emerald-400",
    emoji: "🦁",
    description: "Aprende sobre los seres vivos y cómo interactúan con su entorno",
    image: "/images/seresvivosasd.jpeg",
    lessons: [
      {
        id: "living-basics",
        title: "Seres vivos y su entorno",
        content: [
          "Los seres vivos son todos los organismos que tienen vida: plantas, animales, hongos y microorganismos. Cada uno tiene características únicas que los hacen especiales.",
          "El entorno o hábitat es el lugar donde viven los seres vivos. Incluye factores como el clima, el terreno, el agua y otros organismos que conviven en ese espacio.",
          "Las plantas son productores de oxígeno y alimento. Los animales dependen de las plantas para vivir, creando una relación importante en la naturaleza.",
          "Los ecosistemas están formados por seres vivos que interactúan entre sí. Entender cómo conviven nos ayuda a cuidar mejor nuestro planeta.",
        ],
      },
    ],
  },
  body: {
    title: "El cuerpo humano",
    icon: "🧬",
    color: "from-pink-400 to-rose-400",
    emoji: "🧬",
    description: "Descubre las maravillas del cuerpo humano y cómo funciona",
    image: "https://i.imgur.com/Ywppl1k.jpeg",
    lessons: [
      {
        id: "body-basics",
        title: "El cuerpo humano",
        content: [
          "El cuerpo humano está formado por millones de células organizadas en tejidos y órganos. Cada parte tiene una función importante para que podamos vivir.",
          "El sistema óseo sostiene el cuerpo y protege los órganos importantes. Los huesos trabajados con los músculos nos permiten movernos y realizar actividades.",
          "El corazón bombea sangre a todo el cuerpo, llevando oxígeno y nutrientes a cada célula. Es uno de los órganos más importantes para la vida.",
          "El cerebro controla todas nuestras funciones: pensamientos, movimientos, emociones y sensaciones. Es el centro de control de nuestro cuerpo.",
        ],
      },
    ],
  },
  earth: {
    title: "Tierra, clima y recursos naturales",
    icon: "🌍",
    color: "from-blue-400 to-cyan-400",
    emoji: "🌍",
    description: "Entiende nuestro planeta, el clima y los recursos que nos rodean",
    image: "https://img.freepik.com/vector-gratis/mundo-miniatura-naturaleza-vida-silvestre_1308-167199.jpg?semt=ais_hybrid&w=740&q=80https://img.freepik.com/vector-gratis/mundo-miniatura-naturaleza-vida-silvestre_1308-167199.jpg?semt=ais_hybrid&w=740&q=80",
    lessons: [
      {
        id: "earth-basics",
        title: "Tierra, clima y recursos naturales",
        content: [
          "La Tierra es nuestro planeta y tiene diferentes capas: la corteza, el manto y el núcleo. Cada capa tiene propiedades diferentes y cumple funciones importantes.",
          "El clima es el conjunto de condiciones atmosféricas que caracterizan a una región. Influye en los seres vivos, las plantas y el comportamiento humano.",
          "Los recursos naturales son los bienes que nos proporciona la naturaleza: agua, aire, minerales, petróleo, bosques y animales. Debemos usarlos responsablemente.",
          "Cuidar el planeta es responsabilidad de todos. Usar recursos sosteniblemente y reducir la contaminación ayuda a proteger el futuro de las próximas generaciones.",
        ],
      },
    ],
  },
  energy: {
    title: "Fuerza, movimiento y energía",
    icon: "⚡",
    color: "from-yellow-400 to-orange-400",
    emoji: "⚡",
    description: "Explora la fuerza, el movimiento y la energía en el universo",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpmOEvDIWK5rfiZOFt7qTgwql7KYhR1saTg&s",
    lessons: [
      {
        id: "energy-basics",
        title: "Fuerza, movimiento y energía",
        content: [
          "La fuerza es el empuje o tirón que causa cambios en el movimiento de los objetos. Puede ser de contacto (empuje directo) o a distancia (gravedad).",
          "El movimiento es el cambio de posición de un objeto en el espacio. La velocidad nos indica qué tan rápido se mueve algo en una dirección determinada.",
          "La energía es la capacidad para realizar trabajo. Existe en muchas formas: térmica, luminosa, eléctrica, cinética y potencial.",
          "Todo está en movimiento y en transformación. Entender las fuerzas y la energía nos ayuda a comprender cómo funciona el universo que nos rodea.",
        ],
      },
    ],
  },
}

export default function ScienceModules({
  onBack,
  contenidosActivos = [],
}: {
  onBack: () => void;
  contenidosActivos?: ContenidoActivo[];
}) {
  const [currentModule, setCurrentModule] = useState<"living" | "body" | "earth" | "energy" | null>(null)
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})

  useEffect(() => {
    // Sólo activar cuando ENTRAS al módulo
    history.pushState({ module: true }, "");
    
    const handleBack = (event: PopStateEvent) => {
      // Cuando el navegador intenta retroceder → volvemos al lobby
      onBack();
      
      // Volvemos a insertar el estado para bloquear múltiples atrás
      history.pushState({ module: true }, "");
    };
  
    window.addEventListener("popstate", handleBack);
  
    return () => window.removeEventListener("popstate", handleBack);
  }, []);
  

  
  const handleModuleSelect = (moduleId: "living" | "body" | "earth" | "energy") => {
    setCurrentModule(moduleId)
    setCurrentView("reading")
    setSelectedLesson(modules[moduleId].lessons[0])
  }

  const handleQuizStart = () => {
    setCurrentView("quiz")
  }

  const handleGamesStart = () => {
    if (quizScores[currentModule] && quizScores[currentModule] >= 65) {
      setCurrentView("games")
    } else {
      alert("Debes obtener al menos 65 puntos para desbloquear los juegos. Intenta de nuevo.")
    }
  }

  const handleQuizComplete = (score: number) => {
    if (currentModule) {
      setQuizScores(prev => ({ ...prev, [currentModule]: score }))
      setCurrentView("reading")
    }
  }

  const handleBack = () => {
    if (currentView === "reading") {
      setCurrentView("list")
      setCurrentModule(null)
      setSelectedLesson(null)
    } else if (currentView === "quiz" || currentView === "games") {
      setCurrentView("reading")
    }
  }

  if (currentView === "list" && !currentModule) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Módulos de Ciencias</h1>
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600">Elige un módulo para comenzar</p>
          </div>

          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {Object.entries(modules)
              .filter(([key]) =>
                contenidosActivos.some(c => scienceTopicMap[c.storyId] === key)
              )
              .map(([key, module]) => {
              const backgroundImages: Record<string, string> = {
                living: "/images/seresvivos.jpeg",
                body: "/images/cuerpohumano.jpeg",
                earth: "/images/tierra.jpeg",
                energy: "/images/fuerza.jpeg",
              }

              return (
                <button
                  key={key}
                  onClick={() => handleModuleSelect(key as "living" | "body" | "earth" | "energy")}
                  className="group text-left transition-all duration-300 hover:scale-105"
                >
                  <Card
                    className="relative border-0 shadow-lg hover:shadow-2xl transition-all p-12 rounded-2xl cursor-pointer overflow-hidden min-h-40"
                    style={{
                      backgroundImage: `url('${backgroundImages[key]}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-50 group-hover:opacity-35 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-8">
                      <div className="text-8xl flex-shrink-0">{module.icon}</div>
                      <div className="flex-grow">
                        <h3 className="text-4xl font-bold mb-3 text-white drop-shadow-lg">{module.title}</h3>
                        <p className="text-base text-white opacity-95 leading-relaxed drop-shadow-md">
                          {module.description}
                        </p>
                      </div>
                      <div className="text-4xl flex-shrink-0 text-white opacity-50">→</div>
                    </div>
                  </Card>
                </button>
              )
            })}
          </div>
        </section>
      </main>
    )
  }

  if (currentView === "reading" && selectedLesson && currentModule) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScienceLessonReader
            lesson={selectedLesson}
            onQuizStart={handleQuizStart}
            onGamesStart={handleGamesStart}
            onBack={handleBack}
            quizScore={quizScores[currentModule] || 0}
            emoji={modules[currentModule].emoji}
            description={modules[currentModule].description}
            image={modules[currentModule].image}
          />
        </section>
      </main>
    )
  }

  if (currentView === "quiz" && currentModule) {
    const quizIdMap: Record<string, string> = {
      living: "living_beings",
      body: "human_body",
      earth: "earth_climate",
      energy: "energy_movement",
    }

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScienceQuiz
            quiz={{ id: quizIdMap[currentModule], title: modules[currentModule].title }} 
            onBack={handleBack}
            onQuizComplete={handleQuizComplete}
          />
        </section>
      </main>
    )
  }

  if (currentView === "games" && currentModule) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ScienceGames 
            moduleType={currentModule as "living" | "body" | "earth" | "energy"} 
            onBack={handleBack}
            quizScore={quizScores[currentModule] || 0}
          />
        </section>
      </main>
    )
  }

  return null

}
