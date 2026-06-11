"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Activity, ShieldAlert, Heart, ClipboardList, Sparkles } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Projects() {
  
  const getProjectIcon = (title: string, colorClass: string) => {
    switch (title.toLowerCase()) {
      case "credit card fraud detection":
        return <ShieldAlert className={`w-5 h-5 ${colorClass}`} />;
      case "hospital management system":
        return <ClipboardList className={`w-5 h-5 ${colorClass}`} />;
      case "heart failure prediction":
        return <Heart className={`w-5 h-5 ${colorClass}`} />;
      case "restaurant management system":
        return <Activity className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  const getProjectStyles = (title: string) => {
    switch (title.toLowerCase()) {
      case "credit card fraud detection":
        return {
          iconColor: "text-accent-cyan",
          borderColor: "hover:border-accent-cyan/30 hover:shadow-[0_4px_20px_rgba(6,182,212,0.1)]",
          resultBorder: "border-accent-cyan/20 bg-accent-cyan/3",
          badgeBg: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
          tagHover: "hover:text-accent-cyan hover:border-accent-cyan/30"
        };
      case "hospital management system":
        return {
          iconColor: "text-accent-blue",
          borderColor: "hover:border-accent-blue/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]",
          resultBorder: "border-accent-blue/20 bg-accent-blue/3",
          badgeBg: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
          tagHover: "hover:text-accent-blue hover:border-accent-blue/30"
        };
      case "heart failure prediction":
        return {
          iconColor: "text-accent-pink",
          borderColor: "hover:border-accent-pink/30 hover:shadow-[0_4px_20px_rgba(236,72,153,0.1)]",
          resultBorder: "border-accent-pink/20 bg-accent-pink/3",
          badgeBg: "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
          tagHover: "hover:text-accent-pink hover:border-accent-pink/30"
        };
      default:
        return {
          iconColor: "text-accent-amber",
          borderColor: "hover:border-accent-amber/30 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]",
          resultBorder: "border-accent-amber/20 bg-accent-amber/3",
          badgeBg: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
          tagHover: "hover:text-accent-amber hover:border-accent-amber/30"
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  } as const;

  return (
    <section id="projects" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">ENGINEERING PORTFOLIO</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Deployments</span>
          </h2>
          <p className="text-text-secondary mt-2 text-sm sm:text-base max-w-xl">
            A selection of machine learning implementations and scalable web systems built with strong software architecture foundations.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        {/* Projects List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {portfolioData.projects.map((project, idx) => {
            const styles = getProjectStyles(project.title);
            return (
              <motion.div
                key={idx}
                variants={projectVariants}
                whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={`frosted-glass-premium rounded-3xl border border-white/5 ${styles.borderColor} transition-all duration-500 overflow-hidden p-6 md:p-10 group`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Text Context Left Column */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Badge & Title */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        {getProjectIcon(project.title, styles.iconColor)}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Problem Description */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase block opacity-75">THE CHALLENGE</span>
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal">
                        {project.problem}
                      </p>
                    </div>

                    {/* Solution Description */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase block opacity-75">THE IMPLEMENTATION</span>
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal">
                        {project.solution}
                      </p>
                    </div>

                    {/* Links actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 hover:border-accent-cyan bg-white/3 hover:bg-accent-cyan/5 text-xs font-semibold text-white hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code Repository</span>
                      </a>
                      
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 hover:border-accent-purple bg-white/3 hover:bg-accent-purple/5 text-xs font-semibold text-white hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Interactive Demo</span>
                      </a>
                    </div>

                  </div>

                  {/* Metrics & Stack Right Column */}
                  <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l border-white/5">
                    
                    {/* Results Container */}
                    <div className={`p-6 rounded-2xl border ${styles.resultBorder} space-y-2 transition-all duration-300`}>
                      <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase block opacity-75">RESULTS & IMPACT</span>
                      <p className="text-sm font-medium text-white leading-relaxed">
                        {project.results}
                      </p>
                    </div>

                    {/* Tech Stack List */}
                    <div>
                      <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase block mb-3 opacity-75">TECHNOLOGY STACK</span>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1.5 rounded-lg border border-white/5 bg-bg-slate text-xs font-medium text-text-secondary hover:text-white ${styles.tagHover} transition-all duration-200`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

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
