"use client";

import React from "react";
import HealthCommandCenterLayout from "@/components/command-center/HealthCommandCenterLayout";

export default function MarketplacePage() {
  return (
    <HealthCommandCenterLayout
      pageTitle="Marketplace"
      actionInbox={null}
    >
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>Marketplace</h1>
        <p style={{ color: "var(--text-secondary)" }}>Marketplace page - coming soon</p>
      </div>
    </HealthCommandCenterLayout>
  );
}


