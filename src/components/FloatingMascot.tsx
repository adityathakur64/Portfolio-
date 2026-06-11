"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingMascot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseOnScreen, setIsMouseOnScreen] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Shared state from InteractiveMascot.tsx via CustomEvents
  const [mascotState, setMascotState] = useState({
    speechText: "",
    displayedText: "",
    isSpeaking: false,
  });

  // Framer Motion coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 140, mass: 0.9 };
  const posX = useSpring(mouseX, springConfig);
  const posY = useSpring(mouseY, springConfig);

  // Dynamic animations driven by render frame loop
  const [faceOffset, setFaceOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [breath, setBreath] = useState(0);

  // Helper to compute dock position (center of #mascot-dock, or fallback to bottom-right)
  const getDockCoords = () => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const dock = document.getElementById("mascot-dock");
    if (dock) {
      const rect = dock.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    // Fallback: safe position in bottom right
    return {
      x: window.innerWidth - 85,
      y: window.innerHeight - 130,
    };
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    // Check device type
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Update coordinates
    const updateDock = () => {
      setDockPos(getDockCoords());
    };
    updateDock();
    window.addEventListener("scroll", updateDock, { passive: true });
    window.addEventListener("resize", updateDock);

    // Initialize position at dock
    const initialDock = getDockCoords();
    mouseX.set(initialDock.x);
    mouseY.set(initialDock.y);

    // Global cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      setHasMoved(true);
      setIsMouseOnScreen(true);

      // Offset so the companion floats beside/behind the cursor
      // Default to 45px right, 45px down
      let offsetX = 45;
      let offsetY = 45;

      // Adjust offset if near the viewport boundaries
      if (e.clientX + 100 > window.innerWidth) {
        offsetX = -100;
      }
      if (e.clientY + 100 > window.innerHeight) {
        offsetY = -100;
      }

      mouseX.set(e.clientX + offsetX);
      mouseY.set(e.clientY + offsetY);
    };

    const handleMouseLeave = () => {
      setIsMouseOnScreen(false);
    };

    const handleMouseEnter = () => {
      setIsMouseOnScreen(true);
    };

    // Global hover event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        "button, a, input, textarea, select, [role='button'], .neon-glow-card, .frosted-glass, .navbar-item"
      );

      if (interactiveEl) {
        setIsHoveringInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const relatedTarget = e.relatedTarget as HTMLElement;
      const leavingInteractive = target.closest(
        "button, a, input, textarea, select, [role='button'], .neon-glow-card, .frosted-glass"
      );
      const enteringInteractive = relatedTarget
        ? relatedTarget.closest(
            "button, a, input, textarea, select, [role='button'], .neon-glow-card, .frosted-glass"
          )
        : null;

      if (leavingInteractive && !enteringInteractive) {
        setIsHoveringInteractive(false);
      }
    };

    // Shared state listener from Hero dashboard
    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setMascotState(customEvent.detail);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mascot-state-change", handleStateChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", updateDock);
      window.removeEventListener("resize", updateDock);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mascot-state-change", handleStateChange);
    };
  }, [mouseX, mouseY]);

  // Sync to dock if mouse is off screen or has not moved yet
  useEffect(() => {
    if (!isMouseOnScreen || !hasMoved) {
      mouseX.set(dockPos.x);
      mouseY.set(dockPos.y);
    }
  }, [isMouseOnScreen, hasMoved, dockPos, mouseX, mouseY]);

  // 60FPS animation loop for natural breathing and tilt lag calculations
  useAnimationFrame((time) => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const px = posX.get();
    const py = posY.get();

    const dx = mx - px;
    const dy = my - py;
    const dist = Math.hypot(dx, dy);

    // 1. Look-at offset (how much eyes/face shift inside the helmet)
    if (dist > 5) {
      setFaceOffset({
        x: (dx / dist) * 4.5,
        y: (dy / dist) * 3.5,
      });
      // 2. Leaning tilt (leans into flight direction)
      const targetTilt = Math.max(-10, Math.min(10, dx * 0.06));
      setTilt((prev) => prev + (targetTilt - prev) * 0.08); // smooth LERP
    } else {
      setFaceOffset({ x: 0, y: 0 });
      setTilt((prev) => prev + (0 - prev) * 0.08);
    }

    // 3. Natural breathing cycle (sinusoidal)
    const cycle = Math.sin(time / 300) * 2.5;
    setBreath(cycle);
  });

  // Render check: Don't render on SSR, mobile, or if docked
  if (!isMounted || isMobile) return null;

  // Check if docked (stationary and centered at dockPos)
  const isDocked = !isMouseOnScreen && Math.abs(posX.get() - dockPos.x) < 5 && Math.abs(posY.get() - dockPos.y) < 5;

  return (
    <motion.div
      style={{
        x: posX,
        y: posY,
        left: 0,
        top: 0,
      }}
      className="fixed z-50 pointer-events-none select-none flex items-center justify-center w-20 h-20 -ml-10 -mt-10 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
      animate={{
        scale: isDocked ? 0.9 : 1,
        opacity: isDocked ? 0.5 : 1,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Speech dialogue bubble */}
      <AnimatePresence>
        {mascotState.displayedText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-2xl frosted-glass-premium border border-accent-cyan/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-[11px] font-mono text-white leading-relaxed pointer-events-auto"
          >
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-bg-slate/90" />
            <div className="flex items-center gap-1 border-b border-white/5 pb-1 mb-1 text-[9px] font-semibold tracking-wider text-accent-cyan">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-accent-cyan" />
              <span>AIDI COMPANION</span>
            </div>
            <div className="max-h-24 overflow-y-auto pr-1">
              {mascotState.displayedText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Soft Glow */}
      <motion.div
        animate={
          mascotState.isSpeaking
            ? { scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }
            : isHoveringInteractive
            ? { scale: 1.15, opacity: 0.25 }
            : { scale: 1, opacity: 0.15 }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 bg-gradient-to-r from-accent-cyan to-accent-blue blur-xl rounded-full"
      />

      {/* SVG Droid Body */}
      <motion.svg
        width="76"
        height="76"
        viewBox="0 0 64 64"
        fill="none"
        style={{ rotate: tilt }}
        className="overflow-visible"
      >
        {/* Floating Left Hand */}
        <motion.circle
          cx="10"
          cy={38 + breath * 0.4}
          r="3"
          fill="url(#handGlow)"
          className="filter drop-shadow-[0_0_2px_var(--color-accent-cyan)]"
          animate={
            isHoveringInteractive
              ? { x: [0, -3, 0], y: [0, -6, 0] }
              : mascotState.isSpeaking
              ? { y: [0, -4, 0] }
              : {}
          }
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Floating Right Hand (performs gestures) */}
        <motion.g
          animate={
            isHoveringInteractive
              ? { x: 3, y: -8, rotate: [0, -15, 0, -15, 0] }
              : mascotState.isSpeaking
              ? { y: [0, -3, 0] }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Wave/Point arm */}
          {isHoveringInteractive ? (
            <path
              d="M52,38 C54,34 56,32 58,32"
              stroke="var(--color-accent-cyan)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : null}
          <circle
            cx="54"
            cy={38 + breath * 0.4}
            r="3"
            fill="url(#handGlow)"
            className="filter drop-shadow-[0_0_2px_var(--color-accent-cyan)]"
          />
        </motion.g>

        {/* Jet Thruster Flame */}
        <motion.path
          d="M26,46 L32,56 L38,46 Z"
          fill="url(#thrusterGlow)"
          animate={{
            scaleY: [1, 1.35, 0.9, 1.2, 1],
            scaleX: [1, 0.9, 1.1, 0.95, 1],
            opacity: [0.7, 0.95, 0.75, 0.9, 0.7],
          }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          style={{ originX: 0.5, originY: 0 }}
        />

        {/* Robot Main Body / Torso */}
        <motion.g style={{ y: breath * 0.5 }}>
          {/* Metallic shoulders */}
          <rect x="22" y="36" width="20" height="8" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          
          {/* Torso Chest */}
          <path d="M24,39 L40,39 L37,47 L27,47 Z" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          
          {/* glowing chest plate core */}
          <motion.circle
            cx="32"
            cy="43"
            r="3.5"
            fill="var(--color-accent-cyan)"
            className="filter drop-shadow-[0_0_3px_var(--color-accent-cyan)]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Robot Floating Head */}
        <motion.g style={{ x: faceOffset.x, y: faceOffset.y + breath }}>
          {/* Neck magnetic spacer */}
          <ellipse cx="32" cy="34" rx="4" ry="1.5" fill="#475569" opacity="0.6" />

          {/* Head Body */}
          <rect
            x="16"
            y="14"
            width="32"
            height="22"
            rx="10"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Helmet Glass Visor */}
          <rect
            x="19"
            y="17"
            width="26"
            height="15"
            rx="6"
            fill="#090d16"
            stroke="var(--color-accent-purple)"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_2px_var(--color-accent-purple)]"
          />

          {/* Screen Visor Inner Display */}
          <g clipPath="url(#visorClip)">
            {/* LED EYES */}
            {isHoveringInteractive ? (
              // Excited/Happy eyes when hovering interactive items
              <g>
                <path
                  d="M 21 26 Q 24.5 21 28 26"
                  stroke="var(--color-accent-cyan)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 36 26 Q 39.5 21 43 26"
                  stroke="var(--color-accent-cyan)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            ) : mascotState.isSpeaking ? (
              // Speaking LED sound wave pulses
              <g>
                <motion.rect
                  x="23"
                  y="20"
                  width="3"
                  height="10"
                  rx="1.5"
                  fill="var(--color-accent-cyan)"
                  animate={{ height: [6, 12, 4, 10, 6], y: [22, 19, 23, 20, 22] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <motion.rect
                  x="38"
                  y="20"
                  width="3"
                  height="10"
                  rx="1.5"
                  fill="var(--color-accent-cyan)"
                  animate={{ height: [10, 4, 12, 6, 10], y: [20, 23, 19, 22, 20] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </g>
            ) : (
              // Idle looking eyes that follow cursor slightly
              <g>
                {/* Left Eye */}
                <motion.rect
                  x="23"
                  y="22"
                  width="4.5"
                  height="5.5"
                  rx="2"
                  fill="var(--color-accent-cyan)"
                  className="filter drop-shadow-[0_0_2px_var(--color-accent-cyan)]"
                  animate={{ scaleY: [1, 1, 0, 1, 1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originY: 0.5 }}
                />
                {/* Right Eye */}
                <motion.rect
                  x="36.5"
                  y="22"
                  width="4.5"
                  height="5.5"
                  rx="2"
                  fill="var(--color-accent-cyan)"
                  className="filter drop-shadow-[0_0_2px_var(--color-accent-cyan)]"
                  animate={{ scaleY: [1, 1, 0, 1, 1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originY: 0.5 }}
                />
              </g>
            )}

            {/* Glowing sound wave mouth when speaking */}
            {mascotState.isSpeaking && (
              <motion.path
                d="M 28 29 Q 32 32 36 29"
                stroke="var(--color-accent-cyan)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{ strokeWidth: [1, 2.5, 1], y: [0, 0.5, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            )}
          </g>

          {/* Antennas & Glowing Receiver */}
          <path d="M32,14 L32,8" stroke="#475569" strokeWidth="1.5" />
          <circle
            cx="32"
            cy="7"
            r="1.8"
            fill="var(--color-accent-purple)"
            className="filter drop-shadow-[0_0_3px_var(--color-accent-purple)] animate-pulse"
          />
        </motion.g>

        {/* Visor clipping mask */}
        <defs>
          <clipPath id="visorClip">
            <rect x="20" y="18" width="24" height="13" rx="5" />
          </clipPath>
          
          <radialGradient id="handGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" />
            <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity="0.4" />
          </radialGradient>

          <linearGradient id="thrusterGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.9" />
            <stop offset="40%" stopColor="var(--color-accent-blue)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-accent-purple)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}
