"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { FAQSection } from "../../components/sections/FAQSection";
import { ArcButton } from "../../components/ui/ArcButton";
import EmailSignupModal from "../../components/EmailSignupModal";

const faqs = [
  {
    q: "What makes The Arc different from regular health apps?",
    a: "Most health apps rely on generic advice. The Arc uses clinical-grade analysis to reveal your personal predispositions, overlooked biological shifts, and the exact screenings that matter for you. It's the closest alternative to a longevity clinic — but accessible to everyone.",
  },
  {
    q: "Is this based on real medical science?",
    a: "Yes. Your roadmap is informed by validated biomarkers, clinician-informed guidelines, and evidence-based lifestyle protocols. Every recommendation is built to support metabolic health, inflammation control, circadian stability, and long-term risk reduction.",
  },
  {
    q: "Do I need to already be healthy or active?",
    a: "Not at all. The Arc works whether you're rebuilding your health or optimising an already healthy lifestyle. The system adapts to your age, symptoms, stress load, and personal goals.",
  },
  {
    q: "What screenings do you recommend?",
    a: "Screenings vary by persona and predisposition, but most plans include blood panels, inflammation markers, digestive markers, immune markers, and circadian assessments. You'll always see why each test is recommended — in simple, clinical language.",
  },
  {
    q: "How long until I see changes?",
    a: "Most users report noticeable changes in clarity, energy, digestion, or sleep within the first 3–6 weeks. The full system is built around measurable progress at the 6-month mark.",
  },
  {
    q: "Is this a medical service?",
    a: "The Arc provides clinically informed guidance. Our Care tier includes access to licensed professionals who review your plan, explain biomarkers, and supervise your progress.",
  },
  {
    q: "Is this suitable for travellers or people with irregular schedules?",
    a: "Yes. Many of our users move between cities or time zones. Your plan adjusts to your lifestyle and helps stabilise sleep, recovery, immunity, and stress.",
  },
  {
    q: "What if I'm not sure where to start?",
    a: "Start with the free screening. It reveals what you may be missing and shows the first steps toward clarity — with zero commitment.",
  },
  {
    q: "How does The Arc protect my health data?",
    a: "Your health data is encrypted and stored securely. We never share your personal information without your explicit consent. You control what data is included and can delete your account and data at any time.",
  },
  {
    q: "Can I use The Arc alongside my existing healthcare provider?",
    a: "Absolutely. The Arc is designed to complement, not replace, your existing healthcare. Share your insights with your doctor to enhance your care coordination.",
  },
  {
    q: "What if I have a medical emergency?",
    a: "The Arc is not a replacement for emergency medical care. If you're experiencing a medical emergency, contact your local emergency services immediately.",
  },
  {
    q: "How often should I update my health data?",
    a: "We recommend updating your data whenever you have new test results, health changes, or significant lifestyle shifts. The more current your data, the more accurate your insights.",
  },
];

export default function FAQPage() {
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
              Frequently Asked Questions
            </SectionTitle>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mt-6">
              Everything you need to know about The Arc, how it works, and how it can help you understand and improve your health.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

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
              Still have questions? Get in touch or start your free screening to see how The Arc works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <ArcButton onClick={() => setShowEmailModal(true)}>
                Get Started
              </ArcButton>
              <ArcButton
                href="/contact"
                className="border border-white/30 text-[#4DEECD] bg-transparent"
              >
                Contact Us
              </ArcButton>
            </div>
          </motion.div>
        </div>
      </Section>

      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
}



