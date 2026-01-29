"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card } from "../ui/Card";

const prizes = [
  {
    position: "2nd Prize",
    amount: "₹20,000",
    icon: "🥈",
    color: "from-gray-300 to-gray-500",
    features: ["Cash Prize", "Certificate", "Mentorship", "Swag Kit"],
  },
  {
    position: "1st Prize",
    amount: "₹30,000",
    icon: "🥇",
    color: "from-yellow-400 to-yellow-600",
    features: ["Cash Prize", "Certificate", "Mentorship", "Swag Kit"],
  },
  
  {
    position: "3rd Prize",
    amount: "₹10,000",
    icon: "🥉",
    color: "from-orange-400 to-orange-600",
    features: ["Cash Prize", "Certificate", "Swag Kit"],
  },
];

export function Prizes() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="prizes" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Prize Details
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exciting Prizes to Win
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Total Prize Pool: ₹60,000
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative ${
                index === 1 ? "md:-mt-4" : ""
              }`}
            >
              <Card
                className={`h-full overflow-hidden ${
                  index === 1
                    ? "border-2 border-primary shadow-xl scale-105"
                    : "hover:shadow-lg transition-all duration-300"
                }`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${prize.color} p-6 text-white text-center`}>
                  <div className="text-5xl mb-2">{prize.icon}</div>
                  <h3 className="text-2xl font-bold">{prize.position}</h3>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-6">
                    {prize.amount}
                  </p>

                  <ul className="space-y-3">
                    {prize.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-muted-foreground text-sm flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

