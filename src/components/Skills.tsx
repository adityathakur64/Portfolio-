"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code, Server, Database, Brain, Settings } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Code className="w-5 h-5 text-accent-cyan" />;
      case "backend":
        return <Server className="w-5 h-5 text-accent-blue" />;
      case "databases":
        return <Database className="w-5 h-5 text-accent-purple" />;
      case "ai & machine learning":
        return <Brain className="w-5 h-5 text-accent-pink" />;
      default:
        return <Settings className="w-5 h-5 text-accent-amber" />;
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return {
          progressColor: "bg-accent-cyan",
          borderColor: "hover:border-accent-cyan/35",
          textHover: "group-hover/item:text-accent-cyan",
          levelColor: "text-accent-cyan"
        };
      case "backend":
        return {
          progressColor: "bg-accent-blue",
          borderColor: "hover:border-accent-blue/35",
          textHover: "group-hover/item:text-accent-blue",
          levelColor: "text-accent-blue"
        };
      case "databases":
        return {
          progressColor: "bg-accent-purple",
          borderColor: "hover:border-accent-purple/35",
          textHover: "group-hover/item:text-accent-purple",
          levelColor: "text-accent-purple"
        };
      case "ai & machine learning":
        return {
          progressColor: "bg-accent-pink",
          borderColor: "hover:border-accent-pink/35",
          textHover: "group-hover/item:text-accent-pink",
          levelColor: "text-accent-pink"
        };
      default:
        return {
          progressColor: "bg-accent-amber",
          borderColor: "hover:border-accent-amber/35",
          textHover: "group-hover/item:text-accent-amber",
          levelColor: "text-accent-amber"
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
    <section id="skills" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">COMPETENCIES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Technical <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Skillset</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioData.skills.map((category, idx) => {
            const styles = getCategoryStyles(category.title);
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, rotateX: 1, rotateY: -1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`frosted-glass p-6 rounded-2xl border border-white/5 ${styles.borderColor} neon-glow-card transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {getCategoryIcon(category.title)}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {category.title.toUpperCase()}
                    </h3>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-5">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="group/item">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm font-medium text-text-secondary ${styles.textHover} transition-colors duration-200`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs font-mono font-medium ${styles.levelColor}`}>
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Bar Track */}
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                            className={`h-full rounded-full ${styles.progressColor}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
