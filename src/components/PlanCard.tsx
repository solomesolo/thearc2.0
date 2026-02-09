"use client";

import Link from "next/link";
import React from "react";
import Card from "./Card";

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  highlights: string[];
  featured?: boolean;
  waitlist?: boolean;
  ctaHref?: string;
  onPlanClick?: () => void;
}

export default function PlanCard({ 
  name, 
  price, 
  period, 
  highlights, 
  featured = false, 
  waitlist = false,
  ctaHref = "/checkout",
  onPlanClick
}: PlanCardProps) {
  return (
    <Card
      className={`${
        featured 
          ? 'border-[var(--accent)] scale-105 shadow-[0_0_30px_var(--accent-alpha-20)]' 
          : ''
      } ${waitlist ? 'opacity-75' : ''}`}
    >
      <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{price} EUR</span>
        <span className="text-gray-400 ml-2">/ {period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start">
            <span className="text-[var(--accent)] mr-3 text-xl">✓</span>
            <span className="text-[#E0E0E0] leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
      {waitlist ? (
        <button 
          className="w-full px-6 py-3 border-2 border-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
          disabled
        >
          Join waitlist
        </button>
      ) : (
        onPlanClick ? (
          <button
            onClick={onPlanClick}
            className="inline-flex items-center justify-center w-full px-8 py-3.5 rounded-full bg-[var(--accent)] text-[#071012] border border-transparent text-base font-medium tracking-tight transition-all duration-200 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-alpha-20)] focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] active:bg-[var(--accent-pressed)]"
          >
            Choose plan
          </button>
        ) : (
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center w-full px-8 py-3.5 rounded-full bg-[var(--accent)] text-[#071012] border border-transparent text-base font-medium tracking-tight transition-all duration-200 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-alpha-20)] focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] active:bg-[var(--accent-pressed)]"
          >
            Choose plan
          </Link>
        )
      )}
    </Card>
  );
}

