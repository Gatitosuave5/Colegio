'use client';

import { useState, useEffect } from 'react';
import HomePage from './home-page';
import GameModeSelector from './game-mode-selector';
import ThemeSelector from './theme-selector';
import JigsawPuzzleMulti from './jigsaw-puzzle-multi';
import JuegoAdivinanzas from './adivinanzas';
import JuegoMemoria from './memoria';
import JuegoOrdenamiento from './ordenamiento';
import { ArrowLeft } from 'lucide-react';

type Screen = 'home' | 'modeSelect' | 'themeSelect' | 'game';

export default function Page({
  salon_codigo,
  nombreAlumno,
  onBack,
}: {
  salon_codigo: string;
  nombreAlumno: string;
  onBack: () => void;
}) {

  const [screen, setScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<number>(0);

  // 🔙 Intercepta el botón atrás del navegador
  useEffect(() => {
    // Inserta un estado inicial para bloquear el primer "back"
    history.pushState({ page: "game-root" }, "", window.location.href);
  
    const handlePop = () => {
      if (screen === "home") {
        onBack(); // salir al salón
      } else {
        setScreen("home"); // volver dentro del juego sin recargar
      }
  
      // Reinsertar el estado para bloquear siguientes atrás
      history.pushState({ page: "game-root" }, "", window.location.href);
    };
  
    window.addEventListener("popstate", handlePop);
  
    return () => window.removeEventListener("popstate", handlePop);
  }, [screen]);
  

  const handlePlayClick = () => setScreen('modeSelect');

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    setScreen('themeSelect');
  };

  const handleThemeSelect = (themeId: number) => {
    setSelectedTheme(themeId);
    setScreen('game');
  };

  const handleBackToModes = () => {
    setScreen('modeSelect');
    setSelectedTheme(0);
  };

  const handleBackToHome = () => {
    setScreen('home');
    setSelectedMode('');
    setSelectedTheme(0);
  };

  // UI rendering 👇
  if (screen === 'home') {
    return (
      <main className="min-h-screen bg-white relative">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>

        <HomePage onPlay={handlePlayClick} />
      </main>
    );
  }

  if (screen === 'modeSelect') {
    return (
      <GameModeSelector 
        onSelectMode={handleModeSelect}
        onBack={handleBackToHome}
      />
    );
  }

  if (screen === 'themeSelect') {
    return (
      <ThemeSelector
        gameMode={selectedMode}
        onSelectTheme={handleThemeSelect}
        onBack={handleBackToModes}
      />
    );
  }
}