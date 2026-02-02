"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Sparkles } from "lucide-react";

const marketplaceItems = [
  {
    category: "Diagnostics and testing",
    items: [
      {
        name: "Baseline screening bundle",
        for: "Comprehensive metabolic and inflammation markers",
        when: "Relevant when establishing baseline or after significant lifestyle change",
        connectsTo: "Labs, metabolic markers, inflammation markers",
        price: "Starting at $299",
        discount: "Early access: 15% off",
      },
      {
        name: "Advanced biomarker panel",
        for: "Deep dive into cardiovascular and metabolic health",
        when: "When standard panels show trends requiring deeper analysis",
        connectsTo: "Previous lab results, cardiovascular risk markers",
        price: "Starting at $449",
        discount: "Early access: 15% off",
      },
    ],
  },
  {
    category: "Specialists",
    items: [
      {
        name: "Preventive cardiology consult",
        for: "Cardiovascular risk assessment and management",
        when: "When lipid trends or BP patterns suggest review",
        connectsTo: "Lipid panels, blood pressure readings, family history",
        price: "Starting at $350",
        discount: "Early access: Priority scheduling",
      },
    ],
  },
  {
    category: "Programs and services",
    items: [
      {
        name: "Sleep optimization program",
        for: "Evidence-based sleep improvement protocol",
        when: "When sleep metrics show consistent issues",
        connectsTo: "Sleep tracking data, recovery metrics",
        price: "Starting at $199",
        discount: "Early access: 10% off",
      },
    ],
  },
];

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Marketplace</h1>
        <p className="text-gray-400">Trusted options with full context and no pressure</p>
      </motion.div>

      <div className="space-y-8">
        {marketplaceItems.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item, itemIndex) => (
                <GlowCard key={itemIndex} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#4DEECD]/10 border border-[#4DEECD]/20">
                      <Sparkles size={12} className="text-[#4DEECD]" />
                      <span className="text-xs text-[#4DEECD] font-medium">Early access</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        What it's for
                      </p>
                      <p className="text-sm text-gray-300">{item.for}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        When it is relevant
                      </p>
                      <p className="text-sm text-gray-300">{item.when}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        What data it connects to
                      </p>
                      <p className="text-sm text-gray-300">{item.connectsTo}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{item.price}</p>
                      <p className="text-xs text-[#4DEECD] mt-1">{item.discount}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#4DEECD]/10 border border-[#4DEECD]/30 text-[#4DEECD] text-sm font-medium hover:bg-[#4DEECD]/20 transition-colors">
                      View details
                    </button>
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

