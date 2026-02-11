"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DayLifeStepId } from "./dayInLifeSteps";
import SceneUpload from "./scenes/SceneUpload";
import SceneTimeline from "./scenes/SceneTimeline";
import SceneSignals from "./scenes/SceneSignals";
import SceneAction from "./scenes/SceneAction";
import SceneMarketplace from "./scenes/SceneMarketplace";

interface StageSceneSwitcherProps {
  activeStep: DayLifeStepId;
}

export default function StageSceneSwitcher({ activeStep }: StageSceneSwitcherProps) {
  const renderScene = () => {
    switch (activeStep) {
      case "upload":
        return <SceneUpload />;
      case "timeline":
        return <SceneTimeline />;
      case "signals":
        return <SceneSignals />;
      case "action":
        return <SceneAction />;
      case "marketplace":
        return <SceneMarketplace />;
      default:
        return <SceneUpload />;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-[24px] border shadow-lgsoft"
      style={{
        height: "520px",
        maxHeight: "520px",
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 60% 40%, var(--accent-soft), transparent 60%)",
        }}
      />

      {/* Scene layer with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
