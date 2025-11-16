"use client";

import Lottie from "lottie-react";
import animationData from "@/public/animaciones/study online.json";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div className="w-56 h-56">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}