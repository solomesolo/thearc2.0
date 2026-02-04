"use client";

import React from "react";
import { Database, TestTube, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ConnectedSourcesPanel() {
  const sources = [
    { icon: <Database className="w-4 h-4" />, label: "EHR", connected: true },
    { icon: <TestTube className="w-4 h-4" />, label: "Labs", connected: true },
    { icon: <Activity className="w-4 h-4" />, label: "Wearables", connected: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 }}
      className="card-premium card-compact bg-[var(--color-bg-card-elevated)] border border-[var(--color-border-elevated)]"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium text-[var(--text-2)] tracking-[0.02em]">
            Connected sources
          </h4>
          <span className="text-xs text-accent font-medium">3 active</span>
        </div>
        <div className="space-y-2">
          {sources.map((source, idx) => (
            <motion.div
              key={source.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1], delay: 0.3 + idx * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="text-accent">{source.icon}</div>
              <span className="text-sm text-gray-300 flex-1">{source.label}</span>
              {source.connected && (
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

