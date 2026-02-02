"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Upload, FileText, Activity, Image as ImageIcon } from "lucide-react";

export default function HealthDataPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Health Data</h1>
        <p className="text-gray-400">Own your data. Always.</p>
      </motion.div>

      {/* Ownership Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="p-6 bg-[#4DEECD]/5 border border-[#4DEECD]/20">
          <p className="text-sm text-gray-300 leading-relaxed mb-2">
            <strong className="text-white">You own your data. Always.</strong>
          </p>
          <p className="text-sm text-gray-400">
            No analysis happens before your data is complete.
          </p>
        </GlowCard>
      </motion.div>

      {/* Connected Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlowCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Connected sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <FileText size={20} />, label: "Labs", status: "Connected", count: "12 results" },
              { icon: <Activity size={20} />, label: "Wearables", status: "Connected", count: "Daily sync" },
              { icon: <ImageIcon size={20} />, label: "Imaging", status: "2 uploaded", count: "Last: 3 months ago" },
              { icon: <FileText size={20} />, label: "Clinical docs", status: "5 uploaded", count: "Last: 1 month ago" },
            ].map((source, index) => (
              <div
                key={source.label}
                className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3"
              >
                <div className="text-[#4DEECD]">{source.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{source.label}</p>
                  <p className="text-xs text-gray-400">{source.status}</p>
                  <p className="text-xs text-gray-500 mt-1">{source.count}</p>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </motion.div>

      {/* Upload Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlowCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Add new data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#4DEECD]/30 transition-all flex flex-col items-center gap-3">
              <Upload size={24} className="text-[#4DEECD]" />
              <span className="text-sm font-medium text-white">Upload PDF</span>
              <span className="text-xs text-gray-400">Lab results, reports, documents</span>
            </button>
            <button className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#4DEECD]/30 transition-all flex flex-col items-center gap-3">
              <ImageIcon size={24} className="text-[#4DEECD]" />
              <span className="text-sm font-medium text-white">Capture photo</span>
              <span className="text-xs text-gray-400">Take a photo of documents</span>
            </button>
            <button className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#4DEECD]/30 transition-all flex flex-col items-center gap-3">
              <Activity size={24} className="text-[#4DEECD]" />
              <span className="text-sm font-medium text-white">Connect provider</span>
              <span className="text-xs text-gray-400">Link your provider portal</span>
            </button>
          </div>
        </GlowCard>
      </motion.div>

      {/* Timeline Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <GlowCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">New data enters timeline</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-2 h-2 rounded-full bg-[#4DEECD]"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Lab panel uploaded</p>
                <p className="text-xs text-gray-400">Added to timeline: 2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <div className="w-2 h-2 rounded-full bg-[#4DEECD]"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Blood pressure readings synced</p>
                <p className="text-xs text-gray-400">Added to timeline: 1 week ago</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

