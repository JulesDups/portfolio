"use client";
import { MobileMenu } from "@/components/MobileMenu";
import { PixelSeparator } from "@/components/PixelSeparator";
import { Pricing } from "@/components/Pricing";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ClipboardCopy,
  Clock,
  Code2,
  Github,
  Hammer,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  PenTool,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- DATA & CONFIGURATION ---

const DATA = {
  profile: {
    name: "Jules Dupuis",
    role: "Architecte Numérique Indépendant",
    subRole: "Freelance | Développeur Web",
    location: "Anglet, Pays Basque",
    stats: [
      { label: "Années Angular", value: "04" },
      { label: "Années Java", value: "03" },
      { label: "Mode", value: "100% Freelance" },
    ],
  },
  stack: [
    {
      category: "Gros Œuvre (Backend)",
      icon: <Server size={20} />,
      desc: "Fondations solides & scalables, posées loin du bruit.",
      techs: [
        "Architecture Hexagonale",
        "API REST",
        "Base de Données SQL",
        "Sécurité & Auth",
        "Microservices",
      ],
    },
    {
      category: "Façade (Frontend)",
      icon: <Layers size={20} />,
      desc: "Interfaces réactives, assemblées avec précision.",
      techs: [
        "Composants Réactifs",
        "TypeScript",
        "Animations",
        "Responsive Design",
        "Gestion d'État",
      ],
    },
    {
      category: "L'Établi (DevOps & Outils)",
      icon: <Terminal size={20} />,
      desc: "Mon environnement de travail optimisé.",
      techs: ["CI/CD", "Conteneurisation", "Tests Automatisés", "Versioning"],
    },
  ],
  project: {
    title: "Pelote Manager",
    context:
      "Digitalisation complète de championnats de Pelote Basque (Gomme pleine).",
    challenge:
      "Complexité algorithmique pour la gestion des créneaux et règles de tournois.",
    stack: ["Frontend Moderne", "Backend Robuste", "Base de Données"],
  },
};

// --- API CLIENT (Le lien vers gemini.ts) ---
// C'est ici que la connexion se fait. '/api/gemini' correspond au fichier api/gemini.ts
const callAIProxy = async (action: string, input: string) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, input }),
    });

    if (!response.ok)
      throw new Error("Erreur réseau ou clé API manquante côté serveur");
    return await response.json();
  } catch (error) {
    console.error("Erreur appel proxy:", error);
    return null;
  }
};

// --- PIXEL ART SVG COMPONENTS ---

const FloatingPixel = ({
  children,
  delay = 0,
  duration = 4,
  className = "",
}: any) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className={`absolute pointer-events-none z-0 opacity-80 ${className}`}
  >
    {children}
  </motion.div>
);

