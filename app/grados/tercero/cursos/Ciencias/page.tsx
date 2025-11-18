"use client";

import ScienceModules from "./science-modules";

export default function Page() {
  return (
    <ScienceModules
      onBack={() => {
        console.log("volver atrás");
      }}
    />
  );
}
