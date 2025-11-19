"use client";
import { useEffect } from "react";

export function useBackAsReload() {
  useEffect(() => {
    const handleBackButton = () => window.location.reload();
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, []);
}
