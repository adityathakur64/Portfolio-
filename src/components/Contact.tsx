"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { portfolioData } from "@/config/portfolio";

export default function Contact() {
  const { location, email, github, linkedin } = portfolioData.personal;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate database API submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-widest mb-2">COMMUNICATION</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get In <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Info Details Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Let&apos;s Build Something Intelligent Together
              </h3>
              <p className="text-text-secondary leading-relaxed text-base">
                Have an internship opportunity, a freelance project, or an interesting AI system application to discuss? Fill out the details or send an email directly.
              </p>
              
              <div className="space-y-4 pt-4">
                {/* Location widget */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/8 text-accent-blue">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-text-secondary uppercase tracking-widest">Location</span>
                    <span className="text-sm font-medium text-white">{location}</span>
                  </div>
                </div>

                {/* Email widget */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/8 text-accent-glow">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-text-secondary uppercase tracking-widest">Email</span>
                    <a href={`mailto:${email}`} className="text-sm font-medium text-white hover:text-accent-glow transition-colors duration-200">
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles with hover glows */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <span className="block text-xs text-text-secondary uppercase tracking-widest font-semibold">Connect on Networks</span>
              <div className="flex items-center gap-4">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/3 border border-white/8 text-text-secondary hover:text-white hover:border-accent-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/3 border border-white/8 text-text-secondary hover:text-white hover:border-accent-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form Card Right Column */}
          <div className="lg:col-span-7">
            <div className="frosted-glass-premium rounded-3xl border border-white/5 p-6 sm:p-10 relative overflow-hidden h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-bg-dark/50 border text-white text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all duration-200 ${
                          errors.name ? "border-red-500/50" : "border-white/8"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && <span className="text-xs text-red-400 font-medium">{errors.name}</span>}
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-bg-dark/50 border text-white text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all duration-200 ${
                          errors.email ? "border-red-500/50" : "border-white/8"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <span className="text-xs text-red-400 font-medium">{errors.email}</span>}
                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-bg-dark/50 border text-white text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all duration-200 resize-none ${
                          errors.message ? "border-red-500/50" : "border-white/8"
                        }`}
                        placeholder="Describe your project, ideas, or opportunities..."
                      />
                      {errors.message && <span className="text-xs text-red-400 font-medium">{errors.message}</span>}
                    </div>

                    {/* Submit action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-6"
                  >
                    {/* Glowing outer Ring checkmark */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-[15px] animate-ping" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent-blue bg-accent-blue/10 text-accent-blue">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-1.5">
                        <span>Transmission Success</span>
                        <Sparkles className="w-4 h-4 text-accent-purple" />
                      </h3>
                      <p className="text-sm text-text-secondary max-w-sm">
                        Thank you! Your message has been routed. Aditya will review your transmission and get back to you shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2 text-xs font-semibold rounded-full border border-white/10 hover:border-accent-blue hover:text-accent-blue bg-white/3 hover:bg-accent-blue/5 text-white transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
