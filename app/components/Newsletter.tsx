"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're in! Welcome to the matcha fam.");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again!");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-matcha-sage blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-matcha-mint blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Get matcha tips, café recommendations, and early access to new
            features.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 rounded-2xl bg-bg-card border border-border text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-matcha-primary focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-4 bg-matcha-primary text-white rounded-2xl font-semibold hover:bg-matcha-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <AnimatePresence>
            {(status === "success" || status === "error") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium inline-block ${
                  status === "success"
                    ? "bg-matcha-mint text-matcha-deep dark:bg-matcha-deep/30 dark:text-matcha-sage"
                    : "bg-matcha-coral/20 text-matcha-terracotta"
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
