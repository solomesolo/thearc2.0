"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PersonaCard from "../../components/PersonaCard";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import EmailSignupModal from "../../components/EmailSignupModal";

const personaCards = [
  {
    title: "Women in Menopause",
    struggles: "Hormone shifts, energy crashes, sleep disruption, mood variability, weight changes, brain fog.",
    promise:
      "A clinically guided view of what your body is signalling, plus personalised routines and screenings designed specifically for women in midlife transition.",
    href: "/women",
    cta: "See how this works for women →",
  },
  {
    title: "Global Movers",
    struggles: "Health fragmentation, missing medical records, new healthcare systems, unpredictable stress, and loss of continuity.",
    promise:
      "A unified health identity, clear risk picture, and a portable roadmap that keeps your biology stable during major life transitions.",
    href: "/traveler",
    cta: "See how this works for global movers →",
  },
  {
    title: "Health Rebuilders",
    struggles: "Unstable energy, unexplained symptoms, chronic stress, weight changes, or feeling \"not quite right.\"",
    promise:
      "Clinically informed clarity and a personalised path to restore stability, strength, and resilience.",
    href: "/rebuilder",
    cta: "See how this works for rebuilding your health →",
  },
];

const personaGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const personaCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function UseCasesPage() {
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
            <SectionTitle className="text-4xl md:text-5xl font-semibold tracking-tight">
              Find Your Path
            </SectionTitle>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mt-6">
              The Arc adapts to your unique health journey. Whether you're navigating a life transition, rebuilding your health, or optimizing for longevity, we have a path designed for you.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Personas Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            variants={personaGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {personaCards.map((cardItem) => (
              <motion.div
                key={cardItem.href}
                variants={personaCardVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <PersonaCard {...cardItem} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Not sure which path fits you? Start with our free screening to discover your personalized health intelligence.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-black text-[#4DEECD] border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:border-white/30 hover:text-[#4DEECD] hover:bg-black"
              >
                Start Free Screening
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}



