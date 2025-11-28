"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("auto");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      // Dark mode between 20:00 (8 PM) and 07:00 (7 AM)
      return hour >= 20 || hour < 7;
    };

    const applyTheme = () => {
      let shouldBeDark = false;

      if (theme === "auto") {
        shouldBeDark = checkTime();
      } else {
        shouldBeDark = theme === "dark";
      }

      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();

    // Re-check time every minute if in auto mode
    let interval: NodeJS.Timeout;
    if (theme === "auto") {
      interval = setInterval(applyTheme, 60000);
    }

    return () => clearInterval(interval);
  }, [theme, mounted]);

  const toggleTheme = () => {
    // If auto, we switch to the opposite of current state and set manual
    // If manual, we just toggle
    let newTheme: Theme;

    if (theme === "auto") {
      newTheme = isDark ? "light" : "dark";
    } else {
      newTheme = theme === "light" ? "dark" : "light";
    }

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
