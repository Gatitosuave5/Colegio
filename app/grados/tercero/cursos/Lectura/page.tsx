"use client";

import ThirdGradeReading from "./ThirdGradeReading";

export default function Page() {
  return <ThirdGradeReading onBack={() => window.history.back()} />;
}
