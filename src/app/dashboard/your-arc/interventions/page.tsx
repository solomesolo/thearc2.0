"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const interventions = [
  {
    group: "Review",
    items: [
      {
        title: "CRP trend review",
        urgency: "Monitor",
        timing: "8 weeks",
        reason: "Single elevated reading requires confirmation",
        category: "Labs",
      },
    ],
  },
  {
    group: "Testing",
    items: [
      {
        title: "HbA1c recheck",
        urgency: "Routine",
        timing: "6 months",
        reason: "Slight upward drift within normal range",
        category: "Labs",
      },
      {
        title: "Lipid panel",
        urgency: "Routine",
        timing: "12 months",
        reason: "Stable values indicate routine monitoring",
        category: "Labs",
      },
    ],
  },
  {
    group: "Lifestyle",
    items: [
      {
        title: "Blood pressure home monitoring",
        urgency: "Monitor",
        timing: "14 days",
        reason: "Borderline clinic readings, confirm baseline",
        category: "Vitals",
      },
    ],
  },
  {
    group: "Specialist",
    items: [
      {
        title: "No specialist follow-up needed",
        urgency: "None",
        timing: "Not applicable",
        reason: "Last consult normal, no follow-up required",
        category: "Specialist",
      },
    ],
  },
];

export default function InterventionsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Interventions</h1>
        <p className="text-gray-400">Prioritized without overwhelming</p>
      </motion.div>

      <div className="space-y-6">
        {interventions.map((group, groupIndex) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">{group.group}</h2>
            <div className="space-y-3">
              {group.items.map((item, itemIndex) => (
                <GlowCard key={itemIndex} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">{item.reason}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.urgency === "Monitor"
                            ? "bg-amber-500/10 text-amber-400"
                            : item.urgency === "Routine"
                            ? "bg-[#4DEECD]/10 text-[#4DEECD]"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {item.urgency}
                      </span>
                      <span className="text-xs text-gray-400">{item.timing}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-gray-400">{item.category}</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white transition-colors">
                        Monitor only
                      </button>
                      <span className="text-gray-600">·</span>
                      <button className="text-xs text-gray-400 hover:text-white transition-colors">
                        Discuss with clinician
                      </button>
                    </div>
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

