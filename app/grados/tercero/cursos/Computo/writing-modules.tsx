"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import TypingPracticeLessonReader from "./typing-practice-lesson"
import CapitalizationLessonReader from "./capitalization-lesson"
import TextCopyingLessonReader from "./text-copying-lesson"
import WritingQuiz from "./writing-quiz"
import WritingGames from "./writing-games"


type View = "list" | "reading" | "quiz" | "games"

interface Lesson {
  id: string
  title: string
  content: string[]
}

const modules: Record<string, { title: string; icon: string; color: string; lessons: Lesson[] }> = {
  typing: {
    title: "Mecanografía",
    icon: "⌨️",
    color: "from-blue-400 to-cyan-400",
    lessons: [
      {
        id: "typing-basics",
        title: "Bases de la Mecanografía",
        content: [
          "La mecanografía es la técnica de escribir en el teclado sin necesidad de mirar las teclas. Esta habilidad se llama dactilografía.",
          "Para escribir rápido y correctamente, es importante conocer la posición correcta de tus manos. Los dedos índices deben colocarse en las teclas F y J, que tienen pequeños salientes para guiar.",
          "La práctica constante te permitirá mejorar tu velocidad y precisión. Con el tiempo, desarrollarás memoria muscular y podrás escribir sin cometer errores.",
          "Una buena postura también es importante: mantén la espalda recta, los codos flexionados y los pies apoyados en el piso.",
        ],
      },
    ],
  },
  capitalization: {
    title: "Uso de Mayúsculas",
    icon: "🔤",
    color: "from-amber-400 to-yellow-400",
    lessons: [
      {
        id: "capitalization-basics",
        title: "Reglas de Mayúsculas",
        content: [
          "Las mayúsculas se usan para escribir correctamente en español. Son letras más grandes que se emplean al inicio de oraciones y en nombres propios.",
          "Se escribe con mayúscula inicial: al comienzo de una oración, en nombres de personas (Carlos, Ana), nombres de lugares (Perú, Lima), y después de un punto.",
          "Los nombres propios siempre llevan mayúscula inicial, sin importar si están en medio de una oración. Ejemplo: 'Mi hermana María vive en España.'",
          "Practicar el uso correcto de mayúsculas te ayudará a escribir de forma clara y profesional. La escritura correcta es importante en la comunicación escrita.",
        ],
      },
    ],
  },
  textcopying: {
    title: "Copiado de Textos",
    icon: "📝",
    color: "from-green-400 to-emerald-400",
    lessons: [
      {
        id: "text-copying-basics",
        title: "Práctica de Copiado",
        content: [
          "Copiar textos es una excelente forma de practicar escritura mientras memorizas contenido. Las adivinanzas son especialmente útiles para esto.",
          "Las adivinanzas son juegos de palabras que describen algo de forma misteriosa. Ejemplo: 'Tengo hojas pero no soy árbol, ¿qué soy?' Respuesta: un libro.",
          "Las frases motivadoras son textos cortos que nos inspiran. Copiarlas nos ayuda a mejorar escritura y a reflexionar sobre mensajes positivos.",
          "Los versos y rimas tienen sonidos similares en sus finales. Practicar con ellos mejora la pronunciación y la memorización de palabras.",
        ],
      },
    ],
  },
  words: {
    title: "Palabras y Sílabas",
    icon: "🧩",
    color: "from-pink-400 to-rose-400",
    lessons: [
      {
        id: "words-basics",
        title: "Palabras y Sílabas",
        content: [
          "Las sílabas son partes pequeñas de una palabra que se pronuncian juntas. Cada palabra está dividida en una o más sílabas.",
          "Para separar las sílabas de una palabra, debes escuchar cómo se pronuncia. Por ejemplo: ma-ri-po-sa tiene 4 sílabas.",
          "Practicar la división de sílabas te ayuda a mejorar tu lectura y escritura. También facilita aprender a escribir palabras largas correctamente.",
          "Escribir las palabras silaba por sílaba ayuda a los niños a entender mejor cómo se forman las palabras y a mejorar su ortografía.",
        ],
      },
    ],
  },
  numbers: {
    title: "Números y Operaciones",
    icon: "🔢",
    color: "from-teal-400 to-cyan-400",
    lessons: [
      {
        id: "numbers-basics",
        title: "Números y Operaciones",
        content: [
          "El teclado numérico es la sección con números del teclado. Aprender a usarlo correctamente mejora tu velocidad en operaciones matemáticas.",
          "Los símbolos de operación son: + para suma, - para resta, × para multiplicación, y ÷ para división.",
          "Practicar con números fortalece tu habilidad mecanográfica y tu comprensión de operaciones matemáticas simples.",
          "Escribir números correctamente es importante en matemáticas, contabilidad y muchas otras áreas. La práctica constante te hará más rápido y preciso.",
        ],
      },
    ],
  },
}


