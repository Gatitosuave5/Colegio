"use client";
import { createContext, useContext, useState } from "react";

const initialData: Record<string, any[]> = {
  "1° Grado": [
    {
      id: "matematicas",
      nombre: "Matemáticas",
      icono: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      modulos: 2,
    },
    {
      id: "frances",
      nombre: "Frances",
      icono: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      modulos: 1,
    },
  ],
  "2° Grado": [
    {
      id: "ciencias",
      nombre: "Ciencias",
      icono: "https://cdn-icons-png.flaticon.com/512/2721/2721294.png",
      modulos: 2,
    },
  ],
  "3° Grado": [
    {
      id: "historia",
      nombre: "Historia",
      icono: "https://cdn-icons-png.flaticon.com/512/3515/3515416.png",
      modulos: 3,
    },
  ],
  "4° Grado": [
    {
      id: "ingles",
      nombre: "Inglés",
      icono: "https://cdn-icons-png.flaticon.com/512/3135/3135786.png",
      modulos: 2,
    },
  ],
  "5° Grado": [
    {
      id: "arte",
      nombre: "Arte",
      icono: "https://cdn-icons-png.flaticon.com/512/3132/3132098.png",
      modulos: 1,
    },
  ],
  "6° Grado": [
    {
      id: "geografia",
      nombre: "Geografía",
      icono: "https://cdn-icons-png.flaticon.com/512/2942/2942856.png",
      modulos: 2,
    },
  ],
};

const CursosContext = createContext<any>(null);

export const CursosProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursos, setCursos] = useState(initialData);

  const agregarCurso = (grado: string, nuevoCurso: any) => {
    setCursos((prev: any) => ({
      ...prev,
      [grado]: [...prev[grado], nuevoCurso],
    }));
  };

  return (
    <CursosContext.Provider value={{ cursos, agregarCurso }}>
      {children}
    </CursosContext.Provider>
  );
};

export const useCursos = () => {
  const context = useContext(CursosContext);
  if (!context) {
    throw new Error("useCursos debe usarse dentro de un <CursosProvider>");
  }
  return context;
};
