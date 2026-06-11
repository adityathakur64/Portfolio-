"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, Layers, Database, Terminal } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function About() {
  const { story, highlights } = portfolioData.about;

  const getIcon = (title: string) => {
    switch (title) {
      case "Artificial Intelligence":
        return <Brain className="w-6 h-6 text-accent-blue" />;
      case "Full Stack Development":
        return <Layers className="w-6 h-6 text-accent-glow" />;
      case "Database Architecture":
        return <Database className="w-6 h-6 text-accent-purple" />;
      default:
        return <Terminal className="w-6 h-6 text-white" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <section id="about" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">FOUNDATION</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            About <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Aditya Thakur</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Bio Story Narrative Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl font-bold text-white tracking-wide">
              Bridging Machine Learning & Modern Web Development
            </h3>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              {story}
            </p>
            <p className="text-text-secondary leading-relaxed text-base">
              My engineering mindset is driven by curiosity and an urge to write clean, maintainable, and highly optimized code. Whether it is tuning hyperparameters for a classification network, or composing layouts in Next.js, I strive for product design excellence.
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-white/5 bg-white/2">
                <span className="block text-2xl font-bold text-accent-blue">{portfolioData.personal.ogpa}</span>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Cumulative OGPA</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/2">
                <span className="block text-2xl font-bold text-accent-purple">{portfolioData.personal.education.year}</span>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">B.Tech AI CSE Student</span>
              </div>
            </div>
          </motion.div>

          {/* Core Core-Comp cards Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="frosted-glass p-6 rounded-2xl border border-white/5 hover:border-accent-blue/30 neon-glow-card transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {getIcon(item.title)}
                  </div>
                  <span className="text-[10px] font-bold text-white/20 tracking-wider">0{index + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-glow transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
