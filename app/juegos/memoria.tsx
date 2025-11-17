'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { THEMES } from './games-data';

interface CartaMemoria {
  id: number;
  valor: string;
  revelada: boolean;
  encontrada: boolean;
}

const MEMORY_PAIRS_BY_THEME: Record<number, { emoji: string; nombre: string }[]> = {
  1: [
    { emoji: '🦋', nombre: 'Mariposa' },
    { emoji: '✨', nombre: 'Luz' },
    { emoji: '🌸', nombre: 'Flores' },
    { emoji: '☀️', nombre: 'Sol' },
    { emoji: '🌼', nombre: 'Girasol' },
    { emoji: '🌿', nombre: 'Hojas' },
  ],
  2: [
    { emoji: '🦁', nombre: 'León' },
    { emoji: '🌾', nombre: 'Pasto' },
    { emoji: '☀️', nombre: 'Sol' },
    { emoji: '🦅', nombre: 'Águila' },
    { emoji: '🐘', nombre: 'Elefante' },
    { emoji: '🦒', nombre: 'Jirafa' },
  ],
  3: [
    { emoji: '🎨', nombre: 'Pintura' },
    { emoji: '🏘️', nombre: 'Casas' },
    { emoji: '🌈', nombre: 'Arcoíris' },
    { emoji: '💎', nombre: 'Gemas' },
    { emoji: '⭐', nombre: 'Estrella' },
    { emoji: '🎭', nombre: 'Máscaras' },
  ],
  4: [
    { emoji: '🚂', nombre: 'Tren' },
    { emoji: '🛤️', nombre: 'Vías' },
    { emoji: '⛰️', nombre: 'Montaña' },
    { emoji: '🌲', nombre: 'Árbol' },
    { emoji: '🌉', nombre: 'Puente' },
    { emoji: '🏞️', nombre: 'Paisaje' },
  ],
  5: [
    { emoji: '🗼', nombre: 'Faro' },
    { emoji: '🏝️', nombre: 'Isla' },
    { emoji: '🌊', nombre: 'Olas' },
    { emoji: '⛵', nombre: 'Barco' },
    { emoji: '🦑', nombre: 'Pulpo' },
    { emoji: '🐚', nombre: 'Concha' },
  ],
  6: [
    { emoji: '🏰', nombre: 'Castillo' },
    { emoji: '🐉', nombre: 'Dragón' },
    { emoji: '👑', nombre: 'Corona' },
    { emoji: '⚔️', nombre: 'Espada' },
    { emoji: '🦅', nombre: 'Águila' },
    { emoji: '✨', nombre: 'Magia' },
  ],
  7: [
    { emoji: '🌳', nombre: 'Árbol' },
    { emoji: '✨', nombre: 'Deseo' },
    { emoji: '💫', nombre: 'Brillo' },
    { emoji: '🕯️', nombre: 'Vela' },
    { emoji: '🎁', nombre: 'Regalo' },
    { emoji: '🍀', nombre: 'Trébol' },
  ],
  8: [
    { emoji: '💎', nombre: 'Cristal' },
    { emoji: '⛏️', nombre: 'Piqueta' },
    { emoji: '💠', nombre: 'Gema' },
    { emoji: '✨', nombre: 'Brillo' },
    { emoji: '🌟', nombre: 'Estrella' },
    { emoji: '🔮', nombre: 'Bola de Cristal' },
  ],
  9: [
    { emoji: '🐉', nombre: 'Dragón' },
    { emoji: '🌈', nombre: 'Arcoíris' },
    { emoji: '☁️', nombre: 'Nube' },
    { emoji: '⛰️', nombre: 'Montaña' },
    { emoji: '🔥', nombre: 'Fuego' },
    { emoji: '💨', nombre: 'Aire' },
  ],
  10: [
    { emoji: '🌲', nombre: 'Árbol' },
    { emoji: '🦌', nombre: 'Ciervo' },
    { emoji: '🦋', nombre: 'Mariposa' },
    { emoji: '🍄', nombre: 'Seta' },
    { emoji: '🌿', nombre: 'Plantas' },
    { emoji: '✨', nombre: 'Magia' },
  ],
};

