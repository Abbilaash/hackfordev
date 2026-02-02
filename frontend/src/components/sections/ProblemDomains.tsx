"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Building2,
  Zap,
  HeartPulse,
  Sprout,
  GraduationCap,
  ShoppingBag,
  Film,
  Wrench,
  Shield,
} from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

const domains = [
  {
    icon: Leaf,
    title: "Sustainable Development and Climate Action",
    description:
      "AI solutions for environmental conservation, carbon footprint reduction, and climate change mitigation.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Building2,
    title: "Smart Cities and Urban Innovation",
    description:
      "Intelligent systems for urban planning, traffic management, and smart infrastructure.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Clean Energy and Environmental Monitoring",
    description:
      "AI-powered solutions for renewable energy optimization and environmental tracking.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: HeartPulse,
    title: "Healthcare and Life Sciences",
    description:
      "Innovative AI applications in medical diagnosis, drug discovery, and healthcare delivery.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Sprout,
    title: "Agriculture and Rural Innovation",
    description:
      "Smart farming solutions, crop monitoring, and agricultural automation using AI.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: GraduationCap,
    title: "Education Technology and Learning Platforms",
    description:
      "AI-driven personalized learning, skill assessment, and educational accessibility.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce and Digital Ecosystems",
    description:
      "Intelligent recommendations, supply chain optimization, and digital marketplace solutions.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Film,
    title: "Media, Entertainment, and Digital Experiences",
    description:
      "AI applications in content creation, personalization, and immersive digital experiences.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Wrench,
    title: "Developer Productivity and Intelligent Automation",
    description:
      "Tools and frameworks to enhance developer efficiency and automate software development.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Responsible AI and Resource Optimization",
    description:
      "Fair, transparent AI systems with efficient resource utilization and ethical considerations.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export function ProblemDomains() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="domains" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Problem Domains
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from diverse domains to build innovative AI solutions addressing
            real-world challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                hover
                className="p-6 h-full group cursor-pointer relative overflow-hidden"
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110",
                      domain.bgColor,
                      domain.color
                    )}
                  >
                    <domain.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {domain.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                {/* <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    
                  </div>
                </div> */}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

