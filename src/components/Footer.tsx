"use client";
import React from "react";
import { Github, Linkedin, Mail, Cpu } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { name, github, linkedin, email } = portfolioData.personal;

  return (
    <footer className="relative py-12 border-t border-white/5 bg-bg-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 group">
            <Cpu className="w-4 h-4 text-accent-blue group-hover:text-accent-purple transition-colors duration-300" />
            <span className="text-sm font-semibold tracking-wider text-white">
              {name.toUpperCase()}
            </span>
          </div>

          {/* Core signature credits */}
          <div className="text-center">
            <span className="text-xs text-text-secondary">
              Designed & Developed by <span className="text-white font-medium hover:text-accent-blue transition-colors duration-200">{name}</span>
            </span>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            {/* Icons */}
            <div className="flex items-center gap-4">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:text-accent-blue transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:text-accent-purple transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="text-text-secondary hover:text-white hover:text-accent-glow transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            {/* Copyright tag */}
            <span className="text-[10px] text-text-secondary/60 tracking-wider">
              &copy; {currentYear} {name}. All rights reserved.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
