"use client";
import CursoPage from "@/app/grados/primero/cursos/Lectura/CursoPage";

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
      {
        id: "mod3",
        titulo: "Restas básicas", 
        descripcion: "Aprende a restar con juegos y actividades",
        recursos: [
          {
            id: "pdf1restas",
            titulo: "Ejercicios de restas sin llevada", 
            tipo: "PDF",   
            descripcion: "Material de apoyo para practicar restas.",
            enlace: "https://www.orientacionandujar.es/wp-content/uploads/2024/09/Cuadernillo-restas-1-cifra-sin-llevada.pdf",
          },
          {
            id: "pdf2restas",
            titulo: "Ejercicios de restas con llevada",
            tipo: "PDF",
            descripcion: "Material de apoyo para practicar restas..",
            enlace: "https://drive.google.com/file/d/15yNkJbbJqyH3qB7I63qNkriqATdX2czx/view?usp=sharing",
          },
        ],
      },
      {
        id: "mod4",
        titulo: "Comparación Numérica",
        descripcion: "Aprende a comparar números",
        recursos: [
          { 
            id: "pdf1comparacion",  
            titulo: "Ejercicios de comparación numérica",
            tipo: "PDF",
            descripcion: "Material de apoyo para practicar comparación numérica.",
            enlace: "https://drive.google.com/file/d/1Q0tOij9W0XgRWRwA4wrQV_tVDWO7zZLr/view",
          },       
         ]
          
      }
    ],
  };

  return <CursoPage curso={curso} />;
}
