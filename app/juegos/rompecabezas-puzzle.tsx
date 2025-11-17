'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface Pieza {
  id: number;
  x: number;
  y: number;
  correctaX: number;
  correctaY: number;
  ancho: number;
  alto: number;
  imagen: string;
}

export default function RompecabezasPuzzle() {
  const [piezas, setPiezas] = useState<Pieza[]>([
    { id: 1, x: 20, y: 10, correctaX: 0, correctaY: 0, ancho: 60, alto: 60, imagen: '🌅' },
    { id: 2, x: 150, y: 30, correctaX: 60, correctaY: 0, ancho: 60, alto: 60, imagen: '🦋' },
    { id: 3, x: 50, y: 150, correctaX: 0, correctaY: 60, ancho: 60, alto: 60, imagen: '🌸' },
    { id: 4, x: 180, y: 120, correctaX: 60, correctaY: 60, ancho: 60, alto: 60, imagen: '✨' },
  ]);

  const [piezaArrastrada, setPiezaArrastrada] = useState<number | null>(null);
  const [ganado, setGanado] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const distanciaCorrecta = 15;

  const manejarMouseDown = (id: number) => {
    setPiezaArrastrada(id);
  };

  const manejarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!piezaArrastrada || !contenedorRef.current) return;

    const rect = contenedorRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPiezas(piezas.map(pieza =>
      pieza.id === piezaArrastrada
        ? { ...pieza, x: Math.max(0, Math.min(x - 30, rect.width - pieza.ancho)), y: Math.max(0, Math.min(y - 30, rect.height - pieza.alto)) }
        : pieza
    ));
  };

  const manejarMouseUp = () => {
    if (!piezaArrastrada) return;

    setPiezas(piezas.map(pieza => {
      if (pieza.id !== piezaArrastrada) return pieza;

      const diferenciax = Math.abs(pieza.x - pieza.correctaX);
      const diferenciay = Math.abs(pieza.y - pieza.correctaY);

      if (diferenciax < distanciaCorrecta && diferenciay < distanciaCorrecta) {
        return { ...pieza, x: pieza.correctaX, y: pieza.correctaY };
      }
      return pieza;
    }));

    setPiezaArrastrada(null);

    // Verificar si todas las piezas están en su lugar
    setTimeout(() => {
      const todasCorrectas = piezas.every(
        p => Math.abs(p.x - p.correctaX) < distanciaCorrecta && Math.abs(p.y - p.correctaY) < distanciaCorrecta
      );
      if (todasCorrectas) {
        setGanado(true);
      }
    }, 50);
  };

  const reiniciar = () => {
    setPiezas([
      { id: 1, x: 20, y: 10, correctaX: 0, correctaY: 0, ancho: 60, alto: 60, imagen: '🌅' },
      { id: 2, x: 150, y: 30, correctaX: 60, correctaY: 0, ancho: 60, alto: 60, imagen: '🦋' },
      { id: 3, x: 50, y: 150, correctaX: 0, correctaY: 60, ancho: 60, alto: 60, imagen: '🌸' },
      { id: 4, x: 180, y: 120, correctaX: 60, correctaY: 60, ancho: 60, alto: 60, imagen: '✨' },
    ]);
    setGanado(false);
  };

  return (
    <Card className="w-full border-4 border-blue-300 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center">🧩 La Mariposa Azul - Puzzle Mágico</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <p className="text-lg mb-6 text-center text-blue-700 font-semibold">
          Arrastra las piezas para armar la pradera mágica de la mariposa
        </p>

        {/* Marco del puzzle */}
        <div
          ref={contenedorRef}
          onMouseMove={manejarMouseMove}
          onMouseUp={manejarMouseUp}
          onMouseLeave={manejarMouseUp}
          className="relative w-full bg-gradient-to-b from-cyan-200 via-cyan-100 to-lime-200 rounded-lg border-4 border-dashed border-blue-400 cursor-grab active:cursor-grabbing mb-6"
          style={{ width: '100%', height: '300px', userSelect: 'none' }}
        >
          {/* Fondo decorativo */}
          <div className="absolute inset-0 text-6xl opacity-20 overflow-hidden rounded-lg pointer-events-none">
            <div className="text-center pt-20">🌼 🌼 🌼</div>
          </div>

          {/* Piezas arrastrables */}
          {piezas.map(pieza => (
            <div
              key={pieza.id}
              onMouseDown={() => manejarMouseDown(pieza.id)}
              className={`absolute transition-shadow cursor-grab active:cursor-grabbing rounded-lg border-3 flex items-center justify-center font-bold text-5xl ${
                piezaArrastrada === pieza.id
                  ? 'border-yellow-400 shadow-lg z-50 ring-4 ring-yellow-300'
                  : 'border-white shadow-md hover:shadow-lg'
              }`}
              style={{
                left: `${pieza.x}px`,
                top: `${pieza.y}px`,
                width: `${pieza.ancho}px`,
                height: `${pieza.alto}px`,
                backgroundColor:
                  Math.abs(pieza.x - pieza.correctaX) < distanciaCorrecta &&
                  Math.abs(pieza.y - pieza.correctaY) < distanciaCorrecta
                    ? '#86EFAC'
                    : '#FBBF24',
              }}
            >
              {pieza.imagen}
            </div>
          ))}

          {/* Mensaje de victoria */}
          {ganado && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
              <div className="bg-white p-8 rounded-xl text-center shadow-2xl">
                <div className="text-6xl mb-4">🎉✨</div>
                <p className="text-3xl font-bold text-green-600">¡GANASTE!</p>
                <p className="text-lg text-gray-600 mt-2">¡Armastelapradera mágica!</p>
              </div>
            </div>
          )}
        </div>

        {/* Botón reiniciar */}
        <div className="text-center">
          <Button
            onClick={reiniciar}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg"
          >
            🔄 Reintentar
          </Button>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Instrucción:</strong> Arrastra cada pieza a su lugar correcto en la pradera. Las piezas se pegaran automáticamente cuando estén en el lugar correcto.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
