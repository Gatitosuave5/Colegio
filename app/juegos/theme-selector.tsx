'use client';

import { THEMES } from './games-data';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface ThemeSelectorProps {
  onSelectTheme: (themeId: number) => void;
  onBack: () => void;
  gameMode: string;
}

export default function ThemeSelector({ onSelectTheme, onBack, gameMode }: ThemeSelectorProps) {
  const modeNames = {
    puzzle: '🧩 Puzzle Mágico',
    adivinanzas: '🤔 Adivinanzas Mágicas',
    memoria: '🧠 Juego de Memoria',
    ordenamiento: '📚 Ordena la Historia',
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-lg p-8 min-h-screen">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-6 text-lg"
      >
        ← Volver
      </Button>

      <h1 className="text-4xl font-bold text-center mb-2 text-blue-700">
        {modeNames[gameMode as keyof typeof modeNames]}
      </h1>
      <p className="text-center text-gray-600 mb-12">Elige un tema para comenzar</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className="transform hover:scale-105 active:scale-95 transition-all"
          >
            <Card className="h-full border-4 hover:shadow-lg cursor-pointer">
              <CardHeader className={`bg-gradient-to-r ${theme.color} text-white rounded-t-lg`}>
                <div className="text-5xl mb-2">{theme.emoji}</div>
                <CardTitle className="text-lg">{theme.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{theme.id}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
