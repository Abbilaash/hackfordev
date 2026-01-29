"use client";

import * as React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../components/sections/Hero";
import { EventOverview } from "../components/sections/EventOverview";
import { EventDetails } from "../components/sections/EventDetails";
import { Eligibility } from "../components/sections/Eligibility";
import { Rules } from "../components/sections/Rules";
import { ProblemDomains } from "../components/sections/ProblemDomains";
import { HackathonTimeline } from "../components/sections/HackathonTimeline";
import { SubmissionDetails } from "../components/sections/SubmissionDetails";
import { RegistrationFlow } from "../components/sections/RegistrationFlow";
import { Prizes } from "../components/sections/Prizes";
import { Jury } from "../components/sections/Jury";
import { Contact } from "../components/sections/Contact";

export default function Home() {
  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(new Set());
  const sectionRefs = React.useRef<Map<string, HTMLElement>>(new Map());

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section');
          if (entry.isIntersecting && sectionId) {
            setVisibleSections(prev => new Set(prev).add(sectionId));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    sectionRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getSectionDelay = (index: number) => {
    return index * 0.1; // Stagger delay in seconds
  };

  const sections = [
    { id: 'hero', component: Hero, delay: 0 },
    { id: 'overview', component: EventOverview, delay: getSectionDelay(1) },
    { id: 'details', component: EventDetails, delay: getSectionDelay(2) },
    { id: 'eligibility', component: Eligibility, delay: getSectionDelay(3) },
    { id: 'rules', component: Rules, delay: getSectionDelay(4) },
    { id: 'domains', component: ProblemDomains, delay: getSectionDelay(5) },
    { id: 'timeline', component: HackathonTimeline, delay: getSectionDelay(6) },
    { id: 'submission', component: SubmissionDetails, delay: getSectionDelay(7) },
    { id: 'registration', component: RegistrationFlow, delay: getSectionDelay(8) },
    { id: 'prizes', component: Prizes, delay: getSectionDelay(9) },
    { id: 'jury', component: Jury, delay: getSectionDelay(10) },
    { id: 'contact', component: Contact, delay: getSectionDelay(11) },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {sections.map(({ id, component: Component, delay }) => (
        <div
          key={id}
          ref={(el) => {
            if (el) sectionRefs.current.set(id, el);
          }}
          data-section={id}
          className={`transition-all duration-1000 ease-out ${
            visibleSections.has(id)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: `${delay}s`,
          }}
        >
          <Component />
        </div>
      ))}
      <Footer />
    </main>
  );
}
