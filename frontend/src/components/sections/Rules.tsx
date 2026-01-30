"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Gavel } from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

const rulesItems = [
  {
    title: "Team Composition",
    content: "Each team must consist of 2–3 members only. Team members may belong to the same or different institutions.",
  },
  {
    title: "Proof of Concept (PoC)",
    content: "A working Proof of Concept (PoC) with Technology Readiness Level (TRL) 3 or above is mandatory for Round I.",
  },
  {
    title: "Originality",
    content: "All solutions must be original and developed by the participating team. Use of open-source frameworks, tools, APIs, and publicly available datasets is permitted.",
  },
  {
    title: "Plagiarism Policy",
    content: "Any form of plagiarism or unethical practices will result in immediate disqualification.",
  },
  {
    title: "Accommodation & Travel",
    content: "Accommodation will be provided for shortlisted teams. No travel allowance will be provided.",
  },
  {
    title: "Registration Fee",
    content: "No entry fee or registration fee is required to participate in the event.",
  },
  {
    title: "Ethical AI Principles",
    content: "Participants must adhere to ethical AI principles and data privacy norms.",
  },
  {
    title: "Jury Decision",
    content: "The decision of the Advisory members panel will be final and binding.",
  },
];

export function Rules() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="rules" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Gavel className="w-4 h-4" />
            Rules & Regulations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Guidelines for Participation
          </h2>
        </motion.div>

        <div className="space-y-4">
          {rulesItems.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="font-semibold text-foreground">
                    {rule.title}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted-foreground border-t border-border/50 pt-4">
                        {rule.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

