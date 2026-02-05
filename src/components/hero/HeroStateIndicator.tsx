"use client";

/**
 * HeroStateIndicator Component
 * 
 * Read-only visual indicator showing current hero state.
 * Positioned absolutely within the hero visual container.
 * No click behavior - purely visual indicator (calm "status legend").
 */

import React from "react";

export type HeroVisualState = 'overview' | 'aligned' | 'foresight';

interface HeroStateIndicatorProps {
  state: HeroVisualState;
  prefersReducedMotion?: boolean;
}

export function HeroStateIndicator({ state, prefersReducedMotion = false }: HeroStateIndicatorProps) {
  // Label mapping: state → display label
  const options: { value: HeroVisualState; label: string }[] = [
    { value: 'overview', label: 'Your medical records' },
    { value: 'aligned', label: 'Your personal trend' },
    { value: 'foresight', label: 'Your early signals' },
  ];
  
  return (
    <div className="hero-state-indicator">
      {options.map((option) => {
        const isActive = option.value === state;
        // Active dot color: mint (#9FD8C6) for "foresight", warm neutral for others
        const dotColor = isActive 
          ? (option.value === 'foresight' ? '#9FD8C6' : 'rgba(236,218,200,0.65)')
          : 'rgba(236,218,200,0.35)';
        
        return (
          <div
            key={option.value}
            className={`hero-state-indicator-item ${isActive ? 'hero-state-indicator-active' : ''}`}
            aria-label={`Current state: ${option.label}`}
          >
            {/* Dot */}
            <span 
              className="hero-state-indicator-dot"
              style={{ backgroundColor: dotColor }}
            />
            {/* Label */}
            <span className="hero-state-indicator-label">
              {option.label}
              {/* Progress underline - only for active state, disabled for reduced motion */}
              {isActive && !prefersReducedMotion && (
                <span className="hero-state-indicator-progress" />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

