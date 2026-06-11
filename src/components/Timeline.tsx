"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, Milestone } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Timeline() {
  
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <GraduationCap className="w-4 h-4 text-accent-blue" />;
      case "certification":
        return <Award className="w-4 h-4 text-fuchsia-400" />;
      default:
        return <Milestone className="w-4 h-4 text-accent-purple" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  return (
    <section id="experience" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">ROADMAP</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Journey & <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Milestones</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        {/* Timeline Core Layout */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8">
          
          {/* Glowing Vertical Line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-transparent shadow-[0_0_10px_rgba(139,92,246,0.15)]" />

          {/* Timeline Nodes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {portfolioData.timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                {/* Node Dot Icon */}
                <div className="absolute left-[-39px] sm:left-[-47px] top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg-dark border border-white/10 group-hover:border-accent-blue shadow-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all duration-300">
                  <div className="absolute inset-0.5 rounded-full bg-white/2 group-hover:bg-accent-blue/5 transition-all duration-300" />
                  {getTimelineIcon(item.type)}
                </div>

                {/* Content Card */}
                <div className="frosted-glass p-6 rounded-2xl border border-white/5 hover:border-accent-blue/15 neon-glow-card transition-all duration-300 ml-4">
                  {/* Date & Sub info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-glow uppercase tracking-wider font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5 bg-white/2 text-text-secondary uppercase tracking-widest">
                      {item.type}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-glow transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <span className="block text-xs font-medium text-text-secondary mb-3">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed font-normal">
                    {item.description}
                  </p>

                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
