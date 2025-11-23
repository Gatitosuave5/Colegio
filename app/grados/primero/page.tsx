"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { ChevronRight, BookOpen } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import LiteratureModule from "@/app/grados/primero/cursos/Lectura/literature-module";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSalir = () => {
    router.push("/"); 
  };
  const subjects = [
    {
      id: "math",
      title: "Matemática",
      description: "¡Aprende números y operaciones!",
      icon: "📐",
      color: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: "language",
      title: "Literatura",
      description: "¡Lee y escribe historias!",
      icon: "📚",
      color: "bg-pink-500",
      textColor: "text-white",
    },
    {
      id: "art",
      title: "Arte",
      description: "¡Crea y dibuja!",
      icon: "🎨",
      color: "bg-purple-500",
      textColor: "text-white",
    },
    {
      id: "music",
      title: "Música",
      description: "¡Descubre nuevos sonidos!",
      icon: "🎵",
      color: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      id: "science",
      title: "Ciencias",
      description: "¡Explora el mundo!",
      icon: "🔬",
      color: "bg-green-500",
      textColor: "text-white",
    },
    {
      id: "games",
      title: "Juegos",
      description: "¡Diviértete aprendiendo!",
      icon: "🎮",
      color: "bg-red-500",
      textColor: "text-white",
    },
  ]

  if (selectedSubject === "language") {
    return <LiteratureModule onBack={() => setSelectedSubject(null)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <button
        onClick={handleSalir}
        className="absolute top-6 right-6 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Salir
      </button>
      {/* Progress Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white border-0 shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">Nivel 1</h2>
              <p className="text-gray-600">0 / 100 puntos para el siguiente nivel</p>
            </div>
            <div className="text-4xl">🌟</div>
          </div>
          <Progress value={0} className="h-3 mb-6" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
                  num === 1
                    ? "bg-blue-600 text-white shadow-lg scale-110"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">¿Qué quieres aprender hoy?</h2>
          <p className="text-xl text-gray-600">Elige una materia y comienza tu aventura educativa</p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className="group text-left transition-all duration-300 hover:scale-105"
            >
              <Card
                className={`${subject.color} ${subject.textColor} border-0 shadow-lg hover:shadow-2xl transition-all h-full p-8 rounded-3xl cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-5xl">{subject.icon}</div>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{subject.title}</h3>
                <p className="text-sm opacity-90 mb-6">{subject.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Explorar <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      
    </main>
  )
}
