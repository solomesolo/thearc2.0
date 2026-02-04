"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  TestTube,
  Activity,
  Lock,
  Shield,
  Download,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import Disclosure from "./ui/Disclosure";
import Section from "./Section";

interface TrustItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  summary: string;
  details: string;
}

const dataSources: TrustItem[] = [
  {
    id: "ehr",
    icon: <Database className="w-5 h-5" />,
    label: "Electronic Health Records",
    summary: "Connect your medical records from hospitals and clinics.",
    details:
      "Securely link your EHR accounts to import visit notes, diagnoses, and treatment history. All connections use industry-standard OAuth protocols and are read-only.",
  },
  {
    id: "labs",
    icon: <TestTube className="w-5 h-5" />,
    label: "Lab Results",
    summary: "Import test results from lab portals and providers.",
    details:
      "Connect to major lab networks and portals to automatically import your test results. Results are organized chronologically and linked to your health timeline.",
  },
  {
    id: "wearables",
    icon: <Activity className="w-5 h-5" />,
    label: "Wearable Devices",
    summary: "Sync data from fitness trackers and health devices.",
    details:
      "Connect compatible wearables to stream continuous health data like heart rate, sleep quality, and activity levels. Data syncs automatically and appears in your timeline.",
  },
];

const securityItems: TrustItem[] = [
  {
    id: "encryption",
    icon: <Lock className="w-5 h-5" />,
    label: "End-to-End Encryption",
    summary: "Your data is encrypted at rest and in transit.",
    details:
      "All health data is encrypted using AES-256 encryption. Data in transit is protected with TLS 1.3. Your information is never accessible to third parties without your explicit consent.",
  },
  {
    id: "access",
    icon: <Shield className="w-5 h-5" />,
    label: "Access Controls",
    summary: "You control who can see your data and when.",
    details:
      "Granular permission controls let you decide what data to include, who can access it, and when. You can revoke access at any time. All access is logged and auditable.",
  },
  {
    id: "export",
    icon: <Download className="w-5 h-5" />,
    label: "Data Export & Portability",
    summary: "Export your data anytime in standard formats.",
    details:
      "Your data belongs to you. Export your complete health timeline, documents, and analysis in PDF, JSON, or CSV formats at any time. No vendor lock-in.",
  },
];

export default function DataSourcesPrivacyTrust() {
  return (
    <section id="home.trust" className="relative">
      <Section>
        <div className="max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="typography-h2">Data sources & privacy</h2>
            <p className="typography-body-secondary max-w-2xl mx-auto">
              Understand what you can connect and how your data is protected.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Data Sources */}
            <div className="card-premium">
              <div className="mb-4">
                <h3 className="card-title mb-2">Data Sources</h3>
                <p className="typography-body-secondary text-sm">
                  Connect your health data from multiple sources
                </p>
              </div>
              <div className="space-y-3">
                {dataSources.map((source) => (
                  <div
                    key={source.id}
                    className="pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-accent">{source.icon}</div>
                      <span className="text-sm font-medium text-white">{source.label}</span>
                    </div>
                    <Disclosure
                      summary={source.summary}
                      label="Learn more"
                      details={<p className="typography-body-secondary text-sm">{source.details}</p>}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Security & Privacy */}
            <div className="card-premium">
              <div className="mb-4">
                <h3 className="card-title mb-2">Security & Privacy</h3>
                <p className="typography-body-secondary text-sm">
                  How we protect your sensitive health information
                </p>
              </div>
              <div className="space-y-3">
                {securityItems.map((item) => (
                  <div
                    key={item.id}
                    className="pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-accent">{item.icon}</div>
                      <span className="text-sm font-medium text-white">{item.label}</span>
                    </div>
                    <Disclosure
                      summary={item.summary}
                      label="Learn more"
                      details={<p className="typography-body-secondary text-sm">{item.details}</p>}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="card-premium card-compact bg-[var(--color-accent-bg-subtle)]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-1">Not medical advice</p>
                <p className="typography-body-secondary text-sm">
                  The Arc provides health intelligence and data organization tools. Our platform
                  helps you understand your health data and identify patterns, but it does not
                  provide medical diagnosis, treatment, or advice. Always consult with licensed
                  healthcare professionals for medical decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Section>
    </section>
  );
}

