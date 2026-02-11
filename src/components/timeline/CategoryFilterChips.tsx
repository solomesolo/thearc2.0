"use client";

import React from "react";

type Category = "all" | "labs" | "wearables" | "screenings" | "imaging" | "medications" | "diagnoses" | "uploads";

interface CategoryFilterChipsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryFilterChips({ selectedCategory, onCategoryChange }: CategoryFilterChipsProps) {
  const categories: Array<{ id: Category; label: string }> = [
    { id: "all", label: "All" },
    { id: "labs", label: "Labs" },
    { id: "wearables", label: "Wearables" },
    { id: "screenings", label: "Screenings" },
    { id: "imaging", label: "Imaging" },
    { id: "medications", label: "Medications" },
    { id: "diagnoses", label: "Diagnoses" },
    { id: "uploads", label: "Uploads" },
  ];

  return (
    <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>Filter:</span>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          style={{
            padding: "6px 12px",
            backgroundColor: selectedCategory === cat.id ? "var(--primary)" : "transparent",
            color: selectedCategory === cat.id ? "white" : "var(--text-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: selectedCategory === cat.id ? 500 : 400,
            transition: "all 0.2s",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}



