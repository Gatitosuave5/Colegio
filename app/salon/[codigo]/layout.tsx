"use client";

import { useEffect } from "react";

export default function SalonLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    window.history.pushState({ noBackExitsApp: true }, "", window.location.href);

    const blockBack = (event: PopStateEvent) => {
      if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, "", window.location.href);
        window.location.reload();
      }
    };

    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  return (
    <>{children}</> 
  );
}
