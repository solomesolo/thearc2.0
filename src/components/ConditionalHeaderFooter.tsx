"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ConditionalHeaderFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDemoRoute = pathname?.startsWith("/demo");
  
  // Override body background for all demo routes
  useEffect(() => {
    if (isDemoRoute) {
      // Force white background with !important
      document.body.style.setProperty("background-color", "#ffffff", "important");
      document.body.style.setProperty("color", "#1a1a1a", "important");
      document.documentElement.style.setProperty("background-color", "#ffffff", "important");
      document.body.classList.remove("bg-black", "text-white");
      
      // Add override style tag
      const styleId = "demo-route-override";
      let styleEl = document.getElementById(styleId);
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        styleEl.textContent = `
          body, html {
            background-color: #ffffff !important;
            color: #1a1a1a !important;
          }
          body.bg-black {
            background-color: #ffffff !important;
            color: #1a1a1a !important;
          }
        `;
        document.head.appendChild(styleEl);
      }
    } else {
      // Restore black for other routes
      const styleToRemove = document.getElementById("demo-route-override");
      if (styleToRemove) {
        styleToRemove.remove();
      }
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("color");
      document.documentElement.style.removeProperty("background-color");
      document.body.classList.remove("bg-white");
      document.body.classList.add("bg-black", "text-white");
    }
  }, [isDemoRoute]);
  
  // Hide header and footer for all demo routes
  if (isDemoRoute) {
    return null;
  }
  
  // Render Header and Footer for non-demo routes
  return <>{children}</>;
}

