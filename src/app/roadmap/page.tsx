"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { ArcButton } from "../../components/ui/ArcButton";
import EmailSignupModal from "../../components/EmailSignupModal";

const roadmapItems = [
  {
    label: "Now",
    title: "Knowledge Base for Learning",
    desc:
      "Personalised, clinically guided content to help you understand tests, biomarkers and lifestyle changes.",
  },
  {
    label: "Next",
    title: "Access to Certified Specialists",
    desc:
      "Book consultations with vetted clinicians, practitioners and health experts from around the world.",
  },
  {
    label: "Soon",
    title: "New Health Data Integrations",
    desc:
      "Connect wearables, home diagnostic devices and lab results for a complete personal dashboard.",
  },
  {
    label: "Continuous",
    title: "Expanding Global Provider Network",
    desc:
      "More trusted direct-to-consumer partners, more services, more locations — always growing.",
  },
];

export default function RoadmapPage() {
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
              What's next for The Arc
            </SectionTitle>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mt-6">
              We're shipping fast. The Arc is evolving from personalised insights into a complete platform with learning, expert access, and connected data so you always know what to do next.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Roadmap Timeline */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              {/* Left side can be used for additional content if needed */}
            </div>

            <div className="border-l border-neutral-800 ml-4 pl-8 space-y-16">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-sm text-neutral-500 uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-neutral-300 leading-relaxed mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <ArcButton onClick={() => setShowEmailModal(true)}>
              Join early access
            </ArcButton>
          </div>
        </div>
      </Section>

      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}



