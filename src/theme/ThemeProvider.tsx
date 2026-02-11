"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  // Initialize with default theme immediately (before mount)
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to read from localStorage synchronously on initial render
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored === "light" || stored === "dark") {
          return stored;
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
    return defaultTheme;
  });
  const [mounted, setMounted] = useState(false);

  // Apply initial theme immediately
  useEffect(() => {
    applyTheme(theme);
  }, []); // Only run once on mount

  // Initialize theme on mount (sync with localStorage)
  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem("theme") as Theme | null;
    
    // Validate stored theme
    if (stored === "light" || stored === "dark") {
      if (stored !== theme) {
        setThemeState(stored);
        applyTheme(stored);
      }
    } else {
      // Default to light if no stored theme
      if (defaultTheme !== theme) {
        setThemeState(defaultTheme);
        applyTheme(defaultTheme);
      }
    }
    
    setMounted(true);
  }, [defaultTheme, theme]);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        newTheme === "dark" ? "#060B0C" : "#FFFFFF"
      );
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = newTheme === "dark" ? "#060B0C" : "#FFFFFF";
      document.head.appendChild(meta);
    }
  }, []);

  // Set theme with persistence
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    [applyTheme]
  );

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  // Always provide context, even before mount (prevents hook errors)
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

