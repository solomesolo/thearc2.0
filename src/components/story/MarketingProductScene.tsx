"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketingSceneFrame from "./MarketingSceneFrame";
import FakeDocumentsPage from "./scenes/FakeDocumentsPage";
import FakeTimelinePage from "./scenes/FakeTimelinePage";
import FakeSignalsPage from "./scenes/FakeSignalsPage";
import FakeCommandCenter from "./scenes/FakeCommandCenter";
import FakeMarketplacePage from "./scenes/FakeMarketplacePage";

export type SceneStep = "upload" | "timeline" | "signals" | "action" | "marketplace";

interface MarketingProductSceneProps {
  step: SceneStep;
  prefersReducedMotion?: boolean;
}

export default function MarketingProductScene({
  step,
  prefersReducedMotion = false,
}: MarketingProductSceneProps) {
  const transitionDuration = prefersReducedMotion ? 0 : 0.2;

  const renderScene = () => {
    switch (step) {
      case "upload":
        return <FakeDocumentsPage />;
      case "timeline":
        return <FakeTimelinePage />;
      case "signals":
        return <FakeSignalsPage />;
      case "action":
        return <FakeCommandCenter />;
      case "marketplace":
        return <FakeMarketplacePage />;
      default:
        return <FakeDocumentsPage />;
    }
  };

  return (
    <MarketingSceneFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: "easeOut" }}
          style={{
            height: "clamp(500px, 60vh, 700px)",
            minHeight: "500px",
            overflow: "hidden",
          }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </MarketingSceneFrame>
  );
}


