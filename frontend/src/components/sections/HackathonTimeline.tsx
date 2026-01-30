"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Video, Github, FileText, Building, Users } from "lucide-react";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

export function HackathonTimeline() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="timeline" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hackathon Structure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two rounds to showcase your innovation and compete for exciting prizes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Round I */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full p-8 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  Round I – Preliminary Round
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Requirements
                  </h4>
                  <ul className="space-y-3 ml-7">
                    <li className="text-muted-foreground">
                      Working PoC with TRL Level 3 or above
                    </li>
                    <li className="text-muted-foreground">
                      Project PPT explaining your solution
                    </li>
                    <li className="text-muted-foreground">
                      GitHub repository link with code
                    </li>
                    <li className="text-muted-foreground">
                      Demo video URL showcasing your PoC
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Evaluation Criteria
                  </h4>
                  <ul className="space-y-2 ml-7">
                    <li className="text-muted-foreground">
                      • Project PPT quality and clarity
                    </li>
                    <li className="text-muted-foreground">
                      • GitHub code quality and documentation
                    </li>
                    <li className="text-muted-foreground">
                      • Demo video clarity and presentation
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Round II */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full p-8 border-2 border-accent/20 bg-accent/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-accent">
                  Round II – Offline Final Round
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-accent" />
                    Format
                  </h4>
                  <ul className="space-y-3 ml-7">
                    <li className="text-muted-foreground">
                      On-campus hackathon at the venue
                    </li>
                    <li className="text-muted-foreground">
                      Live demo session with jury panel
                    </li>
                    <li className="text-muted-foreground">
                      Interactive Q&A with judges
                    </li>
                    <li className="text-muted-foreground">
                      Final evaluation and winner announcement
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    What to Prepare
                  </h4>
                  <ul className="space-y-2 ml-7">
                    <li className="text-muted-foreground">
                      • Finalized working prototype
                    </li>
                    <li className="text-muted-foreground">
                      • Presentation materials
                    </li>
                    <li className="text-muted-foreground">
                      • Team introduction and innovation highlights
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

