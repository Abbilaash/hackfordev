"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";

// Button Component
const Button = ({ children, onClick, variant = "default", size = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary";
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };
  const sizes = {
    default: "px-4 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export function Hero() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const checkSession = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  const handleRegisterClick = () => {
    if (checkSession()) {
      // User is logged in, go to registration page
      window.location.href = "/register";
    } else {
      // User is not logged in, go to signup first
      window.location.href = "/signup";
    }
    
  };

  const handleViewDomains = () => {
    const element = document.querySelector("#domains");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* === NEW LARGE COLLEGE & CLUB SECTION === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-8 space-y-4 md:space-y-6"
          >
            {/* PSG College of Technology - large */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <img
                src="/assets/psgtechlogo.jpeg"
                alt="PSG Logo"
                className="h-14 md:h-20 lg:h-24 w-auto object-contain"
              />
              <h2 className="text-1xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                PSG College of Technology
              </h2>
              <img
                src="/assets/75.jpeg"
                alt="PSG Logo"
                className="h-14 md:h-20 lg:h-24 w-auto object-contain"
              />
               <img
                src="/assets/100.jpeg"
                alt="PSG Logo"
                className="h-14 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* Coding Club - large */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <img
                src="/assets/codingclub.jpeg" // ← replace with actual path/URL to your Coding Club logo
                alt="Coding Club Logo"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              />
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                Coding Club
              </h3>
            </div>
          </motion.div>

          {/* Original small badge – kept unchanged, now below the large text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-10 border border-primary/20"
          >
            <Code2 className="w-4 h-4" />
            National-Level Hackathon
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight"
          >
            AI-Enabled Transformative Technologies for{" "}
            <span className="text-primary">Global Development</span>
          </motion.h1>

          {/* Short Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-accent mb-6"
          >
            AI4Dev '26
          </motion.div>

          {/* Presented By */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground mb-12"
          >
           
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleRegisterClick}
              size="lg"
              className="group"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={handleViewDomains}
              variant="outline"
              size="lg"
            >
              View Problem Domains
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats/Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Prize Pool", value: "₹60,000" },
            { label: "Event Date", value: "Mar 28, 2026" },
            { label: "Duration", value: "8 HOURS" },
            { label: "Mode", value: "Offline" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-muted backdrop-blur-sm border border-border/50 shadow-sm"
            >
              <p className="  text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-lg  mt-1 text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
