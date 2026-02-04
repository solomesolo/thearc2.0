"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  TrendingUp,
  Activity,
  Bell,
  Share2,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  explanation: string;
}

const features: Feature[] = [
  {
    id: "centralize",
    title: "Centralize medical documents",
    description: "Upload all your lab results, doctor notes, and test reports into one secure place.",
    icon: <FileText className="w-5 h-5" />,
    explanation: "Everything lives in one secure place, accessible whenever you need it. No more searching through emails or paper files.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-3">
            <h4 className="typography-label">Recent Documents</h4>
            <span className="typography-caption text-accent">12 files</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "Lipid Panel - Jan 2024.pdf", date: "2 days ago", type: "lab" },
              { name: "Doctor Visit Notes.pdf", date: "1 week ago", type: "note" },
              { name: "Blood Work Results.pdf", date: "2 weeks ago", type: "lab" },
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400">{doc.date}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>All documents automatically organized by date</span>
        </div>
      </div>
    ),
  },
  {
    id: "timeline",
    title: "Build a health timeline",
    description: "See your health history in chronological order to understand how your health has changed over time.",
    icon: <TrendingUp className="w-5 h-5" />,
    explanation: "All your health events, tests, and measurements organized by date. Visualize trends and patterns that emerge over months or years.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-4">
            <h4 className="typography-label">Health Timeline</h4>
            <span className="typography-caption text-accent">2024</span>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30" />
            {/* Timeline events */}
            <div className="space-y-4">
              {[
                { date: "Jan 15", event: "Lipid Panel", value: "LDL: 145", color: "bg-accent" },
                { date: "Feb 3", event: "Resting HR", value: "72 bpm", color: "bg-blue-400" },
                { date: "Mar 10", event: "HbA1c Test", value: "5.8%", color: "bg-accent" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-start gap-3 relative"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color} relative z-10`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-white">{item.event}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                    <p className="text-xs text-gray-400">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "patterns",
    title: "Detect patterns across time",
    description: "Spot trends that single appointments miss by seeing connections between different health markers.",
    icon: <Activity className="w-5 h-5" />,
    explanation: "Identify subtle changes that might not be obvious in a single visit. Connect the dots between symptoms, test results, and lifestyle changes.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-4">
            <h4 className="typography-label">Pattern Detected</h4>
            <AlertCircle className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-sm font-medium text-white">LDL Trend</p>
              </div>
              <p className="text-xs text-gray-300 mb-2">Rising over 18 months</p>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                <span className="text-xs text-accent">+12% since baseline</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Activity className="w-3 h-3" />
              <span>Connected to 3 related markers</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "track",
    title: "Track health trends",
    description: "Monitor improvements or declines in key metrics to know what's getting better and what needs attention.",
    icon: <BarChart3 className="w-5 h-5" />,
    explanation: "Track your progress on health goals over time. See which interventions are working and which need adjustment.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-4">
            <h4 className="typography-label">Vitamin D Levels</h4>
            <span className="typography-caption text-accent">Improving</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-end justify-between gap-2 h-20">
              {[45, 52, 58, 65].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 70) * 100}%` }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex-1 bg-gradient-to-t from-accent/60 to-accent rounded-t"
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Jan</span>
              <span className="text-gray-400">Feb</span>
              <span className="text-gray-400">Mar</span>
              <span className="text-accent font-medium">Apr</span>
            </div>
            <div className="pt-3">
              <p className="text-xs text-gray-300">+20 ng/mL after supplementation</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "updates",
    title: "Get intervention updates",
    description: "Receive alerts when action is recommended so you know exactly what to test or change next.",
    icon: <Bell className="w-5 h-5" />,
    explanation: "Get notified when patterns suggest it's time for a follow-up test. Receive personalized recommendations based on your health data.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-4">
            <h4 className="typography-label">Action Items</h4>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          <div className="space-y-2">
            {[
              { text: "Follow-up lipid panel recommended", urgent: true },
              { text: "Review sleep quality trends", urgent: false },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg ${
                  item.urgent
                    ? "bg-accent/10"
                    : "bg-white/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle
                    className={`w-4 h-4 mt-0.5 ${item.urgent ? "text-accent" : "text-gray-400"}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-1">Based on pattern analysis</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "share",
    title: "Share a clean export with doctors",
    description: "Generate a summary of your health timeline to give doctors the context they need in one document.",
    icon: <Share2 className="w-5 h-5" />,
    explanation: "Create professional summaries that highlight what matters most. Save time in appointments by providing comprehensive context upfront.",
    preview: (
      <div className="space-y-4">
        <div className="card-premium card-compact">
          <div className="flex items-center justify-between mb-4">
            <h4 className="typography-label">Export Summary</h4>
            <Share2 className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium text-white">Health Summary.pdf</p>
              </div>
              <div className="space-y-1 text-xs text-gray-400">
                <p>• Last 2 years of key metrics</p>
                <p>• Trend analysis included</p>
                <p>• Ready to share</p>
              </div>
            </div>
            <button className="w-full py-3 px-4 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors">
              Generate Export
            </button>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ReactiveFeaturePanels() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const activeFeatureData = features.find((f) => f.id === activeFeature) || features[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Column: Feature List */}
      <div className="space-y-2">
        {features.map((feature) => {
          const isActive = activeFeature === feature.id;
          return (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFeature(feature.id);
                }
                // Arrow key navigation
                const currentIndex = features.findIndex((f) => f.id === feature.id);
                if (e.key === "ArrowDown" && currentIndex < features.length - 1) {
                  e.preventDefault();
                  const nextFeature = features[currentIndex + 1];
                  setActiveFeature(nextFeature.id);
                  const nextButton = document.querySelector(
                    `[aria-label="${nextFeature.title}"]`
                  ) as HTMLElement;
                  nextButton?.focus();
                }
                if (e.key === "ArrowUp" && currentIndex > 0) {
                  e.preventDefault();
                  const prevFeature = features[currentIndex - 1];
                  setActiveFeature(prevFeature.id);
                  const prevButton = document.querySelector(
                    `[aria-label="${prevFeature.title}"]`
                  ) as HTMLElement;
                  prevButton?.focus();
                }
              }}
              className={`w-full text-left p-5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] ${
                isActive
                  ? "bg-layer-card shadow-card-hover"
                  : "bg-layer-card opacity-80 hover:opacity-100"
              }`}
              aria-label={feature.title}
              aria-current={isActive ? "true" : undefined}
              tabIndex={0}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent-primary)] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="card-title mb-1">{feature.title}</h3>
                  <p className="typography-body-secondary text-sm">{feature.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1] }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Preview Panel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
            className="card-premium sticky top-8"
            style={{ minHeight: '400px' }} // Prevent layout shift
          >
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-primary)] text-black flex items-center justify-center">
                    {activeFeatureData.icon}
                  </div>
                  <h3 className="card-title mb-0">{activeFeatureData.title}</h3>
                </div>
                <p className="typography-body-secondary text-sm">{activeFeatureData.explanation}</p>
              </div>

              {/* Preview Content */}
              <div className="min-h-[300px]">{activeFeatureData.preview}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

