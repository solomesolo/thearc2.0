"use client";

import React from "react";
import Link from "next/link";

interface ArcButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function ArcButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  ...props
}: ArcButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    px-8 py-3.5
    rounded-full
    text-base
    font-medium
    tracking-tight
    transition-all
    duration-200
    ease-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
  `;

  const buttonStyle: React.CSSProperties = {
    backgroundColor: `var(--accent-primary)`,
    color: `rgb(var(--btn-primary-text))`,
    border: "none",
    boxShadow: `var(--shadow-soft)`,
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.backgroundColor = `var(--accent-strong)`;
          }
        }}
        onMouseLeave={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.backgroundColor = `var(--accent-primary)`;
          }
        }}
        onFocus={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.outline = "2px solid var(--accent-soft)";
            e.currentTarget.style.outlineOffset = "2px";
          }
        }}
        onBlur={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.outline = "none";
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (typeof window !== "undefined" && e.currentTarget) {
          e.currentTarget.style.backgroundColor = `var(--accent-strong)`;
        }
      }}
      onMouseLeave={(e) => {
        if (typeof window !== "undefined" && e.currentTarget) {
          e.currentTarget.style.backgroundColor = `var(--accent-primary)`;
        }
      }}
      onFocus={(e) => {
        if (typeof window !== "undefined" && e.currentTarget) {
          e.currentTarget.style.outline = "2px solid var(--accent-soft)";
          e.currentTarget.style.outlineOffset = "2px";
        }
      }}
      onBlur={(e) => {
        if (typeof window !== "undefined" && e.currentTarget) {
          e.currentTarget.style.outline = "none";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

