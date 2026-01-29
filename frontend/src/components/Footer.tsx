"use client";

import * as React from "react";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { cn } from "../lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              AI4Dev<span className="text-accent">'26</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              National-Level Hackathon on AI-Enabled Transformative Technologies
              for Global Development
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#overview"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                >
                  Event Overview
                </a>
              </li>
              <li>
                <a
                  href="#domains"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                >
                  Problem Domains
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                >
                  Timeline
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                >
                  Prizes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Contact Information
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Harini P:</span>{" "}
                6366203232
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Giriprakash:</span>{" "}
                7695984737
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Organized by: <span className="font-medium">Coding Club</span>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              Copyright © {currentYear} AI4Dev '26. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by{" "}
              <span className="font-medium text-foreground">Coding Club</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

