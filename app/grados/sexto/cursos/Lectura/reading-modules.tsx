"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import ReadingLessonViewer from "./reading-lesson-viewer"
import ReadingQuiz from "./reading-quiz"
import ReadingGames from "./reading-games"


// arriba del componente
const readingStoryMap: Record<string, string> = {
  "story-4to-1": "story-4to-1",
  "story-4to-2": "story-4to-2",
  "story-4to-3": "story-4to-3",
  "story-4to-4": "story-4to-4",
  "story-4to-5": "story-4to-5",
  "story-4to-6": "story-4to-6",
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
    id: "module-4to-1",
    title: "El Guardián del Bosque Brumoso",
    icon: "🌲",
    color: "from-green-500 to-emerald-500",
    stories: [
      {
        id: "story-4to-1",
        title: "El Guardián del Bosque Brumoso",
        image: "https://i.imgur.com/DY7j0yG.png",
        content: `En el Bosque Brumoso, donde los árboles parecían tocar el cielo, vivía un zorro llamado Rilan. No era un zorro común: desde pequeño había tenido una habilidad especial para escuchar lo que los árboles susurraban con el viento.
  
  Un día, el bosque amaneció inquieto. Las hojas vibraban con fuerza y las raíces parecían moverse bajo la tierra. Los animales se reunieron preocupados.
  
  —Algo se acerca —dijo el árbol anciano al oído de Rilan—. Algo que podría destruir nuestro hogar.
  
  Rilan, decidido a proteger el bosque, siguió el camino del viento hasta llegar a una zona que jamás había explorado. Allí encontró máquinas gigantes que derribaban árboles para construir un camino. El ruido era tan fuerte que los animales huían asustados.
  
  —No podemos permitirlo —dijo Rilan.
  
  Reunió a búhos, venados, ardillas y hasta a un viejo oso. Juntos bloquearon el paso de las máquinas, haciendo que los humanos se detuvieran. Los ingenieros, sorprendidos por la fuerza y organización de los animales, llamaron a un biólogo del gobierno.
  
  Después de estudiar el bosque, el biólogo descubrió que el Bosque Brumoso era un refugio natural para especies en peligro. Los humanos decidieron suspender la construcción y convertir el lugar en un “Área Protegida”.
  
  Los árboles susurraron agradecidos. Rilan había cumplido su destino: convertirse en el Guardián del Bosque Brumoso.`,
        questions: [
          "¿Qué habilidad especial tenía Rilan?",
          "¿Por qué el bosque amaneció inquieto?",
          "¿Qué encontró Rilan al llegar a la zona desconocida?",
          "¿Cómo reaccionaron los animales ante las máquinas?",
          "¿Qué descubrió el biólogo del gobierno?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-4to-2",
    title: "El Reloj del Tiempo Perdido",
    icon: "⏳",
    color: "from-yellow-500 to-amber-500",
    stories: [
      {
        id: "story-4to-2",
        title: "El Reloj del Tiempo Perdido",
        image: "https://i.imgur.com/zXbZt9M.png",
        content: `En el pequeño pueblo de Villabruma, había una antigua torre con un reloj enorme. Nadie sabía quién lo había construido, pero todos aseguraban que tenía magia.
  
  Maya, una niña curiosa y valiente, escuchó que el reloj marcaba horas diferentes para cada persona. Decidió subir a la torre para comprobarlo. Al llegar arriba, encontró engranajes dorados que brillaban como si tuvieran vida propia.
  
  Cuando Maya tocó una de las manecillas, el tiempo alrededor de ella cambió. Vio escenas del pasado: el pueblo recién construido, niños jugando en calles de tierra, familias sembrando campos verdes.
  
  Después vio el futuro: un pueblo moderno lleno de luces, con autos que pasaban silenciosos y jardines llenos de flores.
  
  Pero también vio algo preocupante: un futuro donde la torre estaba derrumbada y los habitantes vivían apurados, sin hablar entre ellos.
  
  Al bajar, Maya reunió a todos en la plaza:
  
  —Si no cuidamos nuestro tiempo, perderemos lo que nos hace felices —dijo.
  
  Los adultos reflexionaron. Desde ese día decidieron dedicar más tiempo a sus familias, a conversar, a caminar y a mantener viva la torre.
  
  El reloj volvió a latir con fuerza, como agradeciendo que el pueblo había recuperado su tiempo.`,
        questions: [
          "¿Qué particularidad tenía el reloj de la torre?",
          "¿Qué vio Maya cuando tocó la manecilla?",
          "¿Qué escena del futuro le preocupó?",
          "¿Qué consejo dio Maya a los habitantes?",
          "¿Qué hicieron los adultos después de escucharla?",
          "¿Cuál es el mensaje principal del cuento?"
        ]
      }
    ]
  },
  {
    id: "module-4to-3",
    title: "La Ciudad Subterránea de Lumen",
    icon: "🕯️",
    color: "from-orange-600 to-red-500",
    stories: [
      {
        id: "story-4to-3",
        title: "La Ciudad Subterránea de Lumen",
        image: "https://i.imgur.com/6nhJw0v.png",
        content: `Bajo la montaña Lúmina existía una ciudad secreta iluminada únicamente por cristales brillantes. Allí vivían los lumenitas, pequeños seres que trabajaban extrayendo luz de las piedras.
  
  Tara, una lumenita joven, descubrió que los cristales perdían brillo cada vez más rápido. Preocupada, investigó en los túneles más profundos y halló una grieta que drenaba la energía de la montaña.
  
  —Si la grieta sigue creciendo, nuestra ciudad quedará en oscuridad —advirtió.
  
  Junto a su amigo Nilo, creó una mezcla de polvo mineral que podía sellar la grieta, pero necesitaban llegar al punto más peligroso del túnel.
  
  Mientras avanzaban, escucharon ruidos extraños. Era una criatura hecha de sombra pura, atraída por la energía que escapaba. Los rodeó queriendo absorber su luz.
  
  Tara no retrocedió. Levantó su cristal y lo dejó brillar con todas sus fuerzas. La sombra retrocedió y desapareció entre las rocas.
  
  Con la criatura derrotada, sellaron la grieta y la luz volvió a recorrer toda la ciudad.
  
  Tara fue celebrada por todos. Aprendió que incluso alguien pequeño puede iluminar los rincones más oscuros del mundo.`,
        questions: [
          "¿Dónde vivían los lumenitas?",
          "¿Qué descubrió Tara sobre los cristales?",
          "¿Qué encontraron en los túneles profundos?",
          "¿Qué era la criatura de sombra?",
          "¿Cómo lograron salvar la ciudad?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-4to-4",
    title: "El Puente de los Ecos",
    icon: "🌉",
    color: "from-cyan-600 to-blue-700",
    stories: [
      {
        id: "story-4to-4",
        title: "El Puente de los Ecos",
        image: "https://i.imgur.com/hQfUCFc.png",
        content: `En el río Auris había un puente muy extraño: todo lo que uno decía bajo él regresaba convertido en un consejo.
  
  Sergio, un niño distraído, siempre perdía sus cosas y se frustraba. Un día, cuando no encontraba su cuaderno, se sentó bajo el puente y dijo molesto:
  
  —Siempre me pasa lo mismo.
  
  El eco respondió:  
  —Organiza tu día y verás cómo encuentras tu camino.
  
  Sorprendido, Sergio empezó a visitar el puente cada tarde. Cada vez que compartía un problema, recibía un consejo útil.
  
  Pero una mañana notó que el puente estaba débil y a punto de derrumbarse. Si el puente se destruía, dejaría de ayudar a todos.
  
  Sergio reunió a niños y adultos del pueblo. Trabajaron juntos para restaurarlo, colocando nuevas maderas, reforzando piedras y limpiando el río.
  
  Cuando terminaron, el puente brilló y devolvió un último mensaje:
  
  —Quien cuida lo que tiene, nunca pierde su camino.
  
  Sergio sonrió, comprendiendo que el puente lo había ayudado… pero él también había ayudado al puente.`,
        questions: [
          "¿Qué tenía de especial el Puente de los Ecos?",
          "¿Cuál era el problema de Sergio?",
          "¿Qué consejo recibió la primera vez?",
          "¿Qué descubrió una mañana sobre el puente?",
          "¿Cómo lo repararon?",
          "¿Qué enseñanza transmite el cuento?"
        ]
      }
    ]
  }
  ,
  {
    id: "module-4to-5",
    title: "La Biblioteca de los Animales Sabios",
    icon: "📚",
    color: "from-indigo-600 to-purple-600",
    stories: [
      {
        id: "story-4to-5",
        title: "La Biblioteca de los Animales Sabios",
        image: "https://i.imgur.com/jlgEJ5H.png",
        content: `En el centro del gran bosque había una biblioteca única: los libros estaban escritos por animales. Había historias de vuelos de águilas, aventuras submarinas de nutrias y diarios secretos de mapaches curiosos.
  
  Lorenzo, un conejo muy inquieto, nunca terminaba un libro. Solo leía la primera parte y luego se aburría. Un día encontró un libro extraño con la portada en blanco. Al abrirlo, descubrió que las páginas se escribían solas con cada decisión que él tomaba.
  
  —¿Un libro sobre mí? —preguntó sorprendido.
  
  Pero cuando quiso leer el final, estaba vacío.
  
  Un búho bibliotecario le explicó:
  
  —Los finales no están escritos porque aún no has terminado nada importante.
  
  Entonces Lorenzo decidió cambiar. Comenzó a terminar tareas, terminó su guarida, terminó un dibujo que había empezado hace meses, y finalmente… terminó de leer su primer libro completo.
  
  Cuando volvió al libro mágico, el final apareció:  
  “Lorenzo descubrió que la constancia convierte a cualquiera en protagonista de su propia historia.”
  
  Sonrió satisfecho. Ahora sabía que cada final se construye con esfuerzo.`,
        questions: [
          "¿Qué tenía de especial la biblioteca?",
          "¿Cuál era el problema de Lorenzo?",
          "¿Qué descubrió al abrir el libro blanco?",
          "¿Qué le dijo el búho?",
          "¿Qué cosas comenzó a terminar Lorenzo?",
          "¿Cuál fue el mensaje final del libro?"
        ]
      }
    ]
  }
  
  ,
  {
    id: "module-4to-6",
    title: "El Viaje del Barco de Papel",
    icon: "⛵",
    color: "from-amber-800 to-yellow-700",
    stories: [
      {
        id: "story-4to-6",
        title: "El Viaje del Barco de Papel",
        image: "https://i.imgur.com/dkZ1QO6.png",
        content: `Gabriel construyó un barco de papel con una hoja vieja de su cuaderno y lo dejó navegar en el río del parque. Pero una corriente fuerte lo arrastró lejos, más de lo que él esperaba.
  
  El barco pasó por un puente, atravesó un pequeño bosque y llegó a una laguna donde unos niños lo recogieron.
  
  —¡Qué barco tan resistente! —dijo una niña.
  
  Lo decoraron con colores y lo soltaron de nuevo. Esta vez viajó hasta una zona donde el río se hacía más ancho. Allí un pescador lo vio flotar.
  
  —Este pequeño barco tiene muchas historias encima —dijo riendo.
  
  Lo reparó con pegamento y lo dejó ir otra vez.
  
  Finalmente, después de un largo viaje, el barco regresó al parque. Gabriel lo encontró junto a una roca, con dibujos nuevos y marcas de todos los lugares donde había estado.
  
  —Viajaste más que yo —dijo sorprendido.
  
  Entonces entendió que incluso las cosas pequeñas pueden tener grandes aventuras si se dejan llevar por la corriente correcta.`,
        questions: [
          "¿Con qué hizo Gabriel su barco?",
          "¿Qué lugares recorrió el barco?",
          "¿Quiénes lo encontraron en la laguna?",
          "¿Qué hizo el pescador?",
          "¿Cómo regresó el barco al parque?",
          "¿Qué enseñanza deja esta historia?"
        ]
      }
    ]
  }
]

export default function ReadingModules4({
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
                      {module.id === "module-4to-1" && "Rilan protege el Bosque Brumoso y se convierte en su guardián"}
                      {module.id === "module-4to-2" && "Maya descubre el secreto del Reloj del Tiempo Perdido"}
                      {module.id === "module-4to-3" && "Tara salva la Ciudad Subterránea de Lumen con valentía"}
                      {module.id === "module-4to-4" && "Sergio restaura el Puente de los Ecos y descubre su mensaje"}
                      {module.id === "module-4to-5" && "Lorenzo aprende a terminar lo que empieza gracias a un libro mágico"}
                      {module.id === "module-4to-6" && "El barco de papel de Gabriel vive una gran aventura y vuelve a casa"}

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
