"use client";

import React from "react";

type SettingsSection = "account" | "connections" | "notifications" | "privacy" | "preferences" | "support";

interface SettingsNavProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const sections: Array<{ id: SettingsSection; label: string }> = [
  { id: "account", label: "Account" },
  { id: "connections", label: "Data & connections" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy & security" },
  { id: "preferences", label: "Preferences" },
  { id: "support", label: "Support" },
];

export default function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  return (
    <nav
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "8px",
      }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          style={{
            width: "100%",
            padding: "12px 16px",
            textAlign: "left",
            backgroundColor: activeSection === section.id ? "var(--surface-alt)" : "transparent",
            color: activeSection === section.id ? "var(--text-primary)" : "var(--text-secondary)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeSection === section.id ? 500 : 400,
            transition: "all 0.2s",
          }}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}



