"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Overview</h1>
        <p className="text-gray-400">Your current health status and what matters next</p>
      </motion.div>

      {/* Current Status Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Your current status</h2>
              <p className="text-sm text-gray-400">Based on your last results and changes over time.</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#4DEECD]/10 border border-[#4DEECD]/30">
              <span className="text-[#4DEECD] text-sm font-medium">Nothing needed right now this month</span>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Main Grid: 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Next Recommended Checks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlowCard className="p-5 h-full">
            <h2 className="text-lg font-semibold text-white mb-4">Next recommended checks</h2>
            <div className="space-y-3">
              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">Lipid panel</h3>
                  <span className="text-xs text-green-400">12 months</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Stable across 3 panels</p>
                <p className="text-xs text-gray-500">Recheck in 12 months</p>
              </div>

              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">HbA1c</h3>
                  <span className="text-xs text-amber-400">6 months</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Slight upward drift detected</p>
                <p className="text-xs text-gray-500">Recheck in 6 months to confirm trend</p>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">CRP</h3>
                  <span className="text-xs text-amber-400">8 weeks</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Single spike detected</p>
                <p className="text-xs text-gray-500">Repeat in 8 weeks to confirm</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Card 2: Important Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlowCard className="p-5 h-full">
            <h2 className="text-lg font-semibold text-white mb-4">Important trends</h2>
            <div className="space-y-3">
              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">Inflammation trend</h3>
                  <span className="text-xs text-amber-400">Watch</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">hsCRP gradually rising over 18 months</p>
                <p className="text-xs text-gray-500">Pattern visible across 7 lab panels</p>
              </div>

              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">Sleep consistency</h3>
                  <span className="text-xs text-[#4DEECD]">Improving</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Variability decreased over 10 weeks</p>
                <p className="text-xs text-gray-500">Recovery metrics trending positive</p>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">Metabolic drift</h3>
                  <span className="text-xs text-amber-400">Monitor</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">HbA1c and glucose diverging slightly</p>
                <p className="text-xs text-gray-500">Early pattern forming</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Card 3: Upcoming Interventions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowCard className="p-5 h-full">
            <h2 className="text-lg font-semibold text-white mb-4">Upcoming interventions</h2>
            <div className="space-y-3">
              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">CRP repeat check</h3>
                  <span className="text-xs text-amber-400">Within 2 weeks</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Confirm single elevated reading</p>
                <p className="text-xs text-gray-500">Due: Feb 15, 2025</p>
              </div>

              <div className="pb-3 border-b border-white/5">
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">HbA1c recheck</h3>
                  <span className="text-xs text-[#4DEECD]">Within 6 months</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Monitor metabolic drift</p>
                <p className="text-xs text-gray-500">Due: Jul 15, 2025</p>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white">Sleep pattern review</h3>
                  <span className="text-xs text-gray-400">Monitor only</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">Continue tracking consistency</p>
                <p className="text-xs text-gray-500">No action needed</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* Bottom Row: No Noise + Marketplace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* No Noise Microcopy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlowCard className="p-5 bg-[#4DEECD]/5 border border-[#4DEECD]/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">No noise</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Fewer alerts, more confidence. Arc surfaces only what matters based on your actual results, not generic schedules.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Marketplace Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlowCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Marketplace suggestion</h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4DEECD]/10 border border-[#4DEECD]/20">
                <Sparkles size={10} className="text-[#4DEECD]" />
                <span className="text-xs text-[#4DEECD] font-medium">Early access</span>
              </div>
            </div>
            <div className="mb-3">
              <h4 className="text-sm font-medium text-white mb-1">Baseline screening bundle</h4>
              <p className="text-xs text-gray-400 mb-2">
                Comprehensive metabolic and inflammation markers aligned with your timeline signals.
              </p>
              <p className="text-xs text-[#4DEECD] font-medium">Locked in discount: 15% off</p>
            </div>
            <Link
              href="/dashboard/your-arc/marketplace"
              className="text-xs text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-1"
            >
              View details
              <span aria-hidden="true">→</span>
            </Link>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
