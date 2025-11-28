"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-14 bg-card border-2 border-foreground rounded-lg overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-[2px_2px_0px_0px_var(--foreground)]"
      title={isDark ? "Le Monde (Nuit)" : "Le Soleil (Jour)"}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            rotateY: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center bg-[#fcfbf7]"
        >
          <Sun className="text-[#bf2c23]" size={20} />
          <span className="absolute bottom-1 text-[8px] font-mono text-[#1f4045] font-bold">
            XIX
          </span>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            rotateY: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center bg-[#1f4045]"
        >
          <Moon className="text-[#d4a373]" size={20} />
          <span className="absolute bottom-1 text-[8px] font-mono text-[#fcfbf7] font-bold">
            XVIII
          </span>
        </motion.div>
      </div>

      {/* Border overlay for texture */}
      <div className="absolute inset-0 border-2 border-foreground/10 pointer-events-none rounded-lg"></div>
    </button>
  );
};
