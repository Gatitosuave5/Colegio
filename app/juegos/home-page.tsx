'use client';

import { Button } from './button';
import { Card, CardContent } from './card';

interface HomePageProps {
  onPlay: () => void;
}

export default function HomePage({ onPlay }: HomePageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-200 via-yellow-100 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-7xl mb-4">🎮✨</h1>
          <h1 className="text-6xl font-bold text-purple-700 mb-4">¡Bienvenido!</h1>
          <p className="text-2xl text-purple-600 mb-8">
            Aprende jugando con historias mágicas
          </p>
        </div>

        {/* Main CTA */}
        <Button
          onClick={onPlay}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-2xl px-12 py-8 rounded-2xl shadow-xl mb-12 transform hover:scale-105 transition-all"
        >
          ¡Empezar a Jugar!
        </Button>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-3xl">
          {[
            { icon: '🧩', text: 'Puzzles' },
            { icon: '🤔', text: 'Adivinanzas' },
            { icon: '🧠', text: 'Memoria' },
            { icon: '📚', text: 'Historias' },
          ].map((feature, idx) => (
            <Card key={idx} className="border-4 border-white bg-white/90 transform hover:scale-105 transition-all">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl mb-2">{feature.icon}</p>
                <p className="font-bold text-purple-700">{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="bg-white border-4 border-blue-400 max-w-2xl w-full">
          <CardContent className="pt-6">
            <p className="text-lg text-blue-700 leading-relaxed">
              Explora 10 historias mágicas diferentes en cada modo de juego. 
              Resuelve puzzles, adivina preguntas, juega memoria y ordena los eventos. 
              ¡Diviértete mientras aprendes! 🌟
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
