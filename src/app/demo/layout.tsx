"use client";

import "@/theme/theme.css";
import "./globals-override.css";
import { useEffect } from "react";

export default function DemoLayout({
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
