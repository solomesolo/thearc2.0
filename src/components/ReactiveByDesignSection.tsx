"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import {
  FileText,
  RefreshCw,
  TrendingUp,
  Activity,
  Bell,
} from "lucide-react";
import Link from "next/link";

interface CardData {
  title: string;
  bullets: Array<{ text: string; icon: React.ReactNode }>;
  microLine: string;
}

const cardData: CardData[] = [
  {
    title: "Today",
    bullets: [
      {
        text: "Medical history is scattered across reports portals and inboxes",
        icon: <FileText className="w-[18px] h-[18px]" />,
      },
      {
        text: "Each appointment starts without context",
        icon: <RefreshCw className="w-[18px] h-[18px]" />,
      },
    ],
    microLine: "Result: you only react after symptoms or surprises",
  },
  {
    title: "What is missing",
    bullets: [
      {
        text: "A single timeline that connects every test visit and note",
        icon: <Activity className="w-[18px] h-[18px]" />,
      },
      {
        text: "Clear signals when something changes over time",
        icon: <TrendingUp className="w-[18px] h-[18px]" />,
      },
    ],
    microLine: "Missing link: continuity",
  },
  {
    title: "With Arc",
    bullets: [
      {
        text: "One place for all records with a living health timeline",
        icon: <Activity className="w-[18px] h-[18px]" />,
      },
      {
        text: "Updates that tell you what to do next",
        icon: <Bell className="w-[18px] h-[18px]" />,
      },
    ],
    microLine: "Outcome: earlier clarity and better decisions",
  },
];

const bridgeLabels = ["Scattered", "No continuity", "Continuous timeline"];

export default function ReactiveByDesignSection() {
  return (
    <section id="home.problem" className="reactive-by-design-section">
      <Section>
        <div className="reactive-by-design-wrapper">
          {/* Text Block - max width 920px */}
          <div className="reactive-by-design-text-block">
            {/* Editorial Spotlight - radial gradient behind heading */}
            <div className="reactive-by-design-spotlight" />
            
            {/* Eyebrow */}
            <p className="reactive-by-design-eyebrow">
              WHY IT FEELS HARD
            </p>
            
            {/* H2 */}
            <h2 className="reactive-by-design-heading">
              Health today is reactive by design
            </h2>
            
            {/* Subhead */}
            <p className="reactive-by-design-subhead">
              Your data is everywhere. Your history is nowhere. Arc turns scattered records into a continuous timeline you can act on.
            </p>
            
            {/* Kicker */}
            <p className="reactive-by-design-kicker">
              It is not more data. It is continuity.
            </p>
          </div>

            {/* Bridge Visual - Desktop */}
            <motion.div
              className="hidden md:block mb-8 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="grid grid-cols-3 gap-6 md:gap-8 relative">
                <div className="absolute top-6 left-0 right-0 h-0.5" style={{ backgroundColor: "var(--border)" }} />
                {bridgeLabels.map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center z-10">
                    <div className="w-3 h-3 rounded-full border-2 mb-2" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }} />
                    <p className="text-xs text-center mt-2" style={{ color: "var(--text-muted)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bridge Visual - Mobile */}
            <motion.div
              className="md:hidden mb-6 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between w-full relative">
                <div className="absolute top-4 left-0 right-0 h-0.5" style={{ backgroundColor: "var(--border)" }} />
                {bridgeLabels.map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center z-10 flex-1">
                    <div className="w-2.5 h-2.5 rounded-full border-2 mb-1.5" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }} />
                    <p className="text-[10px] text-center mt-1 leading-tight" style={{ color: "var(--text-muted)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          {/* Card Grid - max width 1120px */}
          <div className="reactive-by-design-card-grid">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                className="reactive-by-design-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              >
                {/* Card Title */}
                <h3 className="reactive-by-design-card-title">
                  {card.title}
                </h3>

                {/* Bullets */}
                <div className="reactive-by-design-bullets">
                  {card.bullets.map((bullet, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className="reactive-by-design-bullet-row"
                    >
                      <div className="reactive-by-design-bullet-icon">
                        {bullet.icon}
                      </div>
                      <p className="reactive-by-design-bullet-text">
                        {bullet.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Micro line with divider */}
                <div className="reactive-by-design-micro-line-wrapper">
                  <p className="reactive-by-design-micro-line">
                    {card.microLine}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional button */}
          <div className="text-center">
            <Link
              href="#home.capabilities"
              className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-alpha-20)] focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] rounded px-2 py-1"
            >
              See how the timeline works
            </Link>
          </div>
        </div>
      </Section>
    </section>
  );
}
