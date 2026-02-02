"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Download, Trash2, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Data ownership and privacy controls</p>
      </motion.div>

      {/* Data Ownership */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield size={20} className="text-[#4DEECD] mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-2">Data ownership</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                You own your data. Always. Arc does not sell or monetize your health information.
              </p>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Export and Delete */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlowCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Data management</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#4DEECD]/30 transition-all">
              <div className="flex items-center gap-3">
                <Download size={18} className="text-[#4DEECD]" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Export your data</p>
                  <p className="text-xs text-gray-400">Download all your health records and timeline</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Trash2 size={18} className="text-red-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Delete account</p>
                  <p className="text-xs text-gray-400">Permanently delete all your data</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">→</span>
            </button>
          </div>
        </GlowCard>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlowCard className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Bell size={20} className="text-[#4DEECD] mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-2">Notification preferences</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Control when and how you receive notifications.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-white">Needs attention alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-white">Monitor notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-sm text-white">Informational updates</span>
              <input type="checkbox" className="w-4 h-4 rounded" />
            </label>
          </div>
        </GlowCard>
      </motion.div>

      {/* Privacy Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <GlowCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Privacy summary</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>• Your data is encrypted and stored securely</p>
            <p>• Arc does not share your data with third parties</p>
            <p>• Analysis happens only on your complete data</p>
            <p>• You can export or delete your data at any time</p>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

