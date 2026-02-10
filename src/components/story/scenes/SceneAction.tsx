"use client";

import React from "react";
import MarketingSceneFrame from "../MarketingSceneFrame";
import FakeCommandCenter from "./FakeCommandCenter";

export default function SceneAction() {
  return (
    <MarketingSceneFrame>
      <FakeCommandCenter />
    </MarketingSceneFrame>
  );
}

