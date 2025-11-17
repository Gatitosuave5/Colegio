'use client';

import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface GameModeSelectorProps {
  onSelectMode: (mode: string) => void;
  onBack: () => void;
}

export default function GameModeSelector({ onSelectMode, onBack }: GameModeSelectorProps) {
  const modes = [
    {
      id: 'puzzle',
      nombre: '🧩 Puzzle Mágico',
      descripcion: 'Completa puzzles de diferentes historias',
      color: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    },
    {
      id: 'adivinanzas',
      nombre: '🤔 Adivinanzas Mágicas',
      descripcion: 'Adivina qué hay en cada historia',
      color: 'bg-gradient-to-br from-purple-400 to-purple-500',
    },
    {
      id: 'memoria',
      nombre: '🧠 Juego de Memoria',
      descripcion: 'Encuentra los pares de la historia',
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
    },
    {
      id: 'ordenamiento',
      nombre: '📚 Ordena la Historia',
      descripcion: 'Pon los eventos en orden correcto',
      color: 'bg-gradient-to-br from-green-400 to-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-yellow-100 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 text-lg"
        >
          ← Volver al Menú Principal
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-700 mb-2">¿Qué quieres jugar?</h1>
          <p className="text-xl text-purple-600">Elige el modo de juego que prefieras</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {modes.map(mode => (
            <Card
              key={mode.id}
              className="cursor-pointer transform hover:scale-105 transition-all shadow-lg border-4 border-white"
            >
              <CardHeader className={`${mode.color} text-white rounded-t-lg`}>
                <div className="text-5xl mb-2">{mode.nombre.split(' ')[0]}</div>
                <CardTitle className="text-2xl">{mode.nombre}</CardTitle>
                <CardDescription className="text-white text-lg">
                  {mode.descripcion}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 text-center">
                <Button
                  onClick={() => onSelectMode(mode.id)}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold text-lg"
                >
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border-4 border-purple-300">
          <CardContent className="pt-6">
            <p className="text-lg text-purple-700 text-center">
              Cada modo tiene 10 temas diferentes con historias mágicas. Elige el que más te guste.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
