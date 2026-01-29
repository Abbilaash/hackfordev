"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Github, Video } from "lucide-react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";

export function SubmissionDetails() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Upload className="w-4 h-4" />
            Submission Details
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Submit Your Project
          </h2>
        </motion.div>

        <Card className="p-8 mb-8">
          <p className="text-lg text-muted-foreground text-center">
             All registrations and
            submissions will be carried out through the official hackathon
            website (AI4Dev '26).
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              title: "Project PPT",
              description: "Upload your project presentation explaining the solution",
              color: "text-primary",
              bgColor: "bg-primary/10",
            },
            {
              icon: Github,
              title: "GitHub Repository",
              description: "Share the link to your project code repository",
              color: "text-foreground",
              bgColor: "bg-muted",
            },
            {
              icon: Video,
              title: "Demo Video",
              description: "Provide a URL to your demo video showcasing the PoC",
              color: "text-red-500",
              bgColor: "bg-red-500/10",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4",
                    item.bgColor,
                    item.color
                  )}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

