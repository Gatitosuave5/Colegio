'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface Pieza {
  id: number;
  texto: string;
  orden: number;
}

export default function JuegoRompecabezas() {
  const [piezasRevueltas, setPiezasRevueltas] = useState<Pieza[]>([
    { id: 1, texto: '1️⃣ La mariposa azul vio una pradera llena de luces', orden: 1 },
    { id: 2, texto: '2️⃣ Todas las noches brillaban como estrellas', orden: 2 },
    { id: 3, texto: '3️⃣ Ella voló entre las flores danzando', orden: 3 },
    { id: 4, texto: '4️⃣ Y descubrió el secreto de la magia', orden: 4 },
  ].sort(() => Math.random() - 0.5));

  const [ordenActual, setOrdenActual] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [ganado, setGanado] = useState(false);

  const manejarClick = (pieza: Pieza) => {
    const nuevoOrden = [...ordenActual, pieza.id];
    setOrdenActual(nuevoOrden);
    setMensaje('');

    if (nuevoOrden.length === piezasRevueltas.length) {
      const esCorrect = nuevoOrden.every((id, idx) => 
        piezasRevueltas.find(p => p.id === id)?.orden === idx + 1
      );
      
      if (esCorrect) {
        setGanado(true);
        setMensaje('¡🎉 ¡EXCELENTE! ¡Lo lograste!');
      } else {
        setMensaje('❌ Intenta de nuevo');
        setOrdenActual([]);
      }
    }
  };

  const reiniciar = () => {
    setPiezasRevueltas([...piezasRevueltas].sort(() => Math.random() - 0.5));
    setOrdenActual([]);
    setMensaje('');
    setGanado(false);
  };

  return (
    <Card className="w-full border-4 border-pink-400">
      <CardHeader className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">🧩 Arma la Historia</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <p className="text-lg mb-6 text-center text-purple-700 font-semibold">
          Ordena las piezas para contar la historia correcta
        </p>

        {/* Piezas disponibles */}
        <div className="mb-6 p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
          <p className="text-sm font-bold text-pink-700 mb-3">📋 Piezas disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {piezasRevueltas
              .filter(p => !ordenActual.includes(p.id))
              .map(pieza => (
                <Button
                  key={pieza.id}
                  onClick={() => manejarClick(pieza)}
                  className="bg-pink-300 hover:bg-pink-400 text-black font-bold text-sm"
                >
                  Pieza {pieza.id}
                </Button>
              ))}
          </div>
        </div>

        {/* Orden actual */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <p className="text-sm font-bold text-yellow-700 mb-3">✍️ Tu historia:</p>
          <div className="space-y-2">
            {ordenActual.length === 0 ? (
              <p className="text-gray-400 italic">Haz clic en las piezas para ordenarlas...</p>
            ) : (
              ordenActual.map((id, idx) => {
                const pieza = piezasRevueltas.find(p => p.id === id);
                return (
                  <div key={idx} className="p-3 bg-white rounded border-2 border-yellow-300">
                    {pieza?.texto}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className={`p-4 rounded-lg text-center text-lg font-bold mb-6 ${
            ganado 
              ? 'bg-green-100 text-green-700 border-2 border-green-400' 
              : 'bg-red-100 text-red-700 border-2 border-red-400'
          }`}>
            {mensaje}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reiniciar}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg px-6"
          >
            🔄 Reintentar
          </Button>
          {ganado && (
            <Button
              onClick={reiniciar}
              className="bg-green-400 hover:bg-green-500 text-white font-bold text-lg px-6"
            >
              ✨ Siguiente
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
