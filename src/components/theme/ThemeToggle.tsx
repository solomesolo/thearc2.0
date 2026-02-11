"use client";

import { useTheme } from "@/theme/ThemeProvider";

interface ThemeToggleProps {
  variant?: "button" | "icon" | "select";
  showLabel?: boolean;
}

export default function ThemeToggle({ variant = "button", showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        style={{
          padding: "8px",
          borderRadius: "8px",
          backgroundColor: "transparent",
          border: "1px solid var(--border-1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {theme === "light" ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z"
              stroke="var(--text-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.293 13.293C16.3785 14.2075 15.275 14.7755 14.172 15.0435C13.069 15.3115 11.966 15.2795 10.863 14.9475C9.76 14.6155 8.657 13.9835 7.742 13.0685C6.827 12.1535 6.195 11.0505 5.863 9.9475C5.531 8.8445 5.499 7.7415 5.767 6.6385C6.035 5.5355 6.603 4.4325 7.517 3.5185C8.431 2.6045 9.534 2.0365 10.637 1.7685C11.74 1.5005 12.843 1.5325 13.946 1.8645C15.049 2.1965 16.152 2.8285 17.067 3.7435C17.982 4.6585 18.55 5.7615 18.818 6.8645C19.086 7.9675 19.054 9.0705 18.722 10.1735C18.39 11.2765 17.758 12.3795 16.843 13.2935L17.293 13.293Z"
              stroke="var(--text-2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    );
  }

  if (variant === "select") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {showLabel && (
          <label
            style={{
              fontSize: "14px",
              color: "var(--text-2)",
              fontWeight: 500,
            }}
          >
            Appearance
          </label>
        )}
        <select
          value={theme}
          onChange={(e) => {
            const newTheme = e.target.value as "light" | "dark";
            setTheme(newTheme);
          }}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--bg-1)",
            border: "1px solid var(--border-1)",
            color: "var(--text-1)",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="light">Clinical (Light)</option>
          <option value="dark">Power (Dark)</option>
        </select>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to Power Mode" : "Switch to Clinical Mode"}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: "var(--bg-1)",
        border: "1px solid var(--border-1)",
        color: "var(--text-1)",
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-2)";
        e.currentTarget.style.borderColor = "var(--border-2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-1)";
        e.currentTarget.style.borderColor = "var(--border-1)";
      }}
    >
      {theme === "light" ? (
        <>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {showLabel && "Light"}
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.293 13.293C16.3785 14.2075 15.275 14.7755 14.172 15.0435C13.069 15.3115 11.966 15.2795 10.863 14.9475C9.76 14.6155 8.657 13.9835 7.742 13.0685C6.827 12.1535 6.195 11.0505 5.863 9.9475C5.531 8.8445 5.499 7.7415 5.767 6.6385C6.035 5.5355 6.603 4.4325 7.517 3.5185C8.431 2.6045 9.534 2.0365 10.637 1.7685C11.74 1.5005 12.843 1.5325 13.946 1.8645C15.049 2.1965 16.152 2.8285 17.067 3.7435C17.982 4.6585 18.55 5.7615 18.818 6.8645C19.086 7.9675 19.054 9.0705 18.722 10.1735C18.39 11.2765 17.758 12.3795 16.843 13.2935L17.293 13.293Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {showLabel && "Dark"}
        </>
      )}
    </button>
  );
}

