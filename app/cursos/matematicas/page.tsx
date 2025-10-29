"use client";
import CursoPage from "@/app/components/CursoPage";

export default function MatematicasPage() {
  const curso = {
    id: "matematicas",
    nombre: "Matemáticas",
    descripcion: "Aprende matemáticas de forma divertida y práctica.",
    icono: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    modulos: [
      {
        id: "mod1",
        titulo: "Números del 1 al 10",
        descripcion: "Aprende a contar y reconocer números",
        recursos: [],
      },
      {
        id: "mod2",
        titulo: "Sumas básicas",
        descripcion: "Empieza a sumar con ejercicios interactivos",
        recursos: [
          {
            id: "pdf1",
            titulo: "Guía de sumas",
            tipo: "PDF",
            descripcion: "Material imprimible de apoyo",
            enlace: "https://www.imageneseducativas.com/wp-content/uploads/2021/12/SUMA-Y-CUENTA-CONMIGO.pdf",
          },
        ],
      },
    ],
  };

  return <CursoPage curso={curso} />;
}
