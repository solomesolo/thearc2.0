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
        icon: <FileText className="w-4 h-4" />,
      },
      {
        text: "Each appointment starts without context",
        icon: <RefreshCw className="w-4 h-4" />,
      },
    ],
    microLine: "Result: you only react after symptoms or surprises",
  },
  {
    title: "What is missing",
    bullets: [
      {
        text: "A single timeline that connects every test visit and note",
        icon: <Activity className="w-4 h-4" />,
      },
      {
        text: "Clear signals when something changes over time",
        icon: <TrendingUp className="w-4 h-4" />,
      },
    ],
    microLine: "Missing link: continuity",
  },
  {
    title: "With Arc",
    bullets: [
      {
        text: "One place for all records with a living health timeline",
        icon: <Activity className="w-4 h-4" />,
      },
      {
        text: "Updates that tell you what to do next",
        icon: <Bell className="w-4 h-4" />,
      },
    ],
    microLine: "Outcome: earlier clarity and better decisions",
  },
];

const bridgeLabels = ["Scattered", "No continuity", "Continuous timeline"];

export default function ReactiveByDesignSection() {
  return (
    <section id="home.problem">
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {/* Eyebrow */}
            <div className="text-center space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                Why it feels hard
              </p>
              <SectionTitle className="text-center text-4xl md:text-5xl font-semibold tracking-tight">
                Health today is reactive by design
              </SectionTitle>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Your data is everywhere. Your history is nowhere. Arc turns scattered records into a continuous timeline you can act on.
              </p>
              <p className="text-sm text-gray-500">
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
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20" />
                {bridgeLabels.map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center z-10">
                    <div className="w-3 h-3 rounded-full bg-white/30 border-2 border-white/50 mb-2" />
                    <p className="text-xs text-gray-400 text-center mt-2">{label}</p>
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
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/20" />
                {bridgeLabels.map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center z-10 flex-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30 border-2 border-white/50 mb-1.5" />
                    <p className="text-[10px] text-gray-400 text-center mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg border transition-all relative overflow-hidden group ${
                    index === 1
                      ? "bg-white/6 border-white/20"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                >
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {card.title}
                  </h3>

                  {/* Bullets */}
                  <div className="space-y-2 mb-4">
                    {card.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={bulletIndex}
                        className="flex flex-col md:flex-row md:items-start gap-2 md:gap-3"
                      >
                        <div className="text-[#4DEECD] flex-shrink-0">
                          {bullet.icon}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {bullet.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Micro line */}
                  <p className="text-xs mb-0" style={{ color: "rgba(156, 163, 175, 0.6)" }}>
                    {card.microLine}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Optional button */}
            <div className="text-center">
              <Link
                href="#home.capabilities"
                className="text-sm text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#4DEECD] focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
              >
                See how the timeline works
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
