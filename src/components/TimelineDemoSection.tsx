"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import TimelineDemo from "./TimelineDemo";
import { useScrollState } from "../hooks/useScrollState";

export default function TimelineDemoSection() {
  const scrollState = useScrollState();

  return (
    <section id="home.timelineDemo">
      <Section>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="text-center space-y-6 mb-12">
              <p className="typography-eyebrow">See it in action</p>
              <SectionTitle className="text-center">
                Your health timeline, connected
              </SectionTitle>
              <p className="typography-body-secondary max-w-2xl mx-auto">
                Events from labs, symptoms, and wearables form patterns over time. Click any event to see why it matters.
              </p>
            </div>
            <TimelineDemo scrollState={scrollState} />
          </motion.div>
        </div>
      </Section>
    </section>
  );
}

