"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Terminal } from "lucide-react";
import { portfolioData } from "@/config/portfolio";
import dynamic from "next/dynamic";
const InteractiveMascot = dynamic(() => import("@/components/InteractiveMascot"), {
  ssr: false,
});

export default function Hero() {
  const { name, title, tagline, brandPositioning, resumeUrl } = portfolioData.personal;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
            
            {/* Title / Intro Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-accent-blue/15 bg-accent-blue/5 text-accent-blue font-semibold text-xs tracking-wider"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>AI ENGINEER & FULL STACK DEVELOPER</span>
            </motion.div>

            {/* Developer Name & Subtitle */}
            <div className="space-y-2.5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans"
              >
                I am <span className="bg-gradient-to-r from-accent-blue via-accent-glow to-accent-purple bg-clip-text text-transparent">{name}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl font-medium text-accent-glow tracking-wide"
              >
                {title}
              </motion.p>
            </div>

            {/* Core Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight border-l-2 border-accent-purple/50 pl-4"
            >
              {tagline}
            </motion.h2>

            {/* Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl"
            >
              {brandPositioning}
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-accent-blue via-accent-blue to-accent-purple hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all duration-300"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href={resumeUrl}
                download
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-white/8 hover:border-accent-cyan bg-white/3 hover:bg-accent-cyan/5 text-white hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Resume PDF</span>
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-text-secondary hover:text-white hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </motion.div>

          </div>

          {/* Hero Image / Badge Showcase Right */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0">
            <InteractiveMascot />
          </div>

        </div>
      </div>
      
      {/* Scroll indicator chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] tracking-widest text-text-secondary">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-6 rounded-full bg-gradient-to-b from-accent-blue to-transparent"
        />
      </div>
    </section>
  );
}
