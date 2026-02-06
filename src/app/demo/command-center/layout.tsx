"use client";

import "@/theme/theme.css";
import { useEffect } from "react";

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Force white background
    document.body.style.setProperty("background-color", "#ffffff", "important");
    document.body.style.setProperty("color", "#1a1a1a", "important");
    document.documentElement.style.setProperty("background-color", "#ffffff", "important");
    document.body.classList.remove("bg-black", "text-white");
  }, []);

  return <>{children}</>;
}
