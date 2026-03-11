"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const screens = [
  {
    title: "Discover",
    subtitle: "Find cafés & drinks",
    gradient: "from-matcha-mint via-matcha-sage to-matcha-primary",
    emoji: "📍",
    items: ["Matcha Latte — 4.8★", "Iced Ceremonial — 4.9★", "Hojicha Blend — 4.7★"],
  },
  {
    title: "Buddy",
    subtitle: "Meet matcha lovers",
    gradient: "from-matcha-sage via-matcha-primary to-matcha-vibrant",
    emoji: "💚",
    items: ["Sarah, 2mi away", "Alex, matcha daily", "Kai, latte art fan"],
  },
  {
    title: "Shop",
    subtitle: "Premium gear",
    gradient: "from-matcha-primary via-matcha-vibrant to-matcha-deep",
    emoji: "🛒",
    items: ["Chasen Whisk — $24", "Chawan Bowl — $38", "Uji Powder — $32"],
  },
];

function MiniPhone({
  screen,
  index,
}: {
  screen: (typeof screens)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-[220px] h-[440px] sm:w-[240px] sm:h-[480px] bg-matcha-ink dark:bg-[#1a1a1a] rounded-[2.5rem] p-2.5 shadow-2xl shadow-matcha-deep/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-matcha-ink dark:bg-[#1a1a1a] rounded-b-xl z-10" />
        <div
          className={`w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br ${screen.gradient} flex flex-col items-center justify-center p-5`}
        >
          <span className="text-4xl mb-3">{screen.emoji}</span>
          <div className="text-matcha-ink font-bold text-base mb-0.5">
            {screen.title}
          </div>
          <div className="text-matcha-secondary text-xs mb-5">
            {screen.subtitle}
          </div>
          <div className="w-full space-y-2">
            {screen.items.map((item) => (
              <div
                key={item}
                className="bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 text-matcha-ink text-xs font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-text-primary font-semibold">{screen.title}</div>
        <div className="text-text-tertiary text-sm">{screen.subtitle}</div>
      </div>
    </motion.div>
  );
}

export default function AppPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            See It in Action
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A beautiful, intuitive experience designed for matcha enthusiasts.
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-14"
        >
          {screens.map((screen, i) => (
            <MiniPhone key={screen.title} screen={screen} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
