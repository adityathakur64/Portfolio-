import React from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Timeline from "@/components/Timeline";
import BeyondCoding from "@/components/BeyondCoding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-accent-blue/30 selection:text-white">
      {/* Dynamic particles background canvas */}
      <Background />

      {/* Glassmorphic static header navigation */}
      <Navbar />

      {/* Central website container */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sections */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Timeline />
        <BeyondCoding />
        <Contact />
      </main>

      {/* Footer credits and connections */}
      <Footer />
    </div>
  );
}
