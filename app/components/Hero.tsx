"use client";

import { motion } from "framer-motion";

function FloatingBlob({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 dark:opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] bg-matcha-ink dark:bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl shadow-matcha-deep/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-matcha-ink dark:bg-[#1a1a1a] rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-gradient-to-br from-matcha-mint via-matcha-sage to-matcha-primary relative">
          {/* App screen content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <span className="text-5xl mb-4">🍵</span>
            <div className="text-matcha-ink font-bold text-lg mb-1">
              Matcha Match
            </div>
            <div className="text-matcha-secondary text-xs mb-6">
              Discover your perfect matcha
            </div>

            {/* Mini cards */}
            <div className="space-y-2 w-full">
              {[
                { emoji: "⭐", text: "Top Rated Lattes", rating: "4.9" },
                { emoji: "📍", text: "Cafés Near You", rating: "12" },
                { emoji: "💚", text: "New Matches", rating: "3" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.emoji}</span>
                    <span className="text-matcha-ink text-xs font-medium">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-matcha-deep text-xs font-bold">
                    {item.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -right-4 top-20 bg-bg-card border border-border rounded-2xl px-4 py-2 shadow-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-sm">⭐ 4.9 Rating</span>
      </motion.div>

      <motion.div
        className="absolute -left-6 bottom-32 bg-bg-card border border-border rounded-2xl px-4 py-2 shadow-lg"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <span className="text-sm">💚 New match!</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Floating blobs */}
      <FloatingBlob
        className="w-96 h-96 bg-matcha-sage -top-20 -left-20"
        delay={0}
      />
      <FloatingBlob
        className="w-80 h-80 bg-matcha-mint top-40 right-0"
        delay={2}
      />
      <FloatingBlob
        className="w-64 h-64 bg-matcha-primary bottom-20 left-1/4"
        delay={4}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matcha-mint dark:bg-matcha-deep/30 text-matcha-deep dark:text-matcha-sage text-sm font-medium mb-6">
              🍵 Now on iOS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-[1.1] mb-6"
          >
            Your matcha journey{" "}
            <span className="text-matcha-primary">starts here</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Rate drinks, discover cafés, meet matcha lovers, and shop the best
            gear — all in one app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 bg-matcha-ink dark:bg-matcha-cream text-white dark:text-matcha-ink rounded-2xl text-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-matcha-ink/20 dark:shadow-matcha-cream/10"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.89C10.1 6.87 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              Download on the App Store
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-4 text-text-secondary hover:text-matcha-primary transition-colors text-lg font-medium"
            >
              Learn More
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Phone mockup */}
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
