"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  const links = [
    { name: "ACCUEIL", href: "#" },
    { name: "MANIFESTE", href: "#about" },
    { name: "ATELIER", href: "#workshop" },
    { name: "PROJETS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-primary hover:bg-primary/10 rounded transition-colors z-50 relative"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-background/65 backdrop-blur-xl z-100 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 p-2 text-primary hover:bg-primary/10 rounded transition-colors z-100"
              aria-label="Fermer le menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col bg-background/65 backdrop-blur-xl w-full text-center z-10">
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  onClick={toggleMenu}
                  className="block w-full font-serif text-4xl text-foreground hover:text-primary hover:bg-foreground/5 transition-all py-6 border-b border-foreground/5 last:border-0"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              variants={itemVariants}
              className="absolute bottom-10 text-xs font-mono text-foreground/50"
            >
              © {new Date().getFullYear()} JULES DUPUIS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
