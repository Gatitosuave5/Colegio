"use client";

import { useEffect } from "react";

export default function SalonLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // Crear un estado en el historial
    window.history.pushState({ noBackExitsApp: true }, "", window.location.href);

    const blockBack = (event: PopStateEvent) => {
      // Si intenta retroceder, en vez de ir atrás, recarga la página
      if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, "", window.location.href);
        window.location.reload();   // 🔥 RELOGUEA (tipo F5 real)
      }
    };

    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
