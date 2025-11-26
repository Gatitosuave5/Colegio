"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import ReadingLessonViewer from "./reading-lesson-viewer"
import ReadingQuiz from "./reading-quiz"
import ReadingGames from "./reading-games"


// arriba del componente
const readingStoryMap: Record<string, string> = {
  "story-2do-1": "story-2do-1",
  "story-2do-2": "story-2do-2",
  "story-2do-3": "story-2do-3",
  "story-2do-4": "story-2do-4",
  "story-2do-5": "story-2do-5",
  "story-2do-6": "story-2do-6",
}


type View = "list" | "reading" | "quiz" | "games"

interface Story {
  id: string
  title: string
  content: string
  questions: string[]
  image?: string // Added image property to Story
}

interface Module {
  id: string
  title: string
  icon: string
  color: string
  stories: Story[]
}




const modules: Module[] = [
  {
    id: "module-2do-1",
    title: "La Mariposa Valiente",
    icon: "🦋",
    color: "from-blue-400 to-cyan-400",
    stories: [
      {
        id: "story-2do-1",
        title: "La Mariposa Valiente",
        image: "https://i.imgur.com/6WRwZ1t.png",
        content: `Lila era una pequeña mariposa morada que siempre volaba bajito porque tenía miedo de las alturas. Un día, apareció una flor brillante en lo alto de un árbol y todas las mariposas querían verla. Lila decidió intentarlo. Voló despacio, luego más alto, hasta llegar a la flor. Desde arriba vio el jardín completo y descubrió que el mundo era hermoso cuando uno se atreve.`,
        questions: [
          "¿Cómo se llamaba la mariposa?",
          "¿Por qué volaba siempre bajito?",
          "¿Qué apareció en lo alto del árbol?",
          "¿Qué decidió hacer Lila?",
          "¿Qué vio cuando llegó arriba?",
          "¿Qué enseñanza deja el cuento?"
        ]
      }
    ]
  },
  {
    id: "module-2do-2",
    title: "El León y el Viento",
    icon: "🦁",
    color: "from-amber-400 to-orange-400",
    stories: [
      {
        id: "story-2do-2",
        title: "El León y el Viento",
        image: "https://i.imgur.com/k2g0j3p.png",
        content: `Leo practicaba su rugido todos los días. Pero una mañana, después de un viento frío, amaneció sin voz. Preocupado, fue a buscar al viento, que le dijo: “A veces, para ser fuerte, hay que descansar”. Leo durmió bajo un árbol y, al despertar, dio un rugido enorme. Comprendió que cuidarse también es ser valiente.`,
        questions: [
          "¿Qué practicaba Leo todos los días?",
          "¿Qué le pasó después del viento frío?",
          "¿A quién fue a buscar?",
          "¿Qué consejo le dio el viento?",
          "¿Cómo recuperó su rugido?",
          "¿Qué aprendió Leo?"
        ]
      }
    ]
  },
  {
    id: "module-2do-3",
    title: "La Ciudad de los Paraguas",
    icon: "🎨",
    color: "from-pink-400 to-rose-400",
    stories: [
      {
        id: "story-2do-3",
        title: "La Ciudad de los Paraguas",
        image: "https://i.imgur.com/tcUm6Gz.png",
        content: `En la ciudad de Gotitas todos usaban paraguas de colores. Un día llovió tanto que muchos paraguas salieron volando. Mia, una niña curiosa, recogió los que quedaron y los reparó. Luego los entregó a los vecinos, quienes se pusieron muy felices. Gracias a ella, la ciudad volvió a verse colorida.`,
        questions: [
          "¿Cómo se llamaba la ciudad?",
          "¿Qué usaban todos?",
          "¿Qué pasó cuando llovió demasiado?",
          "¿Qué hizo Mia con los paraguas?",
          "¿Cómo se sintieron los vecinos?",
          "¿Qué enseñanza deja el cuento?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-2do-4",
    title: "El Tren Dormilón",
    icon: "🚂",
    color: "from-red-400 to-red-500",
    stories: [
      {
        id: "story-2do-4",
        title: "El Tren Dormilón",
        image: "https://i.imgur.com/v3xkHfv.png",
        content: `Tito era un tren que siempre tenía sueño y llegaba tarde. Un día, una niña llamada Ana le dijo que si descansaba bien por la noche podría ayudar a todos. Tito decidió intentarlo. A la mañana siguiente despertó temprano y trabajó con energía. Entendió que dormir bien es importante para cumplir con nuestras tareas.`,
        questions: [
          "¿Cómo se llamaba el tren?",
          "¿Qué problema tenía?",
          "¿Quién habló con él?",
          "¿Qué consejo le dio Ana?",
          "¿Cómo cambió Tito?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-2do-5",
    title: "La Luz del Faro Pequeño",
    icon: "🔦",
    color: "from-yellow-400 to-orange-400",
    stories: [
      {
        id: "story-2do-5",
        title: "La Luz del Faro Pequeño",
        image: "https://i.imgur.com/pN5axko.png",
        content: `En la playa Rocas Claras había un faro pequeño que encendía su luz tarde porque creía que nadie lo necesitaba. Una noche un barco se acercaba sin ver nada. El faro encendió su luz a tiempo y salvó a los marineros. Aprendió que aunque uno sea pequeño, puede hacer cosas muy grandes.`,
        questions: [
          "¿Dónde estaba el faro?",
          "¿Por qué encendía su luz tarde?",
          "¿Qué pasó una noche?",
          "¿Cómo ayudó el faro al barco?",
          "¿Qué decidió hacer después?",
          "¿Qué enseñanza deja el cuento?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-2do-6",
    title: "La Llave del Reino Verde",
    icon: "✨",
    color: "from-purple-400 to-indigo-400",
    stories: [
      {
        id: "story-2do-6",
        title: "La Llave del Reino Verde",
        image: "https://i.imgur.com/9aT7aS8.png",
        content: `Tomás cuidaba plantas en el Reino Verde. Un día encontró una llave dorada bajo una hoja gigante. Lo llevó a una puerta escondida que abría un jardín mágico. El reino necesitaba un nuevo cuidador, y Tomás aceptó. Desde entonces, el jardín floreció más que nunca. Aprendió que cuidar la naturaleza es una gran responsabilidad.`,
        questions: [
          "¿Cómo se llamaba el niño?",
          "¿Qué encontró bajo la hoja gigante?",
          "¿A dónde lo llevó la llave?",
          "¿Qué había detrás de la puerta?",
          "¿Qué decidió hacer Tomás?",
          "¿Qué enseñanza tiene el cuento?"
        ]
      }
    ]
  }
]

export default function ReadingModules2({
  onBack,
  contenidosActivos = [],
}: {
  onBack: () => void;
  contenidosActivos?: { storyId: string }[];
}) {

  // 🟣 🔥 FILTRO: solo mostrar los módulos activados por el profesor
  const filteredModules = modules.filter(module =>
    module.stories.some(story =>
      contenidosActivos.some(c => readingStoryMap[c.storyId] === story.id)
    )
  );

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

  // 🟢 Estados (estos ya los tenías)
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  // 🟢 Seleccionar módulo
  const handleModuleSelect = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    setCurrentModule(moduleId);
    setCurrentView("reading");
    setSelectedStory(module?.stories[0] || null);
  }

  const handleQuizStart = () => {
    setCurrentView("quiz")
  }

  const handleGamesStart = () => {
    const unlocked = sessionStorage.getItem(`unlocked-${selectedStory?.id}`) === "true"

      if (currentModule && (quizScores[currentModule] >= 65 || unlocked)) {
      setCurrentView("games")
    } else {
      alert("🔒 Necesitas 65 puntos en el cuestionario para desbloquear los juegos. ¡Intenta de nuevo!")
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
      setSelectedStory(null)
    } else if (currentView === "quiz" || currentView === "games") {
      setCurrentView("reading")
    }
  }

  if (currentView === "list" && !currentModule) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">📚 Módulos de Lectura</h1>
            </div>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Elige un cuento para empezar</h2>
            <p className="text-lg text-gray-600">Lee historias fascinantes y responde preguntas para ganar puntos 🎯</p>
          </div>

          <div className="flex flex-col gap-5">
          {filteredModules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleSelect(module.id)}
                className="group text-left transition-all duration-300 hover:scale-105"
              >
                <Card
                  className="relative border-0 shadow-lg hover:shadow-2xl transition-all p-8 rounded-2xl cursor-pointer overflow-hidden min-h-32 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--card) 0%, var(--card) 100%)`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="text-6xl flex-shrink-0">{module.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-3xl font-bold mb-2 text-gray-900">{module.title}</h3>
                      <p className="text-gray-600">
                      {module.id === "module-2do-1" && "Lila descubre el valor de atreverse a volar alto"}
                      {module.id === "module-2do-2" && "Leo aprende que descansar también es parte de ser fuerte"}
                      {module.id === "module-2do-3" && "Mia devuelve los colores a la ciudad reparando paraguas"}
                      {module.id === "module-2do-4" && "Tito aprende que dormir bien ayuda a cumplir tus tareas"}
                      {module.id === "module-2do-5" && "Un pequeño faro descubre que puede salvar vidas"}
                      {module.id === "module-2do-6" && "Tomás abre un jardín mágico y cuida la naturaleza"}
                      </p>
                    </div>
                    <div className="text-3xl flex-shrink-0 text-gray-400 group-hover:text-gray-600">→</div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  if (currentView === "reading" && selectedStory && currentModule) {
    const module = modules.find(m => m.id === currentModule)
    const score = quizScores[currentModule] || 0

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReadingLessonViewer
            story={selectedStory}
            moduleTitle={module?.title || ""}
            onQuizStart={handleQuizStart}
            onGamesStart={handleGamesStart}
            onBack={handleBack}
            quizScore={score}
            storyImage={selectedStory.image} // Pass image to viewer
          />
        </section>
      </main>
    )
  }

  if (currentView === "quiz" && currentModule && selectedStory) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReadingQuiz
            story={selectedStory}
            onBack={handleBack}
            onQuizComplete={handleQuizComplete}
          />
        </section>
      </main>
    )
  }

  if (currentView === "games" && currentModule && selectedStory) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReadingGames
            story={selectedStory}
            moduleId={currentModule}
            onBack={handleBack}
          />
        </section>
      </main>
    )
  }

  return null
}