const storyIdMap: Record<string, string> = {
  "mecanografia": "typing",
  "Uso-de-mayusculas": "capitalization",
  "copiado-de-textos": "textcopying",
  "palabras-y-silabas": "words",
  "numeros-y-operaciones": "numbers"
}

export default function WritingModules({
  onBack,
  contenidosActivos = []   // ← 🔥 valor por defecto para evitar undefined
}: {
  onBack: () => void
  contenidosActivos?: any[]
}) {

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

  const [currentModule, setCurrentModule] = useState<"typing" | "capitalization" | "textcopying" | "words" | "numbers" | null>(null)
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})

  const handleModuleSelect = (moduleId: "typing" | "capitalization" | "textcopying" | "words" | "numbers") => {
    setCurrentModule(moduleId)
    setCurrentView("reading")
    setSelectedLesson(modules[moduleId].lessons[0])
  }

  const handleQuizStart = () => {
    setCurrentView("quiz")
  }

  const handleGamesStart = () => {
    if (!currentModule || !selectedLesson) return
  
    //  Revisar si ya está desbloqueado en sessionStorage (por lección)
    const isUnlockedInSession =
      typeof window !== "undefined" &&
      sessionStorage.getItem(`unlocked-${selectedLesson.id}`) === "true"
  
    //  Guardamos siempre el MEJOR puntaje que haya logrado el alumno
    const bestScore = quizScores[currentModule] || 0
  
    if (isUnlockedInSession || bestScore >= 65) {
      setCurrentView("games")
    } else {
      alert("Debes obtener al menos 65 puntos para desbloquear los juegos. Intenta de nuevo.")
    }
  }

  
  

  const handleQuizComplete = (score: number) => {
    if (currentModule) {
      setQuizScores(prev => ({
        ...prev,
        [currentModule]: Math.max(prev[currentModule] ?? 0, score), // 👈 mejor puntaje
      }))
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
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900"> Área de Cómputo</h1>
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
                contenidosActivos.some((c) => storyIdMap[c.storyId] === key)
              )
              .map(([key, module]) => {
              const backgroundImages: Record<string, string> = {
                typing: "/images/typing-background.png",
                capitalization: "/images/capitalization-background.png",
                textcopying: "/images/textcopying-background.png",
                words: "/images/words-background.png",
                numbers: "/images/numbers-background.png",
              }

              return (
                <button
                  key={key}
                  onClick={() => handleModuleSelect(key as "typing" | "capitalization" | "textcopying" | "words" | "numbers")}
                  className="group text-left transition-all duration-300 hover:scale-105"
                >
                  <Card
                    className="relative border-0 shadow-lg hover:shadow-2xl transition-all p-12 rounded-2xl cursor-pointer overflow-hidden min-h-40"
                    style={{
                      backgroundImage: `url('${backgroundImages[key]}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-45 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-8">
                      <div className="text-8xl flex-shrink-0">{module.icon}</div>
                      <div className="flex-grow">
                        <h3 className="text-4xl font-bold mb-3 text-white">{module.title}</h3>
                        <p className="text-base text-white opacity-95 leading-relaxed">
                          {key === "typing" && "Aprende a escribir rápido y correctamente con ejercicios interactivos"}
                          {key === "capitalization" && "Domina el uso de mayúsculas en español con juegos divertidos"}
                          {key === "textcopying" && "Practica copiando adivinanzas, versos y frases motivadoras"}
                          {key === "words" && "Aprende sobre palabras y sílabas con ejercicios interactivos"}
                          {key === "numbers" && "Aprende a escribir números y realizar operaciones matemáticas con ejercicios interactivos"}
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
    const LessonComponent =
      currentModule === "typing"
        ? TypingPracticeLessonReader
        : currentModule === "capitalization"
          ? CapitalizationLessonReader
          : currentModule === "textcopying"
            ? TextCopyingLessonReader
            : currentModule === "words"
              ? CapitalizationLessonReader // Placeholder component, replace with actual component if available
              : currentModule === "numbers"
                ? CapitalizationLessonReader // Placeholder component, replace with actual component if available
                : null

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {LessonComponent && <LessonComponent
            lesson={selectedLesson}
            onQuizStart={handleQuizStart}
            onGamesStart={handleGamesStart}
            onBack={handleBack}
            quizScore={quizScores[currentModule] || 0}
          />}
        </section>
      </main>
    )
  }

  if (currentView === "quiz" && currentModule && selectedLesson) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WritingQuiz
            quiz={{ id: currentModule, title: modules[currentModule].title }}
            lessonId={selectedLesson.id}   // 👈 clave para sessionStorage
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
          <WritingGames 
            moduleType={currentModule} 
            onBack={handleBack}
            quizScore={quizScores[currentModule] || 0}
          />
        </section>
      </main>
    )
  }

  return null
}
