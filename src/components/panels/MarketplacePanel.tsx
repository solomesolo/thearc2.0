"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { useDashboardUIStore } from "@/state/useDashboardUIStore";

interface Service {
  id: string;
  name: string;
  why_now: string;
  selected?: boolean;
}

interface MarketplacePanelProps {
  services?: Service[];
}

export default function MarketplacePanel({ services = [] }: MarketplacePanelProps) {
  const [showAll, setShowAll] = useState(false);
  const marketplaceFilter = useDashboardUIStore((state) => state.marketplaceFilter);
  const setMarketplaceFilter = useDashboardUIStore((state) => state.setMarketplaceFilter);

  const handleSelect = (service: Service) => {
    console.log("Service selected:", service);
  };

  const handleLearnMore = (service: Service) => {
    console.log("Learn more:", service);
  };

  return (
    <div
      id="marketplace"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "16px",
        }}
      >
        Services tailored to you
      </h3>

      {marketplaceFilter && (
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--surface-alt)",
            borderRadius: "6px",
            marginBottom: "12px",
            fontSize: "12px",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <span>
            Filtered by: <span style={{ fontWeight: 500 }}>{marketplaceFilter.label}</span>
          </span>
          <button
            onClick={() => setMarketplaceFilter(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              color: "var(--text-secondary)",
            }}
            aria-label="Clear filter"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {services.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(showAll ? services : services.slice(0, 3)).map((service) => (
            <div
              key={service.id}
              style={{
                padding: "12px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "6px",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontWeight: 500 }}>Why now:</span> {service.why_now}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleSelect(service)}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    backgroundColor: service.selected ? "var(--success)" : "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  {service.selected ? (
                    <>
                      <Check size={14} />
                      Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </button>
                <button
                  onClick={() => handleLearnMore(service)}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "underline",
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
          {services.length > 3 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                color: "var(--primary)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              See all services
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ marginBottom: "4px" }}>No services recommended right now.</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
            }}
          >
            Complete your data to personalize service options.
          </div>
        </div>
      )}
    </div>
  );
}
