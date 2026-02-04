"use client";

import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    font-medium
    tracking-tight
    transition-all
    [transition-duration:var(--duration-normal)]
    [transition-timing-function:var(--ease-ui)]
    rounded-[14px]
    focus-visible:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:pointer-events-none
  `;

  // Size classes - Luxury button heights (42px for hero primary)
  const sizeClasses = {
    sm: "px-6 py-2.5 text-sm h-[40px]",
    md: "px-8 py-3 text-base h-[42px]", // Hero primary: 42px
    lg: "px-10 py-3.5 text-lg h-[44px]",
  };

         // Variant classes - Luxury button style (understated, premium)
         const variantClasses = {
           primary: `
             bg-[rgba(255,255,255,0.08)]
             text-[var(--text-0)]
             border
             border-[var(--stroke-0)]
             hover:bg-[rgba(255,255,255,0.12)]
             hover:border-[var(--stroke-0)]
             hover:shadow-[var(--shadow-1)]
             hover:-translate-y-0.5
             focus-visible:ring-2
             focus-visible:ring-[var(--color-accent-primary)]/40
             focus-visible:ring-offset-2
             focus-visible:ring-offset-[var(--color-bg-page)]
             active:bg-[rgba(255,255,255,0.10)]
             active:border-[var(--stroke-0)]
             active:translate-y-0
           `,
    secondary: `
      bg-transparent
      text-[var(--color-accent-primary)]
      border
      border-[var(--color-border-base)]
      hover:bg-[var(--color-accent-bg-subtle)]
      hover:border-[var(--color-border-accent)]
      hover:shadow-[var(--shadow-button-hover)]
      focus-visible:ring-[var(--color-accent-primary)]
      active:bg-[var(--color-accent-bg-soft)]
    `,
    ghost: `
      bg-transparent
      text-[var(--color-text-primary)]
      border
      border-transparent
      hover:bg-[var(--color-bg-section)]
      hover:text-[var(--color-text-primary)]
      focus-visible:ring-[var(--color-accent-primary)]
      active:bg-[var(--color-bg-card)]
    `,
  };

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.replace(/\s+/g, " ").trim();

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}

