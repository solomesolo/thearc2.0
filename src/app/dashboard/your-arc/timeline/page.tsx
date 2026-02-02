"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Search, FileText, Activity, Image as ImageIcon, Stethoscope, Calendar } from "lucide-react";

type TimelineCategory = "all" | "labs" | "documents" | "imaging" | "wearables" | "notes";

interface TimelineEntry {
  id: string;
  date: string;
  dateDisplay: string;
  category: Exclude<TimelineCategory, "all">;
  source: string;
  summary: string;
  details: {
    title: string;
    description: string;
    keyFindings?: string[];
    values?: { label: string; value: string; status?: "normal" | "elevated" | "low" }[];
    recommendations?: string[];
    provider?: string;
    location?: string;
  };
}

const timelineEntries: TimelineEntry[] = [
  {
    id: "1",
    date: "2025-01-08",
    dateDisplay: "Jan 8, 2025",
    category: "labs",
    source: "LabCorp",
    summary: "Comprehensive metabolic panel — Lipid panel stable, HbA1c slight increase",
    details: {
      title: "Comprehensive Metabolic Panel",
      description: "Quarterly metabolic screening including lipids, glucose, and HbA1c.",
      keyFindings: [
        "Total cholesterol: 185 mg/dL (stable)",
        "LDL: 110 mg/dL (stable across 3 panels)",
        "HDL: 65 mg/dL (within optimal range)",
        "HbA1c: 5.4% (increased from 5.2% in previous panel)",
        "Fasting glucose: 92 mg/dL (stable)",
      ],
      values: [
        { label: "Total Cholesterol", value: "185 mg/dL", status: "normal" },
        { label: "LDL", value: "110 mg/dL", status: "normal" },
        { label: "HDL", value: "65 mg/dL", status: "normal" },
        { label: "HbA1c", value: "5.4%", status: "elevated" },
        { label: "Fasting Glucose", value: "92 mg/dL", status: "normal" },
      ],
      recommendations: ["Recheck HbA1c in 6 months to confirm trend", "Continue current lipid management"],
      provider: "Dr. Sarah Martinez",
      location: "LabCorp — Downtown Clinic",
    },
  },
  {
    id: "2",
    date: "2024-12-15",
    dateDisplay: "Dec 15, 2024",
    category: "labs",
    source: "Quest Diagnostics",
    summary: "Inflammation markers panel — CRP elevated, all other markers normal",
    details: {
      title: "Inflammation Markers Panel",
      description: "hsCRP, ESR, and fibrinogen levels to assess inflammatory status.",
      keyFindings: [
        "hsCRP: 3.2 mg/L (elevated, previous was 1.8 mg/L)",
        "ESR: 8 mm/hr (normal)",
        "Fibrinogen: 280 mg/dL (normal)",
      ],
      values: [
        { label: "hsCRP", value: "3.2 mg/L", status: "elevated" },
        { label: "ESR", value: "8 mm/hr", status: "normal" },
        { label: "Fibrinogen", value: "280 mg/dL", status: "normal" },
      ],
      recommendations: ["Repeat CRP in 8 weeks to confirm if this is a trend or isolated elevation"],
      provider: "Dr. Sarah Martinez",
      location: "Quest Diagnostics — Main Lab",
    },
  },
  {
    id: "3",
    date: "2024-12-10",
    dateDisplay: "Dec 10, 2024",
    category: "wearables",
    source: "Oura Ring",
    summary: "Sleep consistency improved — 10-week trend analysis",
    details: {
      title: "Sleep Pattern Analysis",
      description: "10-week rolling analysis of sleep duration, consistency, and recovery metrics.",
      keyFindings: [
        "Average sleep duration: 7.2 hours (improved from 6.8 hours)",
        "Sleep consistency score: 82% (improved from 68%)",
        "Night-to-night variability: Decreased by 23%",
        "Recovery metrics: HRV trending upward",
      ],
      recommendations: ["Continue current sleep routine", "Monitor for sustained improvement"],
    },
  },
  {
    id: "4",
    date: "2024-11-20",
    dateDisplay: "Nov 20, 2024",
    category: "labs",
    source: "LabCorp",
    summary: "Hormone panel — All values within normal range",
    details: {
      title: "Hormone Health Panel",
      description: "Comprehensive hormone assessment including thyroid, cortisol, and sex hormones.",
      keyFindings: [
        "TSH: 2.1 mIU/L (normal)",
        "Free T4: 1.2 ng/dL (normal)",
        "Cortisol AM: 18.5 mcg/dL (normal)",
        "Testosterone: 650 ng/dL (normal for age)",
      ],
      values: [
        { label: "TSH", value: "2.1 mIU/L", status: "normal" },
        { label: "Free T4", value: "1.2 ng/dL", status: "normal" },
        { label: "Cortisol AM", value: "18.5 mcg/dL", status: "normal" },
        { label: "Testosterone", value: "650 ng/dL", status: "normal" },
      ],
      recommendations: ["Routine monitoring in 12 months", "No intervention needed"],
      provider: "Dr. Sarah Martinez",
      location: "LabCorp — Downtown Clinic",
    },
  },
  {
    id: "5",
    date: "2024-11-05",
    dateDisplay: "Nov 5, 2024",
    category: "documents",
    source: "Cardiology Associates",
    summary: "Cardiology consult — Annual preventive review, all findings normal",
    details: {
      title: "Preventive Cardiology Consultation",
      description: "Annual cardiovascular risk assessment and review of lipid trends.",
      keyFindings: [
        "Blood pressure: 118/72 mmHg (normal)",
        "Resting heart rate: 62 bpm (normal)",
        "ECG: Normal sinus rhythm, no abnormalities",
        "Lipid trends: Stable over past 18 months",
      ],
      recommendations: [
        "Continue current cardiovascular prevention protocol",
        "No follow-up needed unless symptoms develop",
      ],
      provider: "Dr. James Chen",
      location: "Cardiology Associates — Main Office",
    },
  },
  {
    id: "6",
    date: "2024-10-18",
    dateDisplay: "Oct 18, 2024",
    category: "imaging",
    source: "Radiology Center",
    summary: "Abdominal ultrasound — Baseline scan, all findings normal",
    details: {
      title: "Abdominal Ultrasound",
      description: "Baseline abdominal imaging to assess liver, gallbladder, kidneys, and pancreas.",
      keyFindings: [
        "Liver: Normal size and echogenicity, no masses",
        "Gallbladder: No stones or wall thickening",
        "Kidneys: Normal size and contour, no calculi",
        "Pancreas: Normal appearance",
      ],
      recommendations: ["Baseline established — no follow-up needed unless clinically indicated"],
      provider: "Dr. Emily Rodriguez",
      location: "Radiology Center — Imaging Department",
    },
  },
  {
    id: "7",
    date: "2024-10-01",
    dateDisplay: "Oct 1, 2024",
    category: "documents",
    source: "Dental Care Center",
    summary: "Dental cleaning and exam — Gingival inflammation noted, 6-month follow-up recommended",
    details: {
      title: "Dental Examination and Cleaning",
      description: "Routine dental examination with cleaning and periodontal assessment.",
      keyFindings: [
        "Gingival inflammation: Mild in lower anterior region",
        "Plaque index: Moderate",
        "No cavities detected",
        "X-rays: No new findings",
      ],
      recommendations: [
        "6-month cleaning interval recommended due to gingival findings",
        "Improved home care routine suggested",
      ],
      provider: "Dr. Michael Park",
      location: "Dental Care Center — Main Office",
    },
  },
  {
    id: "8",
    date: "2024-09-15",
    dateDisplay: "Sep 15, 2024",
    category: "documents",
    source: "Primary Care Clinic",
    summary: "Annual physical exam — Comprehensive review, vaccination updated",
    details: {
      title: "Annual Physical Examination",
      description: "Comprehensive annual health assessment including physical exam and preventive care updates.",
      keyFindings: [
        "Vital signs: All within normal limits",
        "Physical examination: Unremarkable",
        "Vaccination: Tdap booster administered",
        "Health maintenance: Up to date",
      ],
      recommendations: ["Continue routine monitoring", "Next annual exam in 12 months"],
      provider: "Dr. Sarah Martinez",
      location: "Primary Care Clinic — Main Office",
    },
  },
  {
    id: "9",
    date: "2024-08-22",
    dateDisplay: "Aug 22, 2024",
    category: "labs",
    source: "LabCorp",
    summary: "Lipid panel — All values stable, consistent with previous panels",
    details: {
      title: "Lipid Panel",
      description: "Fasting lipid profile to assess cardiovascular risk markers.",
      keyFindings: [
        "Total cholesterol: 182 mg/dL (stable)",
        "LDL: 108 mg/dL (stable)",
        "HDL: 64 mg/dL (stable)",
        "Triglycerides: 95 mg/dL (normal)",
      ],
      values: [
        { label: "Total Cholesterol", value: "182 mg/dL", status: "normal" },
        { label: "LDL", value: "108 mg/dL", status: "normal" },
        { label: "HDL", value: "64 mg/dL", status: "normal" },
        { label: "Triglycerides", value: "95 mg/dL", status: "normal" },
      ],
      recommendations: ["Stable values — continue current management", "Next panel in 12 months"],
      provider: "Dr. Sarah Martinez",
      location: "LabCorp — Downtown Clinic",
    },
  },
  {
    id: "10",
    date: "2024-07-10",
    dateDisplay: "Jul 10, 2024",
    category: "wearables",
    source: "Apple Watch",
    summary: "Activity and recovery summary — Increased training load, recovery metrics stable",
    details: {
      title: "Activity and Recovery Analysis",
      description: "Monthly summary of activity levels, heart rate variability, and recovery metrics.",
      keyFindings: [
        "Average daily activity: 12,500 steps (increased from 10,200)",
        "HRV: Stable despite increased load",
        "Resting heart rate: 58 bpm (improved)",
        "Recovery score: 78% average (maintained)",
      ],
      recommendations: ["Continue gradual activity increase", "Monitor recovery with increased load"],
    },
  },
  {
    id: "11",
    date: "2024-06-05",
    dateDisplay: "Jun 5, 2024",
    category: "notes",
    source: "Dr. Sarah Martinez",
    summary: "Protocol adjustment note — Supplement timing optimized based on lab results",
    details: {
      title: "Protocol Adjustment",
      description: "Clinical note documenting adjustment to supplement protocol based on recent lab findings.",
      keyFindings: [
        "Supplement timing adjusted to optimize absorption",
        "Dosage maintained at current levels",
        "Next review scheduled in 3 months",
      ],
      recommendations: ["Continue adjusted protocol", "Monitor for any changes in next panel"],
      provider: "Dr. Sarah Martinez",
      location: "Primary Care Clinic — Telehealth",
    },
  },
  {
    id: "12",
    date: "2024-05-15",
    dateDisplay: "May 15, 2024",
    category: "labs",
    source: "Quest Diagnostics",
    summary: "Baseline comprehensive panel — Initial screening, all markers within reference ranges",
    details: {
      title: "Baseline Comprehensive Health Panel",
      description: "Initial comprehensive screening panel establishing baseline values for longitudinal tracking.",
      keyFindings: [
        "Metabolic markers: All within normal ranges",
        "Lipid panel: Optimal values",
        "Inflammation markers: Low baseline",
        "Liver function: Normal",
        "Kidney function: Normal",
      ],
      values: [
        { label: "HbA1c", value: "5.2%", status: "normal" },
        { label: "Total Cholesterol", value: "180 mg/dL", status: "normal" },
        { label: "LDL", value: "105 mg/dL", status: "normal" },
        { label: "HDL", value: "63 mg/dL", status: "normal" },
        { label: "hsCRP", value: "1.8 mg/L", status: "normal" },
      ],
      recommendations: ["Baseline established — continue routine monitoring", "Next comprehensive panel in 6 months"],
      provider: "Dr. Sarah Martinez",
      location: "Quest Diagnostics — Main Lab",
    },
  },
];

