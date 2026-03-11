"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl">🍵</span>
          <span className="text-xl font-bold text-text-primary tracking-tight">
            Matcha Match
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Community", "Shop"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-text-secondary hover:text-matcha-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-bg-secondary border border-border flex items-center justify-center hover:bg-matcha-mint dark:hover:bg-matcha-deep/30 transition-colors"
            aria-label="Toggle dark mode"
          >
            <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
          </button>

          <a
            href="#"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-matcha-primary text-white rounded-full text-sm font-medium hover:bg-matcha-deep transition-colors"
          >
            Get the App
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
