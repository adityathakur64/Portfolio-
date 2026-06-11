"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mountain, Bike, Coffee, Lightbulb, Music } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function BeyondCoding() {
  const getHobbyIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case "mountain":
        return <Mountain className={`w-5 h-5 ${colorClass}`} />;
      case "bike":
        return <Bike className={`w-5 h-5 ${colorClass}`} />;
      case "coffee":
        return <Coffee className={`w-5 h-5 ${colorClass}`} />;
      case "lightbulb":
        return <Lightbulb className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Music className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  const getAccentStyles = (accent: 'cyan' | 'amber' | 'pink' | 'blue' | 'purple') => {
    switch (accent) {
      case "cyan":
        return {
          borderColor: "hover:border-accent-cyan/25 hover:shadow-[0_4px_20px_rgba(6,182,212,0.08)]",
          iconBg: "bg-accent-cyan/5 border-accent-cyan/15",
          iconColor: "text-accent-cyan",
          titleHover: "group-hover:text-accent-cyan"
        };
      case "amber":
        return {
          borderColor: "hover:border-accent-amber/25 hover:shadow-[0_4px_20px_rgba(245,158,11,0.08)]",
          iconBg: "bg-accent-amber/5 border-accent-amber/15",
          iconColor: "text-accent-amber",
          titleHover: "group-hover:text-accent-amber"
        };
      case "pink":
        return {
          borderColor: "hover:border-accent-pink/25 hover:shadow-[0_4px_20px_rgba(236,72,153,0.08)]",
          iconBg: "bg-accent-pink/5 border-accent-pink/15",
          iconColor: "text-accent-pink",
          titleHover: "group-hover:text-accent-pink"
        };
      case "blue":
        return {
          borderColor: "hover:border-accent-blue/25 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)]",
          iconBg: "bg-accent-blue/5 border-accent-blue/15",
          iconColor: "text-accent-blue",
          titleHover: "group-hover:text-accent-blue"
        };
      default: // purple
        return {
          borderColor: "hover:border-accent-purple/25 hover:shadow-[0_4px_20px_rgba(139,92,246,0.08)]",
          iconBg: "bg-accent-purple/5 border-accent-purple/15",
          iconColor: "text-accent-purple",
          titleHover: "group-hover:text-accent-purple"
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  return (
    <section id="beyond-coding" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">OFFLINE LIFE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Beyond <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Coding</span>
          </h2>
          <p className="text-text-secondary mt-2 text-sm sm:text-base max-w-xl">
            A small window into what I do when I am not sitting in front of terminal consoles or monitoring model trainings.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        {/* Hobby Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {portfolioData.hobbies.map((hobby, idx) => {
            const styles = getAccentStyles(hobby.accent);
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, rotateX: 1, rotateY: -1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`frosted-glass p-5 rounded-2xl border border-white/5 ${styles.borderColor} neon-glow-card transition-all duration-300 flex flex-col justify-between group cursor-default`}
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${styles.iconBg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {getHobbyIcon(hobby.icon, styles.iconColor)}
                  </div>
                  
                  {/* Headline */}
                  <h3 className={`text-base font-bold text-white mb-2 ${styles.titleHover} transition-colors duration-200`}>
                    {hobby.title}
                  </h3>
                  
                  {/* Paragraph */}
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {hobby.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
