"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

function AccordionItem({
  title,
  children,
  isOpen,
  onClick,
  icon,
}: AccordionItemProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden mb-4 last:mb-0">
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors",
          isOpen
            ? "bg-primary/5"
            : "hover:bg-muted/50"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <span>{icon}</span>}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 pt-0 border-t border-border">
              <div className="pt-4 text-muted-foreground">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          isOpen={openIndex === index}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

