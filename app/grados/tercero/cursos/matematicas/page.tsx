"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { topicsData } from "./topicsData-grade3";
import TopicReader from "./topic-reader";
import TopicQuiz from "./topic-quiz";
import TopicGames from "./topic-games";

type View = "list" | "reading" | "quiz" | "games";

interface ContenidoActivo {
  storyId: string;
}

const mathTopicMap = {
  "multiplicacion-tablas-1-10": "multiplicacion",
  "division-basica": "division-basica",
  "perimetro-de-figuras": "perimetro",
  "partes-de-la-division": "partes-division",
  "partes-de-la-resta": "partes-resta",
  "problemas-multiplicacion-division": "problemas-multdiv",
  "figuras-geometricas": "figuras-geometricas",
  "medicion-de-longitudes": "medicion-longitud",
  "lectura-comparacion-numeros-10000": "lectura-numeros",
  "suma-resta-con-llevadas": "suma-resta-llevadas",
} as const;

export default function Grade3MathPage({
  contenidosActivos,
  onBack,
}: {
  contenidosActivos: ContenidoActivo[];
  onBack: () => void;
}) {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);

  const topics = Object.values(topicsData).filter(topic =>
    contenidosActivos.some(c => mathTopicMap[c.storyId as keyof typeof mathTopicMap] === topic.id)
  );

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentView("reading");
  };

  useEffect(() => {
    history.pushState({ module: true }, "");

    const handleBack = () => {
      onBack();
      history.pushState({ module: true }, "");
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const handleBack = () => {
    if (currentView === "reading") {
      setSelectedTopic(null);
      setCurrentView("list");
    } else if (currentView === "quiz" || currentView === "games") {
      setCurrentView("reading");
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/high/school-picture-background-1080-x-1920-lzswkjagfr2cf5ei.webp')",
      }}
    >
      <header className="bg-white/80 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

          {/* 🔥 Botón volver hacia afuera del módulo */}
          {currentView === "list" && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}

          <h1 className="text-2xl font-bold text-gray-900">Matemática</h1>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8 bg-white/70 backdrop-blur-md rounded-xl mt-6">

        {currentView === "list" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold mb-4 text-black">
                Temas Disponibles - 3er Grado
              </h2>
            </div>

            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="w-full group hover:scale-[1.02] transition"
              >
                <div
                  className="rounded-2xl h-40 shadow-lg relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${topic.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>

                  <div className="relative z-10 p-6 text-white flex items-end h-full">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {topic.icon} {topic.title}
                      </h3>
                      <p className="opacity-90 text-sm">
                        Haz clic para ver el contenido
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentView === "reading" && selectedTopic && (
          <TopicReader
            topic={selectedTopic}
            onQuizStart={() => setCurrentView("quiz")}
            onGamesStart={() => setCurrentView("games")}
            onBack={handleBack}
          />
        )}

        {currentView === "quiz" && selectedTopic && (
          <TopicQuiz topic={selectedTopic} onBack={handleBack} />
        )}

        {currentView === "games" && selectedTopic && (
          <TopicGames topic={selectedTopic} onBack={handleBack} />
        )}
      </section>
    </main>
  );
}
