"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "🍵",
    title: "Rate & Review",
    description:
      "Rate matcha drinks, discover hidden gems, and share your favorites with the community.",
    color: "from-matcha-mint to-matcha-sage",
  },
  {
    emoji: "📍",
    title: "Discover Cafés",
    description:
      "Find the best matcha spots near you, powered by Google Places. Never drink bad matcha again.",
    color: "from-matcha-sage to-matcha-primary",
  },
  {
    emoji: "💚",
    title: "Matcha Buddy",
    description:
      "Match with fellow matcha enthusiasts. Swipe, chat, and find your matcha soulmate.",
    color: "from-matcha-primary to-matcha-vibrant",
  },
  {
    emoji: "🗣️",
    title: "Community Feed",
    description:
      "Share your matcha moments, join discussions, and stay inspired by fellow matcha lovers.",
    color: "from-matcha-vibrant to-matcha-deep",
  },
  {
    emoji: "🛒",
    title: "Matcha Shop",
    description:
      "Browse curated matcha gear — whisks, bowls, premium powder, and more.",
    color: "from-matcha-deep to-matcha-sage",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Everything Matcha, One App
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From discovering the perfect latte to connecting with fellow
            enthusiasts — we&apos;ve got it all.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative bg-bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:shadow-matcha-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}
              >
                {feature.emoji}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
