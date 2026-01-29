"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card } from "../ui/Card";

const contacts = [
  {
    icon: Phone,
    name: "Harini P",
    phone: "6366203232",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Phone,
    name: "Giriprakash",
    phone: "7695984737",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function Contact() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Get in touch with our organizing team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${contact.bgColor} ${contact.color}`}
                >
                  <contact.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {contact.name}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {contact.phone}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="p-8 text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Event Venue
            </h3>
            <p className="text-muted-foreground">
              Offline Final Round - On-campus Venue
              <br />
              <span className="text-sm">(Accommodation provided for shortlisted teams)</span>
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

