"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function EventOverview() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="overview"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Event Overview
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            About the Hackathon
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The National-Level Hackathon titled "AI-Enabled Transformative
              Technologies for Global Development" aims to encourage innovative,
              AI-driven solutions addressing real-world challenges that contribute
              to sustainable, inclusive, and technology-driven global
              development. The event provides a collaborative platform for
              students and researchers across India to ideate, develop, and
              demonstrate impactful AI-based solutions.
            </p>
          </div>
        </motion.div>

        {/* Stats/Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: "🎯",
              title: "National Level",
              description:
                "Pan-India participation from colleges and universities",
            },
            {
              icon: "🤝",
              title: "Collaboration",
              description:
                "Team-based innovation with 2-3 members per team",
            },
            {
              icon: "🚀",
              title: "Innovation",
              description:
                "Build AI solutions with TRL 3+ ",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