const categoryConfig: Record<Exclude<TimelineCategory, "all">, { label: string; icon: React.ReactNode; color: string }> = {
  labs: {
    label: "Labs",
    icon: <Activity size={14} />,
    color: "#4DEECD",
  },
  documents: {
    label: "Documents",
    icon: <FileText size={14} />,
    color: "#8B5CF6",
  },
  imaging: {
    label: "Imaging",
    icon: <ImageIcon size={14} />,
    color: "#F59E0B",
  },
  wearables: {
    label: "Wearables",
    icon: <Activity size={14} />,
    color: "#14B8A6",
  },
  notes: {
    label: "Notes",
    icon: <Stethoscope size={14} />,
    color: "#EF4444",
  },
};

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    let filtered = timelineEntries;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((entry) => entry.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.summary.toLowerCase().includes(query) ||
          entry.source.toLowerCase().includes(query) ||
          entry.details.title.toLowerCase().includes(query) ||
          entry.details.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const handleToggleExpand = (entryId: string) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Timeline</h1>
        <p className="text-gray-400">Unified chronological view of all your health data</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DEECD]/30 focus:ring-1 focus:ring-[#4DEECD]/20 transition-all"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all" as TimelineCategory, label: "All" },
            { id: "labs" as TimelineCategory, label: "Labs" },
            { id: "documents" as TimelineCategory, label: "Documents" },
            { id: "imaging" as TimelineCategory, label: "Imaging" },
            { id: "wearables" as TimelineCategory, label: "Wearables" },
            { id: "notes" as TimelineCategory, label: "Notes" },
          ].map((category) => {
            const config = category.id === "all" ? null : categoryConfig[category.id];
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === category.id
                    ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {config && <span style={{ color: selectedCategory === category.id ? config.color : undefined }}>{config.icon}</span>}
                {category.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Timeline Entries */}
      <div className="space-y-3">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, index) => {
            const config = categoryConfig[entry.category];
            const isExpanded = expandedEntry === entry.id;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <GlowCard className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Date Column */}
                    <div className="flex-shrink-0 w-24">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                        <Calendar size={12} />
                        {entry.dateDisplay}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 flex-shrink-0"
                            style={{
                              backgroundColor: `${config.color}15`,
                              color: config.color,
                              border: `1px solid ${config.color}40`,
                            }}
                          >
                            {config.icon}
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-400 truncate">{entry.source}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-3 leading-relaxed">{entry.summary}</p>

                      {/* View Details Button */}
                      <button
                        onClick={() => handleToggleExpand(entry.id)}
                        className="text-xs text-[#4DEECD] hover:text-[#4DEECD]/80 transition-colors inline-flex items-center gap-1"
                      >
                        {isExpanded ? "Hide details" : "View details"}
                        <span
                          className={`inline-block transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      </button>

                      {/* Expanded Details */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-2">{entry.details.title}</h4>
                                <p className="text-xs text-gray-300 leading-relaxed mb-3">{entry.details.description}</p>
                              </div>

                              {entry.details.keyFindings && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Key findings</p>
                                  <ul className="space-y-1.5">
                                    {entry.details.keyFindings.map((finding, idx) => (
                                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></span>
                                        <span>{finding}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {entry.details.values && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Values</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {entry.details.values.map((value, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2 rounded bg-white/5 border border-white/5 flex items-center justify-between"
                                      >
                                        <span className="text-xs text-gray-400">{value.label}</span>
                                        <span
                                          className={`text-xs font-medium ${
                                            value.status === "elevated"
                                              ? "text-amber-400"
                                              : value.status === "low"
                                              ? "text-blue-400"
                                              : "text-green-400"
                                          }`}
                                        >
                                          {value.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {entry.details.recommendations && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Recommendations</p>
                                  <ul className="space-y-1.5">
                                    {entry.details.recommendations.map((rec, idx) => (
                                      <li key={idx} className="text-xs text-[#4DEECD] flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#4DEECD] mt-1.5 flex-shrink-0"></span>
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {(entry.details.provider || entry.details.location) && (
                                <div className="pt-2 border-t border-white/5">
                                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                    {entry.details.provider && (
                                      <div>
                                        <span className="text-gray-500">Provider: </span>
                                        <span className="text-gray-300">{entry.details.provider}</span>
                                      </div>
                                    )}
                                    {entry.details.location && (
                                      <div>
                                        <span className="text-gray-500">Location: </span>
                                        <span className="text-gray-300">{entry.details.location}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })
        ) : (
          <GlowCard className="p-8 text-center">
            <p className="text-gray-400">No entries found matching your filters.</p>
          </GlowCard>
        )}
      </div>
    </div>
  );
}

