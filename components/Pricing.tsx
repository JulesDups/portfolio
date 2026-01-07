"use client";
import { motion } from "framer-motion";
import { Check, Hammer, Info, Shield, Users, Zap } from "lucide-react";

const PLANS = [
  {
    name: "LE PILOTAGE",
    type: "Sécurisation Technique",
    price: "450€",
    frequency: "/ jour",
    desc: "Sécurisez vos chantiers critiques. J&rsquo;interviens pour débloquer vos dettes techniques et garantir vos mises en production.",
    features: [
      "Élimination des bugs critiques",
      "Sécurisation des délais de mise en production",
      "Audit & Refonte de code legacy",
      "Transmission de savoir-faire aux équipes",
    ],
    recurring: "Disponibilité&nbsp;: Janvier 2026",
    icon: <Users size={24} aria-hidden="true" />,
    isTjm: true,
  },
  {
    name: "L'ESQUISSE",
    type: "Conversion & Visibilité",
    price: "1 250",
    desc: "Ne perdez plus un seul prospect. Une solution de visibilité ultra-rapide pour capturer votre audience dès les premières secondes.",
    features: [
      "Conversion optimisée (Cible business)",
      "Performance fulgurante (Score SEO 100/100)",
      "Design unique & sur-mesure",
      "Mobile first&nbsp;: Responsive & Accessible",
      "Expérience utilisateur sans friction",
    ],
    recurring: "Maintenance&nbsp;: Sur mesure",
    icon: <Zap size={24} aria-hidden="true" />,
  },
  {
    name: "LA RÉSIDENCE",
    type: "Productivité Métier",
    price: "3 000",
    desc: "Digitalisez vos processus manuels. Une structure robuste pour automatiser vos tâches répétitives et libérer votre croissance.",
    features: [
      "Automatisation des workflows complexes",
      "Gain de temps&nbsp;: jusqu&rsquo;à x4 sur les tâches",
      "Gestion centralisée de vos données métier",
      "Formation & Accompagnement à l&rsquo;outil",
    ],
    recurring: "Maintenance&nbsp;: Sur mesure",
    icon: <Hammer size={24} aria-hidden="true" />,
    popular: true,
  },
  {
    name: "LA CITADELLE",
    type: "Centre de Contrôle (SaaS)",
    price: "Sur Devis",
    desc: "L&rsquo;architecture ultime pour dominer votre marché. Transformez votre vision en plateforme capable de travailler pour vous 24/7.",
    features: [
      "Architecture stratégique (Scalabilité infinie)",
      "Plateforme multi-tenants / multi-rôles",
      "Tableaux de bord stratégiques & ROI",
      "Sécurité bancaire & Haute disponibilité",
    ],
    recurring: "Maintenance&nbsp;: Sur mesure",
    icon: <Shield size={24} aria-hidden="true" />,
  },
];

export const Pricing = ({
  onPlanSelect,
}: {
  onPlanSelect: (plan: string) => void;
}) => {
  return (
    <section
      id="tarifs"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Fond décoratif style plan */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-primary text-sm mb-2 block">{`> 03. PERMIS DE CONSTRUIRE`}</span>
          <h2 className="font-serif text-4xl text-foreground">
            Investissez dans du Solide
          </h2>
          <p className="font-sans text-foreground/70 mt-4 max-w-lg mx-auto">
            Pas de coûts cachés. Un forfait pour la construction (le code), et
            un abonnement clair pour le syndic (la maintenance).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start mb-16">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: idx * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                },
                hover: {
                  y: -8,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
              }}
              className={`relative bg-card p-8 border-2 flex flex-col h-full transition-shadow duration-300 ${
                plan.popular
                  ? "border-primary shadow-[8px_8px_0px_0px_#bf2c23] hover:shadow-[12px_12px_0px_0px_#bf2c23]"
                  : plan.isTjm
                    ? "border-secondary border-dashed shadow-[4px_4px_0px_0px_rgba(191,44,35,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(191,44,35,0.3)]"
                    : "border-foreground/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 font-mono">
                  RECOMMANDÉ
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 text-secondary">
                {plan.icon}
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
              </div>

              <div className="mb-6 border-b border-dashed border-foreground/10 pb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Sur Devis" && !plan.isTjm && (
                    <span className="text-sm font-mono text-foreground/60">
                      dès
                    </span>
                  )}
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className="text-lg font-mono text-foreground/70">
                      {plan.frequency}
                    </span>
                  )}
                  {!plan.frequency && (
                    <span className="text-sm font-sans text-foreground">
                      {plan.price === "Sur Devis" ? "" : "€"}
                    </span>
                  )}
                  {plan.price !== "Sur Devis" && !plan.isTjm && (
                    <span className="text-primary text-xl">*</span>
                  )}
                </div>
                <p className="text-xs font-mono text-primary mt-2 font-bold">
                  {plan.type.toUpperCase()}
                </p>
                <p className="text-sm text-foreground/70 mt-4 italic">
                  "{plan.desc}"
                </p>
              </div>

              <ul className="space-y-3 mb-8 grow">
                {plan.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2 text-sm font-sans text-foreground/90"
                  >
                    <Check size={16} className="text-primary mt-1 shrink-0" />
                    <span>{feat}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="bg-background/50 p-4 border border-foreground/10 text-center mb-6">
                  <span className="block text-xs font-mono text-foreground/50 uppercase mb-1">
                    Le Syndic (Maintenance)
                  </span>
                  <span className="font-bold text-secondary text-sm">
                    {plan.recurring}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPlanSelect(plan.name)}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full py-3 font-mono text-sm border-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    plan.popular
                      ? "bg-primary text-white border-primary hover:bg-white hover:text-primary"
                      : plan.isTjm
                        ? "bg-secondary text-white border-secondary hover:bg-white hover:text-secondary"
                        : "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background"
                  }`}
                  aria-label={`${plan.isTjm ? "Voir le profil" : "Demander le plan"} ${plan.name}`}
                >
                  {plan.isTjm ? "VOIR MON PROFIL TECH" : "DEMANDER CE PLAN"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION DISCLAIMER "SECURE" */}
        <div className="max-w-3xl mx-auto bg-foreground/5 border-l-4 border-secondary p-6 text-sm font-sans text-foreground/80 flex gap-4 items-start">
          <Info size={24} className="text-secondary shrink-0 mt-1" />
          <div>
            <h4 className="font-bold font-serif text-foreground mb-1">
              * Note de l'Architecte
            </h4>
            <p className="leading-relaxed">
              Chaque projet est unique. Les tarifs &laquo;&nbsp;dès&nbsp;&raquo;
              sont donnés à titre indicatif pour une surface fonctionnelle
              standard. Un devis ferme et définitif sera établi uniquement après
              étude détaillée de votre cahier des charges, afin de garantir une
              architecture adaptée à vos contraintes réelles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
