"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

const notifications = [
  {
    group: "Needs attention",
    items: [
      {
        title: "CRP follow-up due",
        message: "8-week confirmation check recommended based on last elevated reading",
        time: "2 days ago",
        read: false,
      },
    ],
  },
  {
    group: "Monitor",
    items: [
      {
        title: "HbA1c trend",
        message: "Slight upward drift detected. Next check recommended in 6 months",
        time: "1 week ago",
        read: true,
      },
    ],
  },
  {
    group: "Informational",
    items: [
      {
        title: "New data added",
        message: "Lab panel uploaded and added to your timeline",
        time: "3 days ago",
        read: true,
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Notifications</h1>
        <p className="text-gray-400">Only meaningful notifications</p>
      </motion.div>

      {/* Policy Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="p-6 bg-[#4DEECD]/5 border border-[#4DEECD]/20">
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">No constant alerts.</strong> Only when attention is actually needed.
          </p>
        </GlowCard>
      </motion.div>

      {/* Notifications by Group */}
      <div className="space-y-6">
        {notifications.map((group, groupIndex) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4">{group.group}</h2>
            <div className="space-y-3">
              {group.items.map((item, itemIndex) => (
                <GlowCard
                  key={itemIndex}
                  className={`p-5 ${!item.read ? "border border-[#4DEECD]/30" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        {!item.read && (
                          <div className="w-2 h-2 rounded-full bg-[#4DEECD]"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{item.message}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
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

