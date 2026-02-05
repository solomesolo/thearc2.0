"use client";

/**
 * HeroSection Component
 * 
 * Hero visual is SVG-only system: Constellation → Trajectory → Signal
 * 
 * Performance optimizations:
 * - Precomputed dot maps (no client-side generation, prevents hydration mismatch)
 * - Deterministic positions (no Math.random(), ensures CLS ~0)
 * - SVG optimized (lightweight gradients, no heavy filters)
 * - Non-blocking JS (deferred URL sync, requestIdleCallback)
 * - Reduced motion support (instant transitions)
 * - Min-height prevents CLS
 * 
 * No photography, illustrations, or generic gradients - only SVG system
 */

import React from "react";
import { ArcButton } from "./ui/ArcButton";
import { useHeroAutoStates } from "./hero/useHeroAutoStates";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  supportingLine?: string;
  bullets?: string[];
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  visualState?: 'overview' | 'aligned' | 'foresight';
  enableUrlSync?: boolean;
}

type HeroState = 'overview' | 'aligned' | 'foresight';

// HeroStateControl removed - replaced by HeroStateIndicator (read-only, inside visual)

// Design input schemas (matching design delivery formats)

// Dot definition matching dots.desktop.json / dots.mobile.json schema
interface DotData {
  id: string;
  tier: 'far' | 'near' | 'aligned';
  scatter: { x: number; y: number };
  aligned: { x: number; y: number };
  stateMode: 'aligned' | 'scatter';
}

interface DotMap {
  viewBox: [number, number, number, number];
  dots: DotData[];
}

// Internal Dot interface (converted from DotData for rendering)
// Exported for use in HeroVisualSVG
export interface Dot {
  id: string;
  mode: 'scatter' | 'aligned';
  scatterX: number;
  scatterY: number;
  alignedX: number;
  alignedY: number;
  alignedOffsetY: number; // Vertical offset (±6px) for aligned dots to avoid "plotted data" look
  size: number;
  opacity: number;
  isNear: boolean; // true for near dots (layer 4), false for far dots (layer 3)
}

// Curve schema matching curve.json
interface CurveData {
  viewBox: [number, number, number, number];
  path: string;
  controlPoints?: Array<{ x: number; y: number }>;
  spline?: string;
}

// Signal schema matching signal.json
interface SignalData {
  viewBox: [number, number, number, number];
  signal: {
    t: number;
    x: number;
    y: number;
    tooltipOffset: { dx: number; dy: number };
    emphasisZone?: {
      tStart: number;
      tEnd: number;
    };
  };
}

// Fragment schemas removed - UI screenshots not allowed per design requirements

// Load dot maps from JSON files (deterministic, no randomness)
import dotsDesktopData from './hero/data/dots.desktop.json';
import dotsMobileData from './hero/data/dots.mobile.json';

// Aligned dot coordinates (12 exact points) - stored as array for index-based offset calculation
const ALIGNED_DOT_COORDS = [
  { x: 585, y: 356 },
  { x: 615, y: 350 },
  { x: 642, y: 345 },
  { x: 670, y: 336 },
  { x: 698, y: 333 },
  { x: 725, y: 326 },
  { x: 752, y: 321 },
  { x: 778, y: 314 },
  { x: 804, y: 309 },
  { x: 830, y: 302 },
  { x: 856, y: 296 },
  { x: 882, y: 290 },
];

// Helper function to convert DotData (from JSON) to Dot (for rendering)
// Adds deterministic vertical offset (±6px) to aligned dots to avoid "plotted data" look
// Aligned dots alternate above/below: odd indices y-6, even indices y+6
function convertDotData(dotData: DotData, alignedIndex?: number): Dot {
  // Tier determines visual layer: "far" | "near" | "aligned"
  // Aligned dots are rendered in the "near" layer (dotsNear group)
  const isNear = dotData.tier === 'near' || dotData.tier === 'aligned';
  const isAligned = dotData.stateMode === 'aligned';
  
  // Offsets are already applied in JSON coordinates (per section A6)
  // JSON contains final aligned coordinates with ±6px offsets applied
  // No additional offset calculation needed - use aligned coordinates directly
  const offsetY = 0;
  
  // Dot sizes: Far=3, Near=5, Aligned=6
  let size = 3; // Default to far
  if (dotData.tier === 'near') {
    size = 5;
  } else if (dotData.tier === 'aligned') {
    size = 6; // Aligned dots are always radius 6
  }
  
  return {
    id: dotData.id,
    mode: dotData.stateMode, // 'aligned' or 'scatter'
    scatterX: dotData.scatter.x,
    scatterY: dotData.scatter.y,
    alignedX: dotData.aligned.x,
    alignedY: dotData.aligned.y,
    alignedOffsetY: offsetY, // Vertical offset for aligned dots (±6px, alternating by index)
    size: size,
    opacity: 1, // Opacity controlled by CSS variable (--dot-far, --dot-near)
    isNear,
  };
}

