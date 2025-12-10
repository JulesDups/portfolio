"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressPercentage = useTransform(
    scrollYProgress,
    (v) => `${v * 100}%`,
  );
  const progressOpacity = useTransform(scrollYProgress, (v) => (v > 0 ? 1 : 0));

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX }}
      />
      {/* Pixel decoration at the end of the bar */}
      <motion.div
        className="absolute top-0 w-2 h-2 bg-primary -ml-1"
        style={{
          left: progressPercentage,
          opacity: progressOpacity,
        }}
      />
    </div>
  );
};
