"use client";

import { CursosProvider } from "./context/CursosContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CursosProvider>{children}</CursosProvider>;
}
