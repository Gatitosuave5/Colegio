"use client"

import { useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Card } from "@/app/components/ui/card"
import ReadingLessonViewer from "./reading-lesson-viewer"
import ReadingQuiz from "./reading-quiz"
import ReadingGames from "./reading-games"


// arriba del componente
const readingStoryMap: Record<string, string> = {
  "La-Mariposa-Azul-y-la-Pradera-de-las-Luces": "story-1",
  "El-León-que-Perdió-su-Rugido": "story-2",
  "La-Ciudad-de-los-Colores-Perdidos": "story-3",
  "El-Tren-que-No-Quería-Parar": "story-4",
  "La-Isla-del-Faro-Solitario": "story-5",
  "Las-Aventuras-del-Reino-Encantado": "story-6",
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
    id: "module-1",
    title: "La Mariposa Azul",
    icon: "🦋",
    color: "from-blue-400 to-cyan-400",
    stories: [
      {
        id: "story-1",
        title: "La Mariposa Azul y la Pradera de las Luces",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pIp1nybWt0svtP0rUKb8p2sVh9CyLn.png", // Updated image URL
        content: `En un jardín lleno de flores de todos los colores vivía Azulina, una mariposa azul de alas brillantes. Le encantaba revolotear entre girasoles y margaritas, pero siempre sentía curiosidad por lo que había más allá del jardín.

Un día, mientras bebía néctar, escuchó a dos abejorros hablar emocionados.
—¡En la pradera del este hay luces que bailan de noche! —dijo uno.
—Yo las vi, brillan como estrellas en el pasto —respondió el otro.

Azulina sintió un cosquilleo de emoción. Nunca había salido tan lejos, pero el deseo de ver esas luces era más fuerte que su miedo.
—Voy a ir —decidió con valentía.

Comenzó su viaje. Voló sobre arbustos, pasó entre árboles altos y cruzó un pequeño arroyo donde los renacuajos saltaban. Mientras avanzaba, conoció a Tico, un saltamontes verde que descansaba en una hoja mojada.
—¿A dónde vas tan decidida? —preguntó Tico.
—A la pradera de las luces —respondió Azulina.
—Es un viaje largo. Te acompañaré —dijo el saltamontes, dando un gran salto.

Ambos siguieron el camino. En el trayecto, una nube oscura cubrió el cielo. Se levantó un viento fuerte que empujó a Azulina.
—¡No puedo avanzar! —gritó.
Tico la sostuvo con una hoja para protegerla.
—Espera, la tormenta pasará —dijo con calma.

Cuando el sol volvió a aparecer, continuaron su aventura. Finalmente, llegaron a la pradera. Era un lugar enorme, con pasto suave y flores que olían a miel. Pero lo más sorprendente ocurrió al caer la noche.

Miles de lucíernagas comenzaron a brillar. Encendían y apagaban su luz como si estuvieran bailando una canción secreta. Azulina no podía creer lo hermoso que era.
—¡Valió la pena el viaje! —dijo maravillada.
—Sí —respondió Tico—. A veces, lo más bonito está después del miedo.

Azulina decidió regresar al jardín al día siguiente. Sabía que muchas mariposas nunca se habían atrevido a salir, y ella quería contarles sobre las luces danzantes.
Cuando llegó, todas se reunieron a su alrededor para escuchar la historia. Azulina descubrió que los viajes no solo sirven para ver cosas nuevas, sino también para compartirlas.`,
        questions: [
          "¿Qué escuchó Azulina que despertó su curiosidad?",
          "¿Quién decidió acompañarla en el viaje?",
          "¿Qué dificultad tuvieron durante el camino?",
          "¿Qué eran las luces que vio en la pradera?",
          "¿Qué aprendió Azulina al final del viaje?",
          "¿Por qué quiso regresar para contar su historia?"
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "El León sin Rugido",
    icon: "🦁",
    color: "from-amber-400 to-orange-400",
    stories: [
      {
        id: "story-2",
        title: "El León que Perdió su Rugido",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6gprNkGplMHVpJkXNWBVtoFLLYMQ78.png",
        content: `En la sabana africana vivía Leo, un joven león conocido por tener el rugido más fuerte de su manada. Cada mañana rugía para saludar al día, y todos los animales lo escuchaban. Pero una noche, después de correr bajo la lluvia, Leo amaneció con un problema inesperado: no tenía voz.

Intentó rugir, pero solo salió un pequeño susurro.
—¿Qué me pasa? —dijo preocupado.

Leo decidió buscar ayuda. Primero fue con Gigi, la jirafa.
—Tal vez estás resfriado —dijo ella—. Te vendrá bien descansar.
Pero Leo no quería descansar, quería recuperar su rugido.

Siguió su camino y llegó donde Tambo, el elefante sabio.
—El rugido no está en tu garganta, está en tu corazón —dijo el elefante—. Cuando tengas calma, volverá.

Leo no entendió muy bien, así que siguió caminando. Pasó por el río para ver si el reflejo le decía algo. Allí encontró a Kiko, un pequeño mono.
—No puedo rugir —dijo Leo.
—¡Te enseñaré a cantar! —respondió Kiko.
El mono hizo sonidos graciosos y Leo trató de imitarlos, pero nada funcionaba.

Ese día decidió quedarse solo en una roca alta. Miró el cielo anaranjado, respiró hondo y pensó en todo lo que había vivido: amigos, juegos, carreras, la brisa en su melena.
De pronto, sintió una paz profunda…
—Aaaaaah… —tomó aire— y un rugido enorme salió de él, tan fuerte que los pájaros levantaron vuelo.

Leo sonrió. Entendió que el rugido había vuelto cuando dejó de desesperarse y escuchó su interior.
Regresó a la manada orgulloso: había recuperado su voz y también había aprendido a tener calma.`,
        questions: [
          "¿Qué problema tuvo Leo al despertar?",
          "¿Qué le dijo Gigi la jirafa?",
          "¿Qué consejo le dio Tambo el elefante?",
          "¿Qué intentó enseñarle Kiko?",
          "¿Cuándo volvió su rugido?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  },
  {
    id: "module-3",
    title: "La Ciudad de Colores",
    icon: "🎨",
    color: "from-pink-400 to-rose-400",
    stories: [
      {
        id: "story-3",
        title: "La Ciudad de los Colores Perdidos",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Wv20XYdESF1y4vpEaAB8xI1A1zLkOQ.png", // Updated image URL
        content: `En un pequeño pueblo vivía Emma, una niña a la que le encantaba pintar. Pero un día despertó y descubrió algo sorprendente: todo estaba en blanco y negro. Las casas, los árboles, las flores… incluso su ropa.

Preocupada, fue al taller del señor Pincelón, el pintor más anciano de la ciudad.
—Los colores han desaparecido —dijo él—. Un viento gris los ha robado.

Emma, decidida, tomó su mochila con pinceles y salió en busca del viento gris. Caminó hasta el bosque, donde vio cómo una nube gris absorbía los colores de las mariposas.
—¡Devuélvelos! —gritó Emma.
La nube respondió:
—Los colores se van cuando las personas dejan de valorar lo que tienen.

Emma pensó en el pueblo: la gente había empezado a quejarse por todo. Muchos ya no saludaban, no sonreían, ni ayudaban.
—Si recuperan la alegría, ¿volverán los colores? —preguntó.
—Así será —respondió la nube.

Emma regresó al pueblo y reunió a todos. Les contó lo que había descubierto. Los vecinos comenzaron a cambiar: ayudaron a los ancianos, limpiaron la plaza, compartieron frutas, pintaron murales y los niños jugaron juntos.

Poco a poco, un rayo de rojo apareció en el cielo, luego azul, verde, amarillo… ¡los colores regresaron como una lluvia brillante cubriendo toda la ciudad!

Emma entendió que los colores no solo estaban en pinturas, sino en la forma de vivir.`,
        questions: [
          "¿Qué descubrió Emma al despertar?",
          "¿A quién fue a visitar primero?",
          "¿Qué estaba haciendo la nube gris?",
          "¿Qué había pasado en el pueblo para que se vayan los colores?",
          "¿Qué hicieron los habitantes para recuperarlos?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  },
  {
    id: "module-4",
    title: "El Tren Amigo",
    icon: "🚂",
    color: "from-red-400 to-red-500",
    stories: [
      {
        id: "story-4",
        title: "El Tren que No Quería Parar",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7O0Y6xCuz09yGSYQDuFDLGqdzUH5tx.png",
        content: `En una estación rodeada de montañas funcionaba el tren Trueno, el más rápido del valle. Le encantaba correr por los rieles sin detenerse. Un día el conductor le dijo:
—Trueno, hoy debemos parar en cada pueblo.
Pero Trueno refunfuñó:
—¡No quiero parar, quiero ir rápido!

En el primer pueblo, Trueno se saltó la parada y la gente quedó triste porque no pudo subir.
En el segundo, un anciano esperaba medicinas. Trueno tampoco paró.
En el tercero, unos niños querían visitar a sus abuelos, pero tampoco pudieron.

Al llegar al final del recorrido, el conductor estaba serio:
—Tu velocidad es inútil si no ayudas a quienes te necesitan.

Trueno, avergonzado, escuchó las voces a lo largo del camino:
—¡Mi medicina!
—¡Mis abuelos!
—¡Mi viaje!

Sintió un hueco en su corazón de hierro.
—Lo siento… —dijo.

Al día siguiente decidió cambiar. Llegó puntual a cada estación. Ayudó a las personas, cargó paquetes, saludó niños y esperó a los que caminaban lento.
La gente comenzó a llamarlo el Tren Amigo.

Trueno aprendió que detenerse también es avanzar cuando es para ayudar.`,
        questions: [
          "¿Qué quería hacer Trueno?",
          "¿Qué ocurrió en el primer pueblo?",
          "¿Qué esperaba el anciano en el segundo?",
          "¿Qué le dijo el conductor al final?",
          "¿Qué decidió hacer Trueno al día siguiente?",
          "¿Qué enseñanza deja el cuento?"
        ]
      }
    ]
  },
  {
    id: "module-5",
    title: "El Faro Solitario",
    icon: "🔦",
    color: "from-yellow-400 to-orange-400",
    stories: [
      {
        id: "story-5",
        title: "La Isla del Faro Solitario",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9Y0rCAwt8yBrLFjeKSDZIFYsAf7jZb.png",
        content: `En una isla pequeña vivía Lía, una niña encargada de encender el faro todas las noches junto con su abuelo. La luz guiaba a los barcos para que no chocaran con las rocas.

Una noche el abuelo enfermó.
—Lía —dijo con voz suave—. Debes encender el faro tú sola.
Lía tembló.
—¿Yo? ¿Y si lo hago mal?

El mar estaba agitado y el viento soplaba fuerte. Lía subió los escalones del faro con una linterna en la mano. Cada paso parecía más difícil, pero pensaba en los marineros que dependían de la luz.

Al llegar arriba, intentó encenderlo, pero el mecanismo estaba atascado. Lía respiró hondo, recordó las enseñanzas de su abuelo y giró las piezas con paciencia.
Finalmente, la luz brilló y el faro iluminó toda la costa.

Esa noche varios barcos pasaron seguros gracias a ella.
Cuando bajó, el abuelo sonrió.
—Estoy orgulloso de ti —dijo.
Lía comprendió que el valor no es no tener miedo, sino actuar aunque lo tengas.`,
        questions: [
          "¿Qué hacía Lía con su abuelo todas las noches?",
          "¿Qué problema surgió una noche?",
          "¿Qué sintió Lía al tener que encender el faro sola?",
          "¿Qué dificultad encontró al subir?",
          "¿Cómo logró encender la luz?",
          "¿Qué enseñanza deja la historia?"
        ]
      }
    ]
  },
  {
    id: "module-6",
    title: "Aventuras Mágicas",
    icon: "✨",
    color: "from-purple-400 to-indigo-400",
    stories: [
      {
        id: "story-6",
        title: "Las Aventuras del Reino Encantado",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fW9Dbyeo7IcHw1D5UAWRdkkvEufO1d.png",
        content: `En un reino lejano rodeado de montañas nevadas, existía un lugar mágico donde los animales hablaban y los árboles tenían sentimientos. Allí vivía Sofia, una joven exploradora valiente.

Sofia siempre había escuchado historias sobre el cristal dorado, una gema que se decía había desaparecido hace mil años. Se decía que quien lo encontrara traería paz y armonía a todo el reino.

Un día, Sofia decidió partir en su búsqueda. Empacó su mochila, tomó un mapa antiguo que había encontrado en la biblioteca del castillo, y comenzó su viaje.

Primero atravesó el Bosque de las Voces, donde los árboles le contaban historias olvidadas. Luego cruzó el Río de la Sabiduría, donde conoció a Theo, un búho muy inteligente que sabía todos los secretos del reino.

—¿Quieres ayudarme a encontrar el cristal? —preguntó Sofia.
—Claro —respondió Theo—. He estado esperando por alguien valiente como tú.

Juntos ascendieron la Montaña de los Ecos, donde el viento susurraba pistas antiguas. En la cima, encontraron una cueva brillante. Dentro, sobre un pedestal de piedra blanca, estaba el cristal dorado.

Pero no estaba solo. Un dragón de fuego cuidaba la gema. Sofia no tuvo miedo. En lugar de luchar, se acercó con respeto.

—He venido para devolver la paz al reino —dijo con firmeza.

El dragón, conmovido por su bravura y bondad, sonrió. Había estado esperando a alguien digno de llevar la gema.

Sofia regresó al reino con el cristal. Cuando lo colocó en el Altar de los Reyes, una luz dorada iluminó todo el territorio. Los bosques florecieron, los ríos cantaron, y la gente del reino sonrió de felicidad.

Sofia aprendió que la verdadera magia no está en los objetos, sino en el coraje, la compasión y la determinación de hacer un bien.`,
        questions: [
          "¿Qué buscaba Sofia en el reino mágico?",
          "¿Quién fue el primer amigo que conoció en su viaje?",
          "¿Cuáles fueron los tres lugares que atravesó Sofia?",
          "¿Qué guardaba el cristal dorado?",
          "¿Cómo logró Sofia obtener el cristal?",
          "¿Qué aprendió Sofia al final del viaje?"
        ]
      }
    ]
  }
]

export default function ReadingModules({
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
    if (currentModule && quizScores[currentModule] && quizScores[currentModule] >= 65) {
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
                  onClick={() => {
                    const codigoSalon = localStorage.getItem("codigoSalon");
                    if (codigoSalon) {
                      window.location.href = `/salon/${codigoSalon}`;
                    } else {
                      window.location.href = "/";
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                        {module.id === "module-1" && "Acompaña a Azulina en su viaje mágico a la pradera de las luces"}
                        {module.id === "module-2" && "Descubre cómo Leo recuperó su rugido perdido"}
                        {module.id === "module-3" && "Ayuda a Emma a devolver los colores a la ciudad"}
                        {module.id === "module-4" && "Aprende con Trueno sobre la importancia de ayudar"}
                        {module.id === "module-5" && "Siente el valor de Lía frente al miedo"}
                        {module.id === "module-6" && "Acompaña a Sofia en una aventura mágica épica"}
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
