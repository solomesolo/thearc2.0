"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PatientWorkbench from "./PatientWorkbench";
import { QueueItem } from "@/lib/workbenchTypes";

interface PatientWorkbenchDrawerProps {
  isOpen: boolean;
  queueItem: QueueItem | null;
  onClose: () => void;
  onResolve: (queueItemId: string) => void;
  onSnooze: (queueItemId: string, until: string, reason: string) => void;
  onEscalate: (queueItemId: string, reason: string) => void;
}

export default function PatientWorkbenchDrawer({
  isOpen,
  queueItem,
  onClose,
  onResolve,
  onSnooze,
  onEscalate,
}: PatientWorkbenchDrawerProps) {
  // Focus trap and ESC handling
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!queueItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-[999]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-0 top-[56px] w-[624px] h-[calc(100vh-56px)] bg-white shadow-2xl z-[1000] flex flex-col overflow-hidden"
          >
            <PatientWorkbench
              queueItem={queueItem}
              onClose={onClose}
              onResolve={onResolve}
              onSnooze={onSnooze}
              onEscalate={onEscalate}
              mode="drawer"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

