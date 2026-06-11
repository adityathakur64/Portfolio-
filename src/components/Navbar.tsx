"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Cpu } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Beyond Coding", href: "#beyond-coding" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-bg-dark/65 backdrop-blur-md border-white/8 shadow-[0_0_20px_rgba(59,130,246,0.08)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo Brand Title */}
          <a href="#" className="flex items-center gap-2 group">
            <Cpu className="w-5 h-5 text-accent-blue group-hover:text-accent-purple transition-colors duration-300 animate-pulse-slow" />
            <span className="font-semibold text-lg tracking-wider text-white group-hover:text-accent-blue transition-colors duration-300 font-sans">
              {portfolioData.personal.name.toUpperCase()}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="px-5 py-2 text-xs font-semibold rounded-full border border-white/10 hover:border-accent-blue hover:text-accent-blue bg-white/5 hover:bg-accent-blue/5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-dark/95 border-b border-white/8 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-white transition-colors duration-200 py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/8 flex items-center gap-6">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 text-xs font-semibold rounded-full border border-white/10 hover:border-accent-blue bg-white/5 hover:bg-accent-blue/5 text-white transition-all duration-300"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