// Precomputed dot maps (deterministic, loaded from JSON)
// Performance: Generated once at module load - prevents hydration mismatch
// Ensures CLS ~0 by having fixed positions from first render
// No randomness - fully deterministic from JSON data
// Track aligned dot indices for offset calculation (odd indices y-6, even indices y+6)
let alignedDotIndex = 0;
const DOTS_DESKTOP = dotsDesktopData.dots.map((dotData) => {
  const index = dotData.stateMode === 'aligned' ? alignedDotIndex++ : undefined;
  return convertDotData(dotData, index);
});
alignedDotIndex = 0; // Reset for mobile
const DOTS_MOBILE = dotsMobileData.dots.map((dotData) => {
  const index = dotData.stateMode === 'aligned' ? alignedDotIndex++ : undefined;
  return convertDotData(dotData, index);
});

// Performance: Freeze arrays to prevent accidental mutations and enable optimizations
Object.freeze(DOTS_DESKTOP);
Object.freeze(DOTS_MOBILE);

// Curve path definition (normalized coordinates)
const CURVE_PATH = "M 100 400 Q 300 380, 500 360 T 900 340";

// Old signal/band/fragment code removed - all rendering now handled by HeroVisualSVG.tsx

// Hook to detect screen size (client-side only to avoid hydration mismatch)
// Performance: Uses passive event listeners, debounced resize
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Client-side only check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check (non-blocking)
    if (typeof window !== 'undefined') {
      checkMobile();
      
      // Debounced resize handler for performance
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkMobile, 150);
      };
      
      // Use passive listener for better scroll performance
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  return isMobile;
}

// Hook to detect prefers-reduced-motion (non-blocking)
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    // Client-side only check (non-blocking)
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Initial check (synchronous, lightweight)
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes (passive)
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
}

// Import HeroVisualSVG component
import { HeroVisualSVG } from "./hero/HeroVisualSVG";

// HeroVisual Component - wrapper that provides dots and state to HeroVisualSVG
function HeroVisual({ 
  state = 'overview',
  isTransitioning = false,
}: { 
  state?: 'overview' | 'aligned' | 'foresight';
  isTransitioning?: boolean;
}) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  // Select appropriate dot map based on screen size
  const dots = React.useMemo(() => {
    return isMobile ? DOTS_MOBILE : DOTS_DESKTOP;
  }, [isMobile]);
  
  // Optional crossfade: 150-250ms opacity transitions
  // If prefers-reduced-motion: disable transitions (0ms = instant)
  const transitionDuration = prefersReducedMotion ? '0ms' : '200ms';
  
  return (
    <HeroVisualSVG
      state={state}
      dots={dots}
      prefersReducedMotion={prefersReducedMotion}
      transitionDuration={transitionDuration}
      isTransitioning={isTransitioning}
    />
  );
}

export function HeroSection({
  title,
  subtitle,
  supportingLine,
  bullets = [],
  primaryCTA,
  secondaryCTA,
  visualState: initialVisualState = 'overview',
  enableUrlSync = false,
}: HeroSectionProps) {
  // Auto-loop state machine - cycles through states every 3 seconds
  // Order: overview → aligned → foresight → (repeat)
  // Starts on 'overview' at mount, cycles indefinitely
  const { state: heroState, isTransitioning } = useHeroAutoStates();
  
  // URL sync removed - auto-loop state machine controls state
  // State cycles automatically: overview → aligned → foresight → (repeat)
  
  return (
    <section className="hero-section-wrapper">
      <div className="hero-container">
        {/* 12-column grid */}
        <div className="hero-grid">
          {/* Text Column: spans 1-5 */}
          <div className="hero-text-column">
            <div className="hero-content">
              {/* Headline Block */}
              <div className="hero-headline-block">
                <h1 className="hero-headline">{title}</h1>
              </div>
              
              {/* Subhead */}
              <p className="hero-subhead">{subtitle}</p>
              
              {/* Supporting Line */}
              {supportingLine && (
                <p className="hero-supporting-line">{supportingLine}</p>
              )}
              
              {/* Bullets */}
              {bullets.length > 0 && (
                <div className="hero-bullets">
                  {bullets.map((line, idx) => (
                    <p key={idx} className="hero-bullet">{line}</p>
                  ))}
                </div>
              )}
              
              {/* CTAs */}
              {(primaryCTA || secondaryCTA) && (
                <div className="hero-ctas">
                  {primaryCTA && (
                    <ArcButton 
                      href={primaryCTA.href} 
                      onClick={primaryCTA.onClick}
                    >
                      {primaryCTA.label}
                    </ArcButton>
                  )}
                  {secondaryCTA && (
                    <ArcButton
                      href={secondaryCTA.href}
                      onClick={secondaryCTA.onClick}
                      className="hero-secondary-cta"
                    >
                      {secondaryCTA.label}
                    </ArcButton>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Visual Column: spans 6-12 */}
          <div className="hero-visual-column">
            <HeroVisual state={heroState} isTransitioning={isTransitioning} />
          </div>
        </div>
      </div>
    </section>
  );
}

