"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
          if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.4)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 90);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw particle-to-particle links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        // Draw links to mouse spotlight coordinates
        if (mouse.x > 0 && mouse.y > 0) {
          // Adjust mouse coordinates relative to viewport scroll state
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.18 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, mouse]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-bg-dark">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      {/* Floating lighting blobs */}
      <div className="absolute -top-[25%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-accent-blue/8 blur-[130px] animate-pulse-slow pointer-events-none" />
      <div className="absolute -bottom-[25%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent-purple/8 blur-[140px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent-glow/4 blur-[110px] animate-float pointer-events-none" />

      {/* Mouse spotlight tracker overlay */}
      <div
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-60 transition-opacity duration-300 hidden md:block"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, rgba(139, 92, 246, 0.02) 55%, transparent 75%)`,
        }}
      />

      {/* Active connections canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