const PixelPala = ({ size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="7" y="11" width="2" height="4" fill="var(--secondary)" />
    <rect x="5" y="3" width="6" height="8" fill="var(--secondary)" />
    <rect x="6" y="2" width="4" height="1" fill="var(--secondary)" />
    <rect
      x="12"
      y="5"
      width="2"
      height="2"
      fill="var(--background)"
      stroke="var(--foreground)"
      strokeWidth="0.5"
    />
    <rect
      x="11"
      y="3"
      width="1"
      height="8"
      fill="var(--foreground)"
      opacity="0.2"
    />
  </svg>
);

const PixelEtxe = ({ size = 100 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 2L2 9H18L10 2Z" fill="var(--primary)" />
    <rect x="3" y="9" width="14" height="9" fill="var(--background)" />
    <rect x="3" y="9" width="1" height="9" fill="var(--primary)" />
    <rect x="16" y="9" width="1" height="9" fill="var(--primary)" />
    <rect x="3" y="13" width="14" height="1" fill="var(--primary)" />
    <rect x="9" y="9" width="2" height="9" fill="var(--primary)" />
    <rect x="9" y="15" width="2" height="3" fill="var(--foreground)" />
  </svg>
);

const PixelCathedral = ({ size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4"
      y="14"
      width="16"
      height="10"
      fill="var(--foreground)"
      opacity="0.8"
    />
    <path
      d="M10 24V18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V24H10Z"
      fill="var(--background)"
    />
    <rect x="5" y="6" width="4" height="8" fill="var(--foreground)" />
    <rect x="15" y="6" width="4" height="8" fill="var(--foreground)" />
    <path d="M7 2L5 6H9L7 2Z" fill="var(--foreground)" />
    <path d="M17 2L15 6H19L17 2Z" fill="var(--foreground)" />
    <rect x="11" y="10" width="2" height="2" fill="var(--background)" />
  </svg>
);

const PixelDots = () => (
  <div className="flex gap-1 absolute top-4 right-4 opacity-50">
    <div className="w-2 h-2 bg-foreground"></div>
    <div className="w-2 h-2 bg-primary"></div>
    <div className="w-2 h-2 bg-secondary"></div>
  </div>
);

const PixelBrackets = ({ className = "" }) => (
  <div
    className={`font-mono font-bold text-primary tracking-tighter select-none ${className}`}
    style={{ imageRendering: "pixelated", fontSize: "1.5rem" }}
  >
    {`{ }`}
  </div>
);

const PixelLauburu = () => (
  <div
    className="w-8 h-8 opacity-40 mx-auto mb-4"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gridTemplateRows: "repeat(8, 1fr)",
      gap: "1px",
    }}
  >
    <div className="col-span-2 row-span-2 col-start-3 row-start-1 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-5 row-start-2 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-7 row-start-3 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-6 row-start-5 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-5 row-start-7 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-3 row-start-6 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-1 row-start-5 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-2 row-start-3 bg-foreground"></div>
    <div className="col-span-2 row-span-2 col-start-4 row-start-4 bg-primary"></div>
  </div>
);

const GrainOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  ></div>
);

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, -150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const gridY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) {
    mouseX.set(clientX * -0.05);
    mouseY.set(clientY * -0.05);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          x: gridX,
          y: gridY,
        }}
      ></motion.div>
      <PixelDots />

      <FloatingPixel
        className="absolute left-[-20px] md:left-20 bottom-32 opacity-20 hidden md:block"
        duration={6}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <PixelCathedral size={200} />
        </motion.div>
      </FloatingPixel>

      <motion.div
        style={{ y: yText }}
        className="z-10 text-center px-4 max-w-5xl mt-[-5vh] relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-secondary font-mono text-sm tracking-widest mb-4"
        >
          <MapPin size={14} /> {DATA.profile.location.toUpperCase()}
          <span className="text-primary">//</span>
          <span>MODE: FREELANCE_ACTIF</span>
        </motion.div>

        <div className="relative inline-block">
          <PixelBrackets className="absolute -left-8 top-2 md:-left-12 md:top-4 opacity-50 hidden md:block" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-6 leading-[0.9]"
          >
            {DATA.profile.name}
          </motion.h1>
          <PixelBrackets className="absolute -right-8 bottom-2 md:-right-12 md:bottom-4 opacity-50 hidden md:block" />
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-2 bg-primary mx-auto mb-8"
          style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
        />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-xl md:text-3xl text-foreground font-light"
        >
          Architecte Numérique{" "}
          <span className="font-bold text-primary">Indépendant</span>
          <span className="font-bold text-primary">
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-mono text-sm text-foreground/60 mt-4"
        >
          {DATA.profile.subRole}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-20"
      >
        <ChevronDown className="text-primary animate-bounce" size={32} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-background text-foreground overflow-hidden relative"
    >
      <div className="absolute left-0 top-1/4 w-2 h-8 bg-primary opacity-20"></div>
      <div
        className="absolute left-3 top-1/4 w-2 h-4 bg-foreground opacity-20"
        style={{ marginTop: "32px" }}
      ></div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        <FloatingPixel
          className="absolute top-0 right-10 md:right-32 opacity-100 md:opacity-100 z-10"
          duration={5}
          delay={1}
        >
          <motion.div
            className="bg-background p-2 rounded-full border border-primary/20 shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PixelEtxe size={80} />
          </motion.div>
        </FloatingPixel>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1 relative z-20">
            <div className="flex items-center gap-4">
              <span className="font-mono text-primary text-sm">{`> 01. LE MANIFESTE`}</span>
              <div
                className="h-[2px] grow bg-foreground/10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1f4045 50%, transparent 50%)",
                  backgroundSize: "4px 1px",
                }}
              ></div>
            </div>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl leading-tight"
            >
              L'expertise ne se dilue pas dans{" "}
              <span className="italic text-primary relative">
                l'open-space.
                <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/20 -z-10"></span>
              </span>
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-lg text-foreground/80 leading-relaxed text-justify space-y-4 border-l-4 border-secondary pl-6"
            >
              <p>
                J'ai quitté le monde du salariat classique pour une raison
                simple : la qualité exige de la concentration.
              </p>
              <p>
                En tant qu'<strong>Architecte Numérique Indépendant</strong>, je
                ne suis pas un "paquet de ressources" interchangeable. Je suis
                un artisan qui choisit ses outils et qui s'engage sur le
                résultat. Je travaille en direct avec vous, sans intermédiaires
                superflus, pour bâtir des applications qui durent.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {DATA.profile.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center md:text-left p-4 bg-card border border-foreground/10 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div
                    className={`font-serif text-3xl font-bold ${
                      stat.label === "Mode" ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-foreground mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full order-1 md:order-2 bg-card border-2 border-foreground/20 overflow-hidden flex flex-col shadow-xl"
            style={{
              clipPath:
                "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <div className="grow flex items-center justify-center relative p-12">
              <div className="w-full h-full border-4 border-secondary/50 relative">
                <div className="absolute top-0 left-1/4 w-1/2 h-full border-x-2 border-dashed border-foreground/30"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 border-y-2 border-dashed border-foreground/30"></div>
                <Code2
                  size={64}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary opacity-80"
                />
              </div>
            </div>

            <div className="absolute bottom-8 -right-8 bg-primary text-white py-2 px-8 font-mono text-sm shadow-lg transform -rotate-90 origin-bottom-right flex items-center gap-2">
              <Terminal size={14} /> FREELANCE_STUDIO
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Workshop = () => {
  return (
    <section id="workshop" className="py-24 bg-card relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,#bf2c23,#bf2c23_4px,transparent_4px,transparent_8px)] opacity-30"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-primary text-sm block mb-2">{`> 02. L'ATELIER PRIVÉ`}</span>
          <h2 className="font-serif text-4xl text-foreground">
            Mes Outils de Prédilection
          </h2>
          <p className="font-sans text-foreground mt-4 max-w-lg mx-auto">
            En freelance, je choisis les technologies les plus fiables pour
            garantir pérennité et performance à vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DATA.stack.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-background p-8 border border-foreground/20 shadow-sm hover:shadow-[4px_4px_0px_0px_#bf2c23] transition-all duration-300 group relative overflow-hidden"
            >
              <PixelDots />
              <div
                className="text-foreground mb-4 bg-secondary/20 w-12 h-12 flex items-center justify-center border border-foreground/40"
                style={{ borderRadius: "4px" }}
              >
                {group.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {group.category}
              </h3>
              <p className="font-sans text-sm text-foreground mb-6 italic border-b-2 border-dashed border-foreground/10 pb-4">
                {group.desc}
              </p>
              <ul className="space-y-3">
                {group.techs.map((tech, tIdx) => (
                  <li
                    key={tIdx}
                    className="flex items-center font-mono text-sm text-foreground group/item"
                  >
                    <span className="w-2 h-2 mr-3 bg-foreground opacity-0 group-hover/item:opacity-100 transition-opacity"></span>
                    <span className="opacity-80 group-hover/item:opacity-100 group-hover/item:font-bold transition-all">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Project = () => {
  return (
    <section
      id="projects"
      className="py-32 bg-foreground text-background relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <FloatingPixel
        className="absolute top-10 right-10 z-0 opacity-40 rotate-12"
        duration={4}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <PixelPala size={160} />
        </motion.div>
      </FloatingPixel>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <span className="inline-block font-mono text-primary bg-primary/20 text-sm border border-primary px-3 py-1 mb-2">
              PROJET SUR-MESURE
            </span>
            <h2 className="font-serif text-5xl font-bold leading-none text-background">
              {DATA.project.title}
            </h2>

            <p className="font-sans text-lg text-background/80 leading-relaxed border-l-2 border-secondary pl-4">
              {DATA.project.context}
            </p>

            <div className="bg-background/5 p-6 border border-[#fcfbf7]/10 relative">
              <PixelDots />
              <h3 className="font-serif text-secondary mb-2 flex items-center gap-2 text-lg font-bold">
                <PenTool size={16} /> Le Défi Technique
              </h3>
              <p className="text-sm font-mono text-background/70">
                {`> ${DATA.project.challenge}`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {DATA.project.stack.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-xs text-[#1f4045] bg-secondary px-3 py-1 border-b-2 border-primary font-bold"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-2 bg-foreground"
              style={{ boxShadow: "6px 6px 0px 0px #bf2c23" }}
            >
              <div className="bg-background h-8 flex items-center px-4 gap-2 border-b-2 border-foreground">
                <div className="w-3 h-3 bg-primary"></div>
                <div className="w-3 h-3 bg-secondary"></div>
                <div className="grow text-right text-xs font-mono text-foreground opacity-50">
                  pelote-manager.exe
                </div>
              </div>

              <div className="aspect-video bg-card p-6 relative overflow-hidden group border-2 border-[#fcfbf7]">
                <div className="flex justify-between items-center mb-8 border-b-2 border-dashed border-foreground/20 pb-4">
                  <div className="w-32 h-6 bg-foreground/20 rounded-none"></div>
                  <div className="w-20 h-8 bg-primary rounded-none text-white font-mono text-xs flex items-center justify-center">
                    TOURNOI+
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-background border-2 border-foreground/10 p-2 relative"
                    >
                      <div className="w-4 h-4 bg-secondary absolute top-2 right-2"></div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="https://www.pelote-manager.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-[#fcfbf7] px-6 py-3 font-mono text-sm flex items-center gap-2 border-2 border-[#fcfbf7] hover:bg-background hover:text-primary transition-colors shadow-[4px_4px_0px_0px_#fcfbf7] hover:shadow-[2px_2px_0px_0px_#bf2c23] hover:translate-y-[2px] hover:translate-x-[2px]"
                  >
                    <Terminal size={16} aria-hidden="true" /> VOIR LE CODE
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- AI ARCHITECT FEATURE ---

const AIArchitect = () => {
  const [idea, setIdea] = useState("");
  const [activeTool, setActiveTool] = useState("blueprint"); // blueprint | roadmap

  const [blueprint, setBlueprint] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setBlueprint(null);
    setRoadmap(null);
    setError(false);

    // Appel au Proxy Vercel
    const result = await callAIProxy(activeTool, idea);

    setLoading(false);
    if (result) {
      if (activeTool === "blueprint") setBlueprint(result);
      if (activeTool === "roadmap") setRoadmap(result);
    } else {
      setError(true);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(191,44,35,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(191,44,35,0.2)_1px,transparent_1px)] bg-size-[20px_20px]"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-primary bg-primary/10 px-2 py-1 text-sm border border-primary/20 mb-4 inline-block">
            <Sparkles size={12} className="inline mr-2 fill-primary" />
            BETA: BUREAU D'ÉTUDES VIRTUEL
          </span>
          <h2 className="font-serif text-4xl text-foreground">
            L'Avant-Projet (IA)
          </h2>
          <p className="text-foreground/70 mt-4 max-w-lg mx-auto">
            Décrivez votre idée. Mon assistant IA générera instantanément une
            ébauche depuis mon serveur sécurisé.
          </p>
        </div>

        {/* Tools Switcher */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveTool("blueprint")}
            className={`px-6 py-2 font-mono text-sm border-2 transition-all ${
              activeTool === "blueprint"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-foreground/20 hover:border-primary"
            }`}
          >
            1. PLAN TECHNIQUE
          </button>
          <button
            onClick={() => setActiveTool("roadmap")}
            className={`px-6 py-2 font-mono text-sm border-2 transition-all ${
              activeTool === "roadmap"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-foreground/20 hover:border-primary"
            }`}
          >
            2. PLANNING CHANTIER
          </button>
        </div>

        {/* Input Area */}
        <div className="bg-card p-8 shadow-xl border-2 border-foreground relative max-w-2xl mx-auto transform -rotate-1 transition-transform hover:rotate-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-foreground"></div>
          <PixelDots />

          <label
            htmlFor="ai-idea-input"
            className="block font-mono text-xs font-bold text-foreground mb-2 uppercase items-center gap-2"
          >
            {activeTool === "blueprint" ? (
              <Layers size={14} aria-hidden="true" />
            ) : (
              <Calendar size={14} aria-hidden="true" />
            )}
            {activeTool === "blueprint"
              ? "Description du système"
              : "Périmètre du projet"}
          </label>
          <textarea
            id="ai-idea-input"
            className="w-full bg-background border-2 border-foreground/20 p-4 font-mono text-sm text-foreground focus:outline-none focus:border-primary min-h-[100px] mb-4 resize-none"
            placeholder={
              activeTool === "blueprint"
                ? "Ex: Une marketplace pour artisans locaux..."
                : "Ex: Une application SaaS de gestion de stock..."
            }
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !idea.trim()}
              className="bg-foreground text-background px-6 py-3 font-mono text-sm flex items-center gap-2 hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_#d4a373]"
            >
              {loading ? (
                <span className="animate-pulse">Connexion au serveur...</span>
              ) : (
                <>
                  <Sparkles size={16} />{" "}
                  {activeTool === "blueprint"
                    ? "GÉNÉRER LE PLAN"
                    : "CALCULER LE PLANNING"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result: BLUEPRINT */}
        {blueprint && activeTool === "blueprint" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-foreground text-background p-8 border-4 border-secondary relative max-w-3xl mx-auto shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-foreground font-bold font-mono px-4 py-1 text-xs border border-foreground">
              DOCUMENT TECHNIQUE
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="border-b md:border-b-0 md:border-r border-[#fcfbf7]/20 pb-8 md:pb-0 md:pr-8">
                <h3 className="font-serif text-secondary mb-4 flex items-center gap-2 text-xl">
                  <Hammer size={18} /> Fondations (Backend)
                </h3>
                <p className="font-sans text-sm leading-relaxed opacity-90">
                  {blueprint.foundations}
                </p>
              </div>
              <div className="pl-0 md:pl-2">
                <h3 className="font-serif text-secondary mb-4 flex items-center gap-2 text-xl">
                  <Layers size={18} /> Façade (Frontend)
                </h3>
                <p className="font-sans text-sm leading-relaxed opacity-90">
                  {blueprint.facade}
                </p>
              </div>
            </div>

            <div className="bg-primary/20 p-4 border border-primary/50 mb-6 flex gap-4 items-start">
              <div className="bg-primary p-1 mt-1">
                <Sparkles size={12} className="text-white" />
              </div>
              <div>
                <h5 className="font-mono text-primary text-xs font-bold mb-1 uppercase">
                  Point de Vigilance
                </h5>
                <p className="font-sans text-sm italic opacity-90">
                  {blueprint.risk}
                </p>
              </div>
            </div>

            <div className="text-center border-t border-[#fcfbf7]/10 pt-6">
              <p className="font-serif text-lg text-secondary">
                "{blueprint.analogy}"
              </p>
            </div>
          </motion.div>
        )}

        {/* Result: ROADMAP */}
        {roadmap && activeTool === "roadmap" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-card border-4 border-foreground relative max-w-3xl mx-auto shadow-[8px_8px_0px_0px_#1f4045]"
          >
            <div className="bg-foreground text-background px-4 py-2 font-mono text-sm flex justify-between items-center">
              <span>PLANNING_PREVISIONNEL.GAN</span>
              <Clock size={14} />
            </div>

            <div className="p-8 space-y-6">
              {roadmap.map((phase: any, idx: number) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-foreground/20 last:border-0 pb-2"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary border-2 border-[#f4f1ea] rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-foreground text-xl font-bold">
                      {phase.phase}
                    </h3>
                    <span className="font-mono text-xs bg-foreground/10 px-2 py-1 text-foreground">
                      {phase.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((task: any, tIdx: number) => (
                      <li
                        key={tIdx}
                        className="flex items-center gap-2 font-sans text-sm text-foreground/80"
                      >
                        <ArrowRight size={12} className="text-secondary" />{" "}
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-foreground/5 p-4 text-center font-mono text-xs text-foreground/60 border-t border-foreground/10">
              * Estimation purement indicative générée par IA.
            </div>
          </motion.div>
        )}

        {error && (
          <div className="mt-8 text-center text-primary font-mono text-sm bg-primary/10 p-4 border border-primary">
            <strong>Erreur Backend :</strong> Impossible de joindre le bureau
            d'études (Route /api/gemini introuvable).
            <br />
            Si vous êtes sur la Preview, c'est normal. Veuillez déployer le
            projet sur Vercel.
          </div>
        )}
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section className="py-24 bg-background text-center overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <PixelBrackets className="absolute top-0 left-0 opacity-20 text-6xl hidden md:block" />
        <PixelBrackets className="absolute bottom-0 right-0 opacity-20 text-6xl hidden md:block" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="border-4 border-secondary/30 p-12 relative bg-card"
        >
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-foreground"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-foreground"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-foreground"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-foreground"></div>

          <Code2 size={48} className="mx-auto text-primary mb-6 opacity-80" />

          <h3 className="font-serif text-3xl text-foreground mb-6">
            "Du code propre pour des projets qui durent."
          </h3>
          <p className="font-sans text-lg text-foreground/80 italic leading-loose font-medium">
            Mon engagement de freelance : vous livrer une architecture
            logicielle aussi solide qu'une charpente en chêne et aussi
            fonctionnelle qu'une interface bien pensée. Sans les coûts cachés
            d'une agence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// CONTACT + EMAIL DRAFTER
const Contact = ({ prefill }: { prefill?: string }) => {
  const [emailInputs, setEmailInputs] = useState("");
  const [draft, setDraft] = useState<any>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);

  useEffect(() => {
    if (prefill) {
      setEmailInputs(prefill);
    }
  }, [prefill]);

  const handleDraftEmail = async () => {
    if (!emailInputs.trim()) return;
    setLoadingEmail(true);
    // Appel proxy Vercel pour l'email
    const result = await callAIProxy("email", emailInputs);

    if (result) {
      setDraft(result);
    } else {
      alert("Erreur de connexion au serveur IA.");
    }
    setLoadingEmail(false);
  };

  return (
    <section
      id="contact"
      className="pt-24 pb-12 bg-foreground text-background border-t-8 border-primary relative"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,#fcfbf7,#fcfbf7_8px,transparent_8px,transparent_16px)] opacity-20"></div>

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="font-serif text-4xl mb-8">
          Engagez votre <br />
          Architecte Indépendant
        </h2>
        <p className="font-sans text-background/80 mb-12 text-lg max-w-2xl mx-auto">
          Vous avez un projet complexe ? Vous cherchez une expertise directe,
          sans filtre ?<br />
          Discutons de votre vision, d'artisan à porteur de projet.
        </p>

        {/* EMAIL DRAFTER WIDGET */}
        <div className="bg-background/5 border border-[#fcfbf7]/10 p-6 rounded-lg mb-12 text-left max-w-2xl mx-auto backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4 text-secondary">
            <MessageSquare size={18} />
            <span className="font-mono text-sm font-bold uppercase">
              Assistant de Correspondance (IA)
            </span>
          </div>

          {!draft ? (
            <>
              <p className="text-sm text-background mb-4">
                Vous ne savez pas par où commencer ? Listez vos besoins (ex:
                "Refonte site e-commerce, budget 5k, délai 2 mois"), je rédige
                l'email pour vous.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  aria-label="Mots-clés du projet"
                  value={emailInputs}
                  onChange={(e) => setEmailInputs(e.target.value)}
                  className="grow bg-foreground border border-[#fcfbf7]/20 px-4 py-2 font-mono text-sm text-background focus:border-primary outline-none"
                  placeholder="Mots-clés du projet..."
                />
                <button
                  onClick={handleDraftEmail}
                  disabled={loadingEmail}
                  className="bg-secondary text-foreground px-4 py-2 font-mono text-sm hover:bg-background transition-colors"
                >
                  {loadingEmail ? "..." : "Rédiger"}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-background text-foreground p-4 rounded font-mono text-xs relative"
            >
              <button
                onClick={() => setDraft(null)}
                className="absolute top-2 right-2 text-primary hover:underline"
              >
                Fermer
              </button>
              <div className="mb-2 font-bold border-b border-foreground/10 pb-2">
                Objet : {draft.subject}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">
                {draft.body}
              </div>
              <div className="mt-4 pt-2 border-t border-foreground/10 flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Objet: ${draft.subject}\n\n${draft.body}`,
                    );
                    alert("Copié !");
                  }}
                  className="flex items-center gap-2 text-primary hover:text-foreground"
                >
                  <ClipboardCopy size={14} /> Copier le texte
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <a
          href="mailto:contact@julesdupuis.fr"
          className="group inline-flex items-center gap-3 bg-primary text-[#fcfbf7] px-8 py-4 font-mono text-sm border-2 border-[#fcfbf7] transition-all shadow-[6px_6px_0px_0px_#d4a373] hover:shadow-[2px_2px_0px_0px_#d4a373] hover:translate-y-[4px] hover:translate-x-[4px] duration-200"
        >
          <Mail size={18} className="group-hover:animate-pulse" />{" "}
          contact@julesdupuis.fr
        </a>

        <div className="flex justify-center gap-8 mt-16 mb-16">
          <a
            href="https://github.com/JulesDups/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir mon profil Github"
            className="text-background hover:text-primary transition-all duration-300 p-2 opacity-80 hover:opacity-100 hover:scale-110"
          >
            <Github aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/jules-dupuis/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir mon profil Linkedin"
            className="text-background hover:text-primary transition-all duration-300 p-2 opacity-80 hover:opacity-100 hover:scale-110"
          >
            <Linkedin aria-hidden="true" />
          </a>
        </div>

        <div className="border-t-2 border-dashed border-[#fcfbf7]/20 pt-12 flex flex-col items-center">
          <PixelLauburu />

          <p className="font-mono text-xs text-background">
            © 2025 Jules Dupuis • Architecte Numérique Indépendant • Fait au
            Pays Basque
          </p>
          <div className="mt-4 font-mono text-xs text-background/40">
            <Link
              href="/mentions-legales"
              className="hover:text-primary transition-colors underline decoration-dotted"
            >
              Mentions Légales & CGV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP ---

export default function PortfolioApp() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contactPrefill, setContactPrefill] = useState("");

  const handlePlanSelection = (planName: string) => {
    const message = `Projet web basé sur l'offre "${planName}". \nBudget estimé : ... \nDélai souhaité : ...`;
    setContactPrefill(message);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white cursor-crosshair">
      <ReadingProgress />
      <GrainOverlay />

      {/* Custom Cursor Follower Pixelisé */}
      <div
        className="fixed w-3 h-3 bg-primary pointer-events-none z-100 mix-blend-multiply opacity-0 md:opacity-80 transition-transform duration-75 ease-out shadow-[2px_2px_0px_0px_#1f4045]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%)`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/90 backdrop-blur-md border-b-2 border-foreground px-6 py-4 flex justify-between items-center shadow-sm">
        <span className="font-serif font-bold text-xl tracking-tighter flex items-center gap-2">
          <span className="text-primary font-mono">{`{`}</span>JD.
          <span className="text-primary font-mono">{`}`}</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary font-bold hidden md:inline-block animate-pulse">
            ● STATUS: DISPONIBLE
          </span>
          <a
            href="mailto:contact@julesdupuis.fr"
            className="font-mono text-xs bg-foreground text-background px-4 py-2 hover:bg-primary hover:text-[#fcfbf7] transition-colors shadow-[3px_3px_0px_0px_#d4a373] hover:shadow-[1px_1px_0px_0px_#d4a373] hover:translate-y-[2px] active:translate-y-[3px]"
          >
            ENGAGER
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>

      <main>
        <Hero />
        <PixelSeparator />
        <About />
        <PixelSeparator />
        <Workshop />
        <PixelSeparator />
        <Project />
        <PixelSeparator />
        <Pricing onPlanSelect={handlePlanSelection} />
        <PixelSeparator />
        <AIArchitect />
        <PixelSeparator />
        <Philosophy />
        <PixelSeparator />
        <Contact prefill={contactPrefill} />
      </main>
    </div>
  );
}
