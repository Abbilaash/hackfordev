"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { UserPlus, Target, Lightbulb, Upload, CheckCircle, Building } from "lucide-react";

const registrationSteps = [
  {
    icon: UserPlus,
    title: "Team Registration",
    description: "Register your team through the official AI4Dev '26 hackathon website",
  },
  {
    icon: Target,
    title: "Select Domain",
    description: "Choose your problem domain and finalize your project title",
  },
  {
    icon: Lightbulb,
    title: "Develop PoC",
    description: "Build your working Proof of Concept (TRL ≥ 3)",
  },
  {
    icon: Upload,
    title: "Upload Submissions",
    description: "Upload PPT, GitHub link, and demo video URL on the website",
  },
  {
    icon: CheckCircle,
    title: "Evaluation",
    description: "Undergo evaluation and await shortlisting for the final round",
  },
  {
    icon: Building,
    title: "Final Round",
    description: "Participate in the offline final round at the venue",
  },
];

export function RegistrationFlow() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Registration & Submission Flow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to complete your registration and submit your project
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary hidden md:block" />

          <div className="space-y-8">
            {registrationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg relative z-10">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-grow pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-primary">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

