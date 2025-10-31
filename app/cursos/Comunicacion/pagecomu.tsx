"use client";
import CursoPage from "@/app/components/CursoPage";

export default function ComunicacionPage() {

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



    ]
    }









    return <CursoPage curso={curso} />;
}

    
