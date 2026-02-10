"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayLifeStep } from "./DayInLifeStorySection";
import SceneUpload from "./scenes/SceneUpload";
import SceneTimeline from "./scenes/SceneTimeline";
import SceneSignals from "./scenes/SceneSignals";
import SceneAction from "./scenes/SceneAction";
import SceneMarketplace from "./scenes/SceneMarketplace";

interface StageSceneSwitcherProps {
  activeStep: DayLifeStep;
  prefersReducedMotion?: boolean;
}

export default function StageSceneSwitcher({
  activeStep,
  prefersReducedMotion = false,
}: StageSceneSwitcherProps) {
  const transitionDuration = prefersReducedMotion ? 0 : 0.2;

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
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

