'use client';

import { useState } from 'react';
import HomePage from './home-page';
import GameModeSelector from './game-mode-selector';
import ThemeSelector from './theme-selector';
import JigsawPuzzleMulti from './jigsaw-puzzle-multi';
import JuegoAdivinanzas from './adivinanzas';
import JuegoMemoria from './memoria';
import JuegoOrdenamiento from './ordenamiento';

type Screen = 'home' | 'modeSelect' | 'themeSelect' | 'game';

export default function Page() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<number>(0);

  const handlePlayClick = () => {
    setScreen('modeSelect');
  };

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

  // Render based on current screen
  if (screen === 'home') {
    return <HomePage onPlay={handlePlayClick} />;
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

  // Game screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBackToModes}
          className="mb-6 px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold text-lg"
        >
          ← Volver a Seleccionar
        </button>

        {selectedMode === 'puzzle' && <JigsawPuzzleMulti themeId={selectedTheme} />}
        {selectedMode === 'adivinanzas' && <JuegoAdivinanzas themeId={selectedTheme} />}
        {selectedMode === 'memoria' && <JuegoMemoria themeId={selectedTheme} />}
        {selectedMode === 'ordenamiento' && <JuegoOrdenamiento themeId={selectedTheme} />}
      </div>
    </div>
  );
}
