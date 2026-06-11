"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/config/portfolio";

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(value); // Ensure exact final value
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  } as const;

  return (
    <section className="relative py-16 border-t border-white/5 bg-white/1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Achievements Counter Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {portfolioData.achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="frosted-glass p-6 rounded-2xl border border-white/5 hover:border-accent-blue/25 neon-glow-card transition-all duration-300 flex flex-col items-center justify-center text-center group"
            >
              {/* Metric Label */}
              <span className="text-xs font-semibold text-text-secondary group-hover:text-accent-glow transition-colors duration-200 uppercase tracking-widest mb-2 block">
                {ach.metric}
              </span>
              
              {/* Counter Value */}
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center font-mono">
                <AnimatedCounter value={ach.value} />
                <span className="text-accent-purple bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent ml-0.5">
                  {ach.suffix}
                </span>
              </div>
              
              {/* Subtitle Description */}
              <span className="text-[10px] font-medium text-text-secondary tracking-wide mt-2 block opacity-75">
                {ach.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
