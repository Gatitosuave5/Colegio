"use client";

import WritingModules from "./writing-modules";

export default function Page() {
  return (
    <WritingModules
      onBack={() => {
        console.log("volver atrás");
      }}
    />
  );
}