interface MemoriaProps {
  themeId?: number;
}

export default function JuegoMemoria({ themeId = 1 }: MemoriaProps) {
  const theme = THEMES[themeId - 1];
  const pares = MEMORY_PAIRS_BY_THEME[themeId];

  const cartasIniciales: CartaMemoria[] = [
    ...pares.map((p, i) => ({ id: i, valor: p.emoji, revelada: false, encontrada: false })),
    ...pares.map((p, i) => ({ id: i + pares.length, valor: p.emoji, revelada: false, encontrada: false })),
  ].sort(() => Math.random() - 0.5);

  const [cartas, setCartas] = useState(cartasIniciales);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [movimientos, setMovimientos] = useState(0);
  const [ganado, setGanado] = useState(false);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [idx1, idx2] = seleccionadas;
      
      if (cartas[idx1].valor === cartas[idx2].valor) {
        const nuevasCartas = [...cartas];
        nuevasCartas[idx1].encontrada = true;
        nuevasCartas[idx2].encontrada = true;
        setCartas(nuevasCartas);
        
        if (nuevasCartas.every(c => c.encontrada)) {
          setGanado(true);
        }
      } else {
        setTimeout(() => {
          const nuevasCartas = [...cartas];
          nuevasCartas[idx1].revelada = false;
          nuevasCartas[idx2].revelada = false;
          setCartas(nuevasCartas);
        }, 1000);
      }
      
      setMovimientos(movimientos + 1);
      setSeleccionadas([]);
    }
  }, [seleccionadas, cartas, movimientos]);

  const manejarClick = (idx: number) => {
    if (!cartas[idx].revelada && !cartas[idx].encontrada && seleccionadas.length < 2) {
      const nuevasCartas = [...cartas];
      nuevasCartas[idx].revelada = true;
      setCartas(nuevasCartas);
      setSeleccionadas([...seleccionadas, idx]);
    }
  };

  const reiniciar = () => {
    const nuevasCartas = cartasIniciales.map(c => ({ ...c, revelada: false, encontrada: false }))
      .sort(() => Math.random() - 0.5);
    setCartas(nuevasCartas);
    setSeleccionadas([]);
    setMovimientos(0);
    setGanado(false);
  };

  return (
    <Card className="w-full border-4 border-blue-400">
      <CardHeader className={`bg-gradient-to-r ${theme.color} text-white rounded-t-lg`}>
        <CardTitle className="text-2xl">Juego de Memoria - {theme.title}</CardTitle>
        <p className="text-sm mt-2">Movimientos: {movimientos}</p>
      </CardHeader>
      <CardContent className="pt-8">
        <p className="text-lg text-center mb-6 text-blue-700 font-semibold">
          Encuentra todos los pares de emojis
        </p>

        <div className="grid grid-cols-4 gap-3 mb-8 md:grid-cols-6">
          {cartas.map((carta, idx) => (
            <button
              key={idx}
              onClick={() => manejarClick(idx)}
              disabled={carta.revelada || carta.encontrada || ganado}
              className={`h-20 rounded-lg font-bold text-2xl transition-all transform ${
                carta.revelada || carta.encontrada
                  ? 'bg-blue-200 text-2xl'
                  : 'bg-blue-400 hover:bg-blue-500 hover:scale-105 active:scale-95'
              } ${carta.encontrada ? 'opacity-50' : ''}`}
            >
              {carta.revelada || carta.encontrada ? carta.valor : '?'}
            </button>
          ))}
        </div>

        {ganado && (
          <div className="p-4 bg-green-100 rounded-lg text-center mb-6 border-2 border-green-400">
            <p className="text-2xl font-bold text-green-700">¡Lo lograste!</p>
            <p className="text-lg text-green-600">En {movimientos} movimientos</p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={reiniciar}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold text-lg px-6"
          >
            {ganado ? 'Jugar de Nuevo' : 'Reintentar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
