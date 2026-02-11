"use client";

import Link from "next/link";
import React from "react";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({ href, onClick, children, variant = "primary", className = "" }: CTAButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-transparent text-base font-medium tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`;
  const baseStyle: React.CSSProperties = {
    backgroundColor: "var(--accent)",
    color: "var(--bg)",
    borderColor: "transparent",
  };
  const hoverStyle: React.CSSProperties = {
    backgroundColor: "var(--accent-2)",
  };

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        style={baseStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseStyle)}
      >
        {children}
      </button>
    );
  }

  if (variant === "primary") {
    return (
      <Link
        href={href || "#"}
        className={baseClasses}
        style={baseStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseStyle)}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href || "#"}
      className={baseClasses}
      style={baseStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseStyle)}
    >
      {children}
    </Link>
  );
}

