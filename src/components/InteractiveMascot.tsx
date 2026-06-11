"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Send, Sparkles, HelpCircle, Terminal, Database, Brain, Layers } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/config/portfolio";

export default function InteractiveMascot() {
  const { name } = portfolioData.personal;

  // Floating technology badges
  const floatingBadges = [
    { text: "Python", icon: <Terminal className="w-3.5 h-3.5 text-yellow-400" />, x: "-10%", y: "10%", delay: 0 },
    { text: "React", icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />, x: "110%", y: "15%", delay: 0.5 },
    { text: "Next.js", icon: <Layers className="w-3.5 h-3.5 text-white" />, x: "-15%", y: "65%", delay: 1 },
    { text: "Supabase", icon: <Database className="w-3.5 h-3.5 text-emerald-400" />, x: "105%", y: "70%", delay: 1.5 },
    { text: "PostgreSQL", icon: <Database className="w-3.5 h-3.5 text-blue-400" />, x: "40%", y: "-12%", delay: 2 },
    { text: "ML", icon: <Brain className="w-3.5 h-3.5 text-purple-400" />, x: "45%", y: "105%", delay: 2.5 }
  ];

  // Mascot interactive state
  const [speechText, setSpeechText] = useState(
    `Hi there! 👋 I am Aditya's digital mascot. Click a quick question below, or type your own, and I'll tell you all about him!`
  );
  const [displayedText, setDisplayedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Muted by default for good UX
  const [userQuery, setUserQuery] = useState("");

  // Custom mouth positioning states
  const [mouthPos, setMouthPos] = useState({ top: 57, left: 50, width: 12, height: 4 });
  const [isDevMode, setIsDevMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen resize for mobile docking fallback
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync state with FloatingMascot via CustomEvent
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mascot-state-change", {
          detail: { speechText, displayedText, isSpeaking },
        })
      );
    }
  }, [speechText, displayedText, isSpeaking]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const hasDevParam = window.location.search.includes("dev=true");
      setIsDevMode(isLocal || hasDevParam);
    }
  }, []);

  // References for Speech Synthesis
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Typewriter effect logic
  useEffect(() => {
    setDisplayedText("");
    let currentText = "";
    let index = 0;
    const textToType = speechText;
    
    const interval = setInterval(() => {
      if (index < textToType.length) {
        currentText += textToType.charAt(index);
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15); // Fast typing speed for readability

    return () => clearInterval(interval);
  }, [speechText]);

  // Handle TTS (Text to Speech)
  const speakText = (textToSpeak: string) => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    if (!synth) return;

    // Stop current speaking
    synth.cancel();
    setIsSpeaking(false);

    if (isMuted) return;

    // Clean text of emojis for cleaner TTS readout
    const cleanText = textToSpeak.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Pick an English voice if available
    const voices = synth.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en-") && v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en-"));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 1.05; // Slightly faster, engaging pace
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synth.speak(utterance);
  };

  // Toggle mute state
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } else {
      // Speak the current typing text if unmuting
      speakText(speechText);
    }
  };

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Pre-coded responses mapped to keywords or buttons
  const responses = {
    hello: `Hello! I'm Aditya's AI Assistant. Aditya is a 3rd Year B.Tech Computer Science student specializing in AI at Shoolini University. He loves coding and building smart apps!`,
    skills: `Aditya is skilled in React, Next.js, and Tailwind CSS on the frontend. For the backend, he uses Python, Flask, and PostgreSQL or Supabase. He also builds Machine Learning models using TensorFlow and Scikit-Learn!`,
    projects: `He has completed several great projects, including a Credit Card Fraud Detection system (99.2% recall), a Next.js Hospital Management Portal, and a Heart Failure Risk predictor using TensorFlow!`,
    contact: `You can reach Aditya by scrolling down to the contact form, emailing him directly at adityathakur1637@gmail.com, or messaging him on LinkedIn and GitHub!`,
    joke: `Why do programmers wear glasses? Because they can't C#! ...Haha! Ask me another question if you'd like!`,
    hobbies: `Aditya lives in Himachal Pradesh, so he loves exploring mountain roads, long bike rides, brewing strong coffee, and looping synthwave or techno tracks while coding!`,
    resume: `You can download Aditya's official resume PDF by clicking the 'Resume PDF' button right next to the 'View Work' button in the Hero section!`,
    education: `Aditya is pursuing a Bachelor of Technology in Computer Science Engineering (AI) at Shoolini University. He is currently in his 3rd year and holds a solid 8.5 CGPA.`,
    location: `Aditya is based in Nalagarh, Solan, Himachal Pradesh, India. It's a gorgeous region surrounded by scenic mountains!`,
    fallback: `That's a good question! While I don't know the exact answer, you can find it by reading his portfolio below, or by contacting Aditya directly at adityathakur1637@gmail.com!`
  };

  // Handle predefined option clicks
  const handleOptionClick = (key: keyof typeof responses) => {
    const text = responses[key];
    setSpeechText(text);
    speakText(text);
  };

  // Process custom text questions
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.toLowerCase().trim();
    let responseText = responses.fallback;

    if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("greet")) {
      responseText = responses.hello;
    } else if (query.includes("skill") || query.includes("languages") || query.includes("framework") || query.includes("frontend") || query.includes("backend") || query.includes("stack") || query.includes("database") || query.includes("tech")) {
      responseText = responses.skills;
    } else if (query.includes("project") || query.includes("work") || query.includes("build") || query.includes("make") || query.includes("app")) {
      responseText = responses.projects;
    } else if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("mail") || query.includes("message") || query.includes("phone")) {
      responseText = responses.contact;
    } else if (query.includes("joke") || query.includes("funny") || query.includes("laugh")) {
      // Pick random joke from array
      const jokesList = [
        `Why do programmers prefer dark mode? Because light attracts bugs!`,
        `How many programmers does it take to change a light bulb? None, that's a hardware problem!`,
        `Why do programmers wear glasses? Because they can't C#!`,
        `There are 10 types of people in this world: those who understand binary, and those who don't!`,
        `What is a programmer's favorite hangout place? Foo Bar!`
      ];
      const randomIndex = Math.floor(Math.random() * jokesList.length);
      responseText = jokesList[randomIndex];
    } else if (query.includes("hobby") || query.includes("hobbies") || query.includes("free time") || query.includes("fun") || query.includes("bike") || query.includes("coffee") || query.includes("music")) {
      responseText = responses.hobbies;
    } else if (query.includes("resume") || query.includes("cv") || query.includes("bio") || query.includes("profile")) {
      responseText = responses.resume;
    } else if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("study") || query.includes("gpa") || query.includes("degree")) {
      responseText = responses.education;
    } else if (query.includes("location") || query.includes("live") || query.includes("where") || query.includes("himachal") || query.includes("india")) {
      responseText = responses.location;
    }

    setSpeechText(responseText);
    speakText(responseText);
    setUserQuery("");
  };

  // Predefined prompt options list
  const promptOptions = [
    { label: "👋 Say Hello", key: "hello" as const },
    { label: "⚡ Top Skills", key: "skills" as const },
    { label: "💻 Core Projects", key: "projects" as const },
    { label: "🤖 Tell a Joke", key: "joke" as const },
    { label: "✉️ How to Connect?", key: "contact" as const }
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
      
      {/* Speech Wave Custom CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveBounce {
          0%, 100% { height: 4px; }
          50% { height: 22px; }
        }
        .wave-bar {
          animation: waveBounce 0.8s ease-in-out infinite;
          width: 3px;
          border-radius: 2px;
        }
      `}} />

      <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl group">
        
        {/* Dialogue Bubble Popup */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-80 sm:w-[380px] p-4 rounded-2xl frosted-glass-premium border border-accent-cyan/20 shadow-2xl z-30 pointer-events-auto"
          >
            {/* Dialogue Arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-bg-slate/90 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]" />
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-semibold tracking-wider text-accent-cyan flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent-cyan animate-pulse" />
                  MASCOT AI ASSISTANT
                </span>
                
                {/* Audio Status & Mute Control */}
                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 hover:bg-accent-cyan/10 border border-white/8 hover:border-accent-cyan/45 text-text-secondary hover:text-white transition-all cursor-pointer"
                  title={isMuted ? "Unmute Voice narration" : "Mute Voice narration"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-accent-cyan animate-bounce" />
                  )}
                </button>
              </div>

              {/* Typed speech content */}
              <div className="text-xs text-text-primary leading-relaxed font-mono min-h-[56px]">
                {displayedText}
                {displayedText.length < speechText.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-accent-cyan ml-0.5 animate-pulse" />
                )}
              </div>

              {/* Speaking Visualizer Wave */}
              {isSpeaking && (
                <div className="flex items-center gap-0.5 justify-end h-5 pt-1 pr-1">
                  <span className="wave-bar bg-accent-cyan" style={{ animationDelay: "0.1s" }} />
                  <span className="wave-bar bg-accent-blue" style={{ animationDelay: "0.2s" }} />
                  <span className="wave-bar bg-accent-purple" style={{ animationDelay: "0.3s" }} />
                  <span className="wave-bar bg-accent-glow" style={{ animationDelay: "0.4s" }} />
                  <span className="wave-bar bg-accent-pink" style={{ animationDelay: "0.5s" }} />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dotted HUD Rings around mascot */}
        <div className="absolute inset-[-15px] rounded-3xl border border-dashed border-accent-cyan/15 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-[-30px] rounded-3xl border border-dotted border-accent-purple/10 animate-spin-reverse pointer-events-none" />

        {/* Softened Ambient Light Backlights */}
        <div className="absolute inset-4 rounded-3xl bg-accent-blue/8 blur-[30px] opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-10 rounded-3xl bg-accent-purple/6 blur-[40px] opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

        {/* Handcrafted Rounded-3xl Card IDE Panel */}
        <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-tr from-white/5 via-white/2 to-white/5 border border-white/5 overflow-hidden shadow-xl hover:border-white/10 transition-colors duration-300">
          <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-bg-slate/30 flex items-center justify-center">
            
            {/* Blinking Mask Simulation Layer - subtle glow flash */}
            <motion.div
              animate={{
                opacity: [0, 0, 0.15, 0, 0, 0, 0.15, 0, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-accent-cyan/10 pointer-events-none mix-blend-screen"
            />

            {isMobile ? (
              /* Inline Mascot for Mobile (maintaining original visual layout) */
              <motion.div
                animate={
                  isSpeaking
                    ? {
                        y: [0, -12, 0, -6, 0],
                        rotate: [0, 1.5, -1, 1, 0],
                        scale: [1, 1.02, 0.99, 1.01, 1]
                      }
                    : {
                        y: [0, -8, 0],
                        rotate: [0, 0.5, 0, -0.5, 0]
                      }
                }
                transition={
                  isSpeaking
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                }
                className="relative w-full h-full flex items-end justify-center"
              >
                <Image
                  src="/developer_mascot.png"
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, 384px"
                  className="object-contain object-bottom p-4 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                />

                {(isSpeaking || isDevMode) && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: `${mouthPos.top}%`,
                      left: `${mouthPos.left}%`,
                      width: `${mouthPos.width}px`,
                      height: `${mouthPos.height}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={
                      isSpeaking
                        ? {
                            height: [
                              `${mouthPos.height}px`,
                              `${mouthPos.height * 2.8}px`,
                              `${mouthPos.height}px`,
                              `${mouthPos.height * 3.6}px`,
                              `${mouthPos.height}px`
                            ],
                            borderRadius: ["50% 50% 50% 50%", "30% 30% 70% 70%", "50% 50% 50% 50%"]
                          }
                        : {}
                    }
                    transition={
                      isSpeaking
                        ? {
                            duration: 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        : {}
                    }
                    className="bg-bg-dark border border-accent-cyan rounded-full z-10 shadow-[0_0_6px_rgba(6,182,212,0.8)]"
                  />
                )}
              </motion.div>
            ) : (
              /* Holographic Docking Port for Desktop Mascot */
              <div 
                id="mascot-dock" 
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                {/* Holographic Projection Pad */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Rotating Cyber Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute w-40 h-40 border border-accent-cyan/15 rounded-full border-dashed"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 border border-accent-purple/15 rounded-full border-dotted"
                  />
                  
                  {/* Pulsing Core Sphere */}
                  <motion.div
                    animate={{
                      scale: [1, 1.12, 1],
                      opacity: [0.3, 0.6, 0.3],
                      boxShadow: [
                        "0 0 15px rgba(6, 182, 212, 0.2)",
                        "0 0 25px rgba(6, 182, 212, 0.4)",
                        "0 0 15px rgba(6, 182, 212, 0.2)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full bg-accent-cyan/5 border border-accent-cyan/30 flex items-center justify-center backdrop-blur-[2px]"
                  >
                    <Sparkles className="w-5 h-5 text-accent-cyan/60 animate-pulse" />
                  </motion.div>
                  
                  {/* Vertical light projector beams */}
                  <div 
                    className="absolute bottom-0 w-32 h-20 opacity-30 pointer-events-none" 
                    style={{
                      background: "linear-gradient(to top, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0) 80%)",
                      clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
                    }}
                  />
                </div>

                {/* Status Indicator */}
                <motion.div 
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-cyan/10 bg-accent-cyan/5 text-[9px] font-mono tracking-widest text-accent-cyan"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/75 animate-ping" />
                  <span>COMPANION DOCKED</span>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Tech Badges */}
        {floatingBadges.map((badge, idx) => (
          <motion.div
            key={idx}
            style={{ left: badge.x, top: badge.y }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: badge.delay,
            }}
            className="absolute z-20 px-3 py-1.5 rounded-full border border-white/5 bg-bg-dark/75 backdrop-blur-md text-white font-medium text-xs shadow-md flex items-center gap-1.5 pointer-events-auto hover:border-accent-cyan transition-colors duration-200"
          >
            {badge.icon}
            <span>{badge.text}</span>
          </motion.div>
        ))}

      </div>

      {/* Predefined prompts chips grid */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm sm:max-w-md pt-2">
        {promptOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleOptionClick(opt.key)}
            className="px-3 py-1.5 rounded-full border border-white/5 hover:border-accent-cyan/40 bg-bg-slate/40 hover:bg-accent-cyan/5 text-text-secondary hover:text-white font-medium text-xs shadow-sm flex items-center gap-1 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Text Chat Box Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
        <div className="relative flex items-center rounded-xl bg-bg-slate/50 border border-white/8 hover:border-accent-cyan/35 transition-colors focus-within:border-accent-cyan focus-within:ring-1 focus-within:ring-accent-cyan/50 p-1">
          <HelpCircle className="w-4 h-4 text-text-secondary ml-3.5 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask mascot about Aditya..."
            className="w-full bg-transparent border-none py-2 px-1 text-xs text-white placeholder-text-secondary/60 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center p-2 rounded-lg bg-accent-blue/15 hover:bg-accent-cyan/20 text-accent-glow hover:text-white border border-accent-blue/25 hover:border-accent-cyan/45 transition-all cursor-pointer ml-1"
            aria-label="Send Query"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Dev Mode Positioning Sliders */}
      {isDevMode && (
        <div className="w-full max-w-sm p-4 rounded-2xl border border-dashed border-accent-purple/35 bg-bg-slate/60 text-left space-y-3">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[10px] font-bold text-accent-purple tracking-widest uppercase">
              ⚙️ Mascot Mouth Calibration (Dev Only)
            </span>
            <span className="text-[10px] text-text-secondary font-mono">
              T: {mouthPos.top}% | L: {mouthPos.left}% | W: {mouthPos.width}px
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-[10px] font-medium text-text-secondary">
            <div className="space-y-1">
              <label className="block">Top ({mouthPos.top}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={mouthPos.top}
                onChange={(e) => setMouthPos({ ...mouthPos, top: Number(e.target.value) })}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
              />
            </div>
            <div className="space-y-1">
              <label className="block">Left ({mouthPos.left}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={mouthPos.left}
                onChange={(e) => setMouthPos({ ...mouthPos, left: Number(e.target.value) })}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
              />
            </div>
            <div className="space-y-1">
              <label className="block">Width ({mouthPos.width}px)</label>
              <input
                type="range"
                min="2"
                max="50"
                value={mouthPos.width}
                onChange={(e) => setMouthPos({ ...mouthPos, width: Number(e.target.value) })}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
              />
            </div>
            <div className="space-y-1">
              <label className="block">Height ({mouthPos.height}px)</label>
              <input
                type="range"
                min="1"
                max="30"
                value={mouthPos.height}
                onChange={(e) => setMouthPos({ ...mouthPos, height: Number(e.target.value) })}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-purple"
              />
            </div>
          </div>
          <p className="text-[9px] text-text-secondary/60 leading-normal border-t border-white/5 pt-1.5 font-mono">
            Drag sliders to align the cyan oval mouth overlay over your mascot. Once aligned, update the default values in <code className="text-accent-cyan">InteractiveMascot.tsx</code> line 25!
          </p>
        </div>
      )}

    </div>
  );
}
