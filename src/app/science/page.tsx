"use client";

import { motion } from "framer-motion";
import React from "react";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { ArcButton } from "../../components/ui/ArcButton";
import EmailSignupModal from "../../components/EmailSignupModal";
import { useState } from "react";

const layers = [
  {
    title: "Intake Layer — ARC Learns You",
    headline: "ARC interprets your biology from the first interaction.",
    bullets: [
      "3-minute screening",
      "Predisposition mapping",
      "Early pattern recognition",
      "No jargon, no friction",
      "The first version of your 'health fingerprint'",
    ],
    subheading: "This is your biological entry point.",
  },
  {
    title: "Intelligence Layer — ARC Builds Your Health Graph",
    headline: "ARC constructs a dynamic model of your biology using:",
    bullets: [
      "your inputs",
      "optional lab work",
      "wearables",
      "health history",
      "environmental signals",
      "health graph + risk radar",
      "biological drivers",
      "long-term predisposition map",
      "precision screening plan",
    ],
    subheading: "This is the intelligence core of your HealthOS.",
  },
  {
    title: "Strategy Engine — ARC Generates Your Adaptive Plan",
    headline: "ARC transforms your biological model into clear monthly guidance:",
    bullets: [
      "what's drifting",
      "what's improving",
      "what to test",
      "what to change",
      "what to monitor",
      "what matters, what doesn't",
    ],
    subheading: "This is your adaptive preventive engine.",
  },
  {
    title: "Ecosystem Layer — ARC Connects You to Real Solutions",
    headline: "Your OS connects directly to the world around you:",
    bullets: [
      "at-home tests & diagnostics",
      "local screenings",
      "specialists",
      "labs",
      "vetted partner services",
      "ongoing community + live Q&A",
      "offline events",
      "(soon) anonymized global dataset insights",
    ],
    subheading: "This is health infrastructure — unified for the first time.",
  },
];

const layerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.35, ease: "easeOut" },
  }),
};

const MintPulse = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#57E7C3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <circle cx="12" cy="12" r="9" strokeOpacity="0.6" />
    <path d="M8 12h2l1.5-3 2 6 1.5-3H16" />
  </svg>
);

export default function SciencePage() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">
              ARC HealthOS Architecture
            </p>
            <SectionTitle className="text-4xl md:text-5xl font-semibold leading-tight">
              ARC doesn't give you another dashboard. It gives you a four-tier biological intelligence system.
            </SectionTitle>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mt-6">
              Built on clinical research and designed for long-term health continuity.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* HealthOS Layers */}
      <section className="relative bg-[#010203] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,120,100,0.25),rgba(0,0,0,0.95))]" />
        <div className="absolute left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#2ce0b3]/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-20">
          <div className="space-y-14">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-xl px-8 md:px-12 py-10 shadow-[0_50px_120px_rgba(0,0,0,0.35)]"
                style={{ transform: `translateY(${(layers.length - index - 1) * 6}px)` }}
                variants={layerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="absolute inset-y-6 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#62F4C8] to-[#2AD79B] shadow-[0_0_25px_rgba(47,240,190,0.6)]" />
                <div className="flex flex-col gap-4 md:gap-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#66F4CA]/80">{layer.title}</p>
                  <h3 className="text-2xl md:text-3xl font-semibold leading-snug">{layer.headline}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80">
                    {layer.bullets.map((bullet, bulletIndex) => (
                      <motion.div
                        key={bullet}
                        className="flex items-start gap-3"
                        custom={bulletIndex}
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                      >
                        <MintPulse />
                        <p className="leading-relaxed text-sm md:text-base">{bullet}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">{layer.subheading}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-xl md:text-2xl font-semibold text-white/90 pt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block">You get what no doctor, app, or clinic can give you:</span>
            <span className="block text-[#63F3C9] mt-2">One brain for your entire health.</span>
          </motion.p>
        </div>
      </section>

      {/* Research Framing */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <SectionTitle className="text-4xl md:text-5xl font-semibold tracking-tight">
              Built on Clinical Research
            </SectionTitle>
            <div className="space-y-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              <p>
                The Arc's HealthOS architecture is informed by validated biomarkers, clinician-informed guidelines, and evidence-based lifestyle protocols. Every layer is designed to support metabolic health, inflammation control, circadian stability, and long-term risk reduction.
              </p>
              <p>
                Our system adapts to your biology, learns from your patterns, and evolves with your health journey — providing continuous, personalized guidance grounded in medical science.
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-12">
            <ArcButton onClick={() => setShowEmailModal(true)}>
              Get Started with Health Intelligence
            </ArcButton>
          </div>
        </div>
      </Section>

      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}



