"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SupplementProtocol } from "@/components/dashboard/blueprint/SupplementProtocol";
import { MicroPlans } from "@/components/dashboard/blueprint/MicroPlans";

const blueprintGroups = [
  {
    category: "Sleep & Circadian",
    items: [
      { id: "sleep-toolkit", name: "Sleep Toolkit", status: "Active", goal: "Improve sleep quality", signals: ["Sleep latency", "Night awakenings"], duration: "14 days", change: "↓ 18% improvement" },
      { id: "caffeine-timing", name: "Caffeine Timing Blueprint", status: "Completed", goal: "Reduce circadian disruption", signals: ["HRV", "Daytime alertness"], duration: "14 days", change: "↑ 9% HRV improvement" },
    ],
  },
  {
    category: "Metabolic & Nutrition",
    items: [
      { id: "tre", name: "Time-Restricted Eating", status: "Draft", goal: "Metabolic optimization", signals: ["Glucose", "Insulin"], duration: "30 days", change: "Not started" },
    ],
  },
];

export default function PersonalBlueprintsPage() {
  const [selectedTab, setSelectedTab] = useState<"active" | "completed" | "drafts">("active");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Personal Blueprints</h1>
        <p className="text-gray-400">Optional self-protocols and experimentation in a responsible way</p>
      </motion.div>

      {/* Trust Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="p-6 bg-[#4DEECD]/5 border border-[#4DEECD]/20">
          <p className="text-sm text-gray-300 leading-relaxed mb-2">
            <strong className="text-white">Optional and transparent.</strong> You stay in control of what you follow and what you discard.
          </p>
        </GlowCard>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: "active" as const, label: "Active" },
          { id: "completed" as const, label: "Completed" },
          { id: "drafts" as const, label: "Drafts" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              selectedTab === tab.id
                ? "text-[#4DEECD]"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
            {selectedTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4DEECD]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Blueprints List */}
      <div className="space-y-6">
        {blueprintGroups.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">{group.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items
                .filter((item) => {
                  if (selectedTab === "active") return item.status === "Active";
                  if (selectedTab === "completed") return item.status === "Completed";
                  return item.status === "Draft";
                })
                .map((item) => (
                  <GlowCard key={item.id} className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-[#4DEECD]/10 text-[#4DEECD]"
                            : item.status === "Completed"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Goal: {item.goal}</p>
                    <div className="space-y-2 mb-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Signals tracked</p>
                      <div className="flex flex-wrap gap-2">
                        {item.signals.map((signal) => (
                          <span key={signal} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300">
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-xs text-gray-400">Duration: {item.duration}</span>
                      <span className="text-xs text-[#4DEECD]">{item.change}</span>
                    </div>
                  </GlowCard>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

