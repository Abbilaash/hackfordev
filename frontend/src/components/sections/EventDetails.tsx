"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Timer } from "lucide-react";
import { Card } from "../ui/Card";

const eventDetails = [
  {
    icon: Calendar,
    title: "Date",
    content: "March 28, 2026",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Timer,
    title: "Duration",
    content: "1 Day",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Clock,
    title: "Time",
    content: "9:00 AM – 5:00 PM",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: MapPin,
    title: "Mode",
    content: "Offline (Final Round)",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function EventDetails() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="details" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Event Details
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mark your calendars for this exciting one-day national-level hackathon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${detail.bgColor} ${detail.color} mb-4`}
                >
                  <detail.icon className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {detail.title}
                </h3>
                <p className="text-lg font-semibold text-foreground">
                  {detail.content}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

