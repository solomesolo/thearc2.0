"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcTokens } from "@/lib/ui/arcTokens";

interface BaselineSignal {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: string;
}

interface TrackingPlanItem {
  id: string;
  title: string;
  description: string;
}

interface InvestigationSupportingDataAccordionProps {
  baselineSignals: BaselineSignal[];
  trackingPlan: TrackingPlanItem[];
  rawMetrics?: string;
}

export default function InvestigationSupportingDataAccordion({
  baselineSignals,
  trackingPlan,
  rawMetrics,
}: InvestigationSupportingDataAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: arcTokens.surface.card,
        border: `1px solid ${arcTokens.border.default}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        marginBottom: "24px",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: isOpen ? "16px" : "0",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: arcTokens.text.primary,
            margin: 0,
          }}
        >
          Supporting data
        </h2>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke={arcTokens.text.secondary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "16px" }}>
              {/* Baseline Labs */}
              <div>
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: arcTokens.text.primary,
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Baseline labs
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {baselineSignals.map((signal) => (
                    <div
                      key={signal.id}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: arcTokens.text.primary,
                              marginBottom: "4px",
                            }}
                          >
                            {signal.name}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: arcTokens.text.primary,
                              }}
                            >
                              {signal.value}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                color: arcTokens.text.secondary,
                              }}
                            >
                              {signal.unit}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: arcTokens.text.tertiary,
                          }}
                        >
                          {signal.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Rules */}
              <div>
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: arcTokens.text.primary,
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Tracking rules
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {trackingPlan.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: arcTokens.bg.panel,
                        border: `1px solid ${arcTokens.border.default}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            color: arcTokens.accent.primary,
                            marginTop: "2px",
                          }}
                        >
                          →
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: arcTokens.text.primary,
                              marginBottom: "4px",
                            }}
                          >
                            {item.title}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: arcTokens.text.secondary,
                            }}
                          >
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw Metrics */}
              {rawMetrics && (
                <div>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: arcTokens.text.primary,
                      marginBottom: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Raw metrics
                  </h3>
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      backgroundColor: arcTokens.bg.panel,
                      border: `1px solid ${arcTokens.border.default}`,
                      fontSize: "12px",
                      color: arcTokens.text.secondary,
                      fontFamily: "monospace",
                    }}
                  >
                    {rawMetrics}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


