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
    bg-[var(--accent)]
    text-[#071012]
    border
    border-transparent
    text-base
    font-medium
    tracking-tight
    transition-all
    duration-200
    ease-out
    hover:bg-[var(--accent-hover)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--accent-alpha-20)]
    focus:ring-offset-2
    focus:ring-offset-[var(--page-bg)]
    active:bg-[var(--accent-pressed)]
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
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
      {...props}
    >
      {children}
    </button>
  );
}

