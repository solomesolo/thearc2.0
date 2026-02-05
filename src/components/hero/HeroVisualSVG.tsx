"use client";

/**
 * HeroVisualSVG Component
 * 
 * Renders the hero visual as a single authored SVG system with layered groups:
 * - bgDiffusion: Background diffusion gradient
 * - referenceBand: Subtle reference band behind curve
 * - dotsFar: Far dots (constellation field)
 * - dotsNear: Near dots (constellation field)
 * - curve: Smooth spline trajectory (two-stroke system)
 * - curveEmphasis: Subtle overlay segment (Foresight only)
 * - signal: Early risk signal dot with halo
 * 
 * Three states: Overview → Aligned → Foresight
 * 
 * Render order:
 * 1. background rect + gradients
 * 2. band (Aligned/Foresight)
 * 3. dots (always)
 * 4. curve under-stroke + main stroke (Aligned/Foresight)
 * 5. curve emphasis segment (Foresight only)
 * 6. signal + halo (Foresight only)
 * 
 * DESIGN PRINCIPLE: Quiet State Changes
 * - NO pulsing dots (no continuous animations on dots)
 * - NO particle motion (dots switch instantly between positions, no tweening)
 * - NO glow effects (signal halo is static, no animated glow/bloom)
 * - NO decorative animations (no "alive" feeling, no continuous motion)
 * - Only minimal opacity transitions (200ms) for quiet state changes
 * - State changes should feel like discrete, calm transitions, not animated
 */

import React from "react";
import './heroVisual.tokens.css';
import { HeroStateIndicator } from './HeroStateIndicator';

// Import shared types
import type { Dot } from "../HeroSection";

// Load data from JSON files (deterministic)
import curveData from './data/curve.json';
import signalData from './data/signal.json';

// Re-export types for external use
export type HeroVisualState = 'overview' | 'aligned' | 'foresight';

interface HeroVisualSVGProps {
  state?: HeroVisualState;
  dots: Dot[];
  prefersReducedMotion?: boolean;
  transitionDuration?: string;
  isTransitioning?: boolean;
}

// Curve path from JSON (deterministic)
const CURVE_PATH = curveData.pathD;

// Signal data from JSON (deterministic)
const SIGNAL_DATA = signalData;

// Signal placement (exact coordinates)
const SIGNAL_X = SIGNAL_DATA.signal.x; // 752
const SIGNAL_Y = SIGNAL_DATA.signal.y; // 315

// Signal is a single dot (not multiple dots)
const SIGNAL_CENTER = { x: SIGNAL_X, y: SIGNAL_Y };

// Curve emphasis overlay (for foresight state) - subtle overlay path segment between x≈720-820
// Approximates the curve segment in that region for subtle emphasis (no color change, just overlay)
const CURVE_EMPHASIS_PATH = "M 720 328 C 740 325, 760 320, 780 315 C 795 312, 810 309, 820 307";

// Signal Group Component with Tooltip
function SignalGroup({
  center,
  opacity,
  tooltipId,
  prefersReducedMotion = false,
  transitionDuration = '200ms',
  tooltipOffset = { dx: 0, dy: -25 },
}: {
  center: { x: number; y: number };
  opacity: number;
  tooltipId: string;
  prefersReducedMotion?: boolean;
  transitionDuration?: string;
  tooltipOffset?: { dx: number; dy: number };
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ x: number; y: number } | null>(null);
  const groupRef = React.useRef<SVGGElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  
  const showTooltip = isHovered || isFocused;
  
  // Tooltip anchor point (from signal.json)
  const baseTooltipX = center.x + tooltipOffset.dx;
  const baseTooltipY = center.y + tooltipOffset.dy;
  
  // Clamp tooltip position to stay within SVG viewBox (0, 0, 1000, 700)
  React.useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      
      // SVG viewBox dimensions
      const VIEWBOX_WIDTH = 1000;
      const VIEWBOX_HEIGHT = 700;
      const PADDING = 8; // Padding from edges
      
      // Estimate tooltip dimensions in SVG coordinates
      const tooltipWidthSVG = 150;
      const tooltipHeightSVG = 35;
      
      let x = baseTooltipX;
      let y = baseTooltipY;
      
      // Clamp horizontally (accounting for tooltip width and centering)
      const halfWidth = tooltipWidthSVG / 2;
      const minX = PADDING + halfWidth;
      const maxX = VIEWBOX_WIDTH - PADDING - halfWidth;
      x = Math.max(minX, Math.min(x, maxX));
      
      // Clamp vertically (position above signal dot)
      const minY = PADDING;
      const maxY = VIEWBOX_HEIGHT - tooltipHeightSVG - PADDING;
      y = Math.max(minY, Math.min(y, maxY));
      
      setTooltipPosition({ x, y });
    } else {
      setTooltipPosition(null);
    }
  }, [showTooltip, baseTooltipX, baseTooltipY]);
  
  return (
    <>
      <g
        ref={groupRef}
        opacity={opacity}
        tabIndex={0}
        aria-describedby={tooltipId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ 
          cursor: 'pointer', 
          outline: 'none',
          transition: prefersReducedMotion ? 'none' : `opacity ${transitionDuration} ease-out`,
        }}
        className="signal-group"
      >
        {/* Signal (only mint element) - early risk detected */}
        {/* Halo: outer circle - uses CSS variable */}
        <circle
          cx={center.x}
          cy={center.y}
          r="26"
          className="hero-signal-halo-circle"
        />
        
        {/* Inner halo ring - uses CSS variable */}
        <circle
          cx={center.x}
          cy={center.y}
          r="14"
          fill="none"
          className="hero-signal-halo-ring"
          strokeWidth="2"
        />
        
        {/* Signal dot - uses CSS variable */}
        <circle
          cx={center.x}
          cy={center.y}
          r="7"
          className="hero-signal-dot"
        />
      </g>
      
      {/* Tooltip using foreignObject positioned in SVG coordinates */}
      {/* Only visible in foresight state, clamped to container */}
      {showTooltip && tooltipPosition && (
        <foreignObject
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          width="200"
          height="40"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
          className="signal-tooltip-foreign"
        >
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className="signal-tooltip"
            aria-live="polite"
          >
            Early risk signal
          </div>
        </foreignObject>
      )}
    </>
  );
}

export function HeroVisualSVG({
  state = 'overview',
  dots,
  prefersReducedMotion = false,
  transitionDuration = '200ms',
  isTransitioning = false,
}: HeroVisualSVGProps) {
  // State definitions (no motion required - instant switching):
  // overview: curve opacity 0, band 0, signal 0; all dots at scatter
  // aligned: curve 1, band 1, signal 0; aligned dots at aligned coords
  // foresight: same as aligned + signal visible + curve emphasis segment visible
  
  const curveOpacity = state === 'overview' ? 0 : 1;
  const bandOpacity = state === 'overview' ? 0 : 1;
  const signalOpacity = state === 'foresight' ? 1 : 0;
  
  // Determine dot positions based on state (deterministic, no tweening)
  const getDotPosition = (dot: Dot) => {
    // overview: all dots use scatter positions
    if (state === 'overview') {
      return { x: dot.scatterX, y: dot.scatterY };
    }
    
    // aligned or foresight:
    // - stateMode "aligned" → use aligned coordinates (offsets already applied in JSON)
    // - stateMode "scatter" → always use scatter coordinates
    if (dot.mode === 'aligned') {
      return { 
        x: dot.alignedX, 
        y: dot.alignedY + dot.alignedOffsetY // Offset is 0 (already in JSON), but kept for consistency
      };
    }
    // scatter mode: always use scatter, never aligns
    return { x: dot.scatterX, y: dot.scatterY };
  };
  
  const farDots = dots.filter(dot => !dot.isNear);
  const nearDots = dots.filter(dot => dot.isNear);
  
  return (
    <div className={`hero-visual-svg-container ${isTransitioning ? 'isTransitioning' : ''}`}>
      {/* State Indicator - positioned absolutely, no layout impact */}
      <HeroStateIndicator state={state} prefersReducedMotion={prefersReducedMotion} />
      
      <svg 
        viewBox="0 0 1000 700" 
        className="hero-visual-svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        role="img"
      >
        <defs>
          {/* Background diffusion - 3 radial gradients, subtle and medical, not wallpaper */}
          {/* Radial Gradient 1: Copper haze */}
          <radialGradient id="copperHaze" cx="760" cy="190" r="520">
            <stop offset="0%" stopColor="rgba(194, 108, 63, 0.22)" />
            <stop offset="55%" stopColor="rgba(194, 108, 63, 0.10)" />
            <stop offset="100%" stopColor="rgba(194, 108, 63, 0.00)" />
          </radialGradient>
          
          {/* Radial Gradient 2: Bone haze */}
          <radialGradient id="boneHaze" cx="650" cy="360" r="480">
            <stop offset="0%" stopColor="rgba(235, 205, 170, 0.12)" />
            <stop offset="65%" stopColor="rgba(235, 205, 170, 0.06)" />
            <stop offset="100%" stopColor="rgba(235, 205, 170, 0.00)" />
          </radialGradient>
          
          {/* Radial Gradient 3: Umber shadow */}
          <radialGradient id="umberHaze" cx="210" cy="560" r="560">
            <stop offset="0%" stopColor="rgba(140, 74, 45, 0.16)" />
            <stop offset="70%" stopColor="rgba(140, 74, 45, 0.07)" />
            <stop offset="100%" stopColor="rgba(140, 74, 45, 0.00)" />
          </radialGradient>
        </defs>
        
        {/* Render order: background → band → dots → curve → signal */}
        
        {/* Layer 1: bgDiffusion - Background diffusion (authored, warm, calm - not poster art) */}
        <g id="bgDiffusion">
          {/* Background base fill - uses CSS variable */}
          <rect x="0" y="0" width="1000" height="700" className="hero-bg-fill" />
          
          {/* Radial Gradient 1: Copper haze */}
          <rect x="0" y="0" width="1000" height="700" fill="url(#copperHaze)" />
          
          {/* Radial Gradient 2: Bone haze */}
          <rect x="0" y="0" width="1000" height="700" fill="url(#boneHaze)" />
          
          {/* Radial Gradient 3: Umber shadow */}
          <rect x="0" y="0" width="1000" height="700" fill="url(#umberHaze)" />
        </g>
        
        {/* Layer 2: referenceBand (soft clinical "range" slab, not a plotted axis) */}
        {/* Visible only in Aligned + Foresight states */}
        {/* Exact specifications: x=120, y=360, w=760, h=64, rx=32 */}
        <g id="referenceBand" opacity={bandOpacity} style={{
          transition: prefersReducedMotion ? 'none' : `opacity ${transitionDuration} ease-out`,
        }}>
          {/* Main rounded rect - fill uses --band CSS variable */}
          <rect
            x="120"
            y="360"
            width="760"
            height="64"
            rx="32"
            className="hero-band"
          />
          
          {/* Faint stroke highlight (1px, low opacity) - subtle top edge */}
          {/* Creates soft clinical appearance, not analytics chart band */}
          <rect
            x="120"
            y="360"
            width="760"
            height="64"
            rx="32"
            fill="none"
            className="hero-band-highlight"
            strokeWidth="1"
          />
        </g>
        
        {/* Layer 3: dotsFar (constellation field - fragmented points) */}
        {/* Warm neutrals, not teal */}
        {/* 
          DESIGN PRINCIPLE: No decorative animations
          - Dots switch instantly between scatter and aligned positions (no tweening)
          - Only opacity transitions allowed (200ms, disabled for reduced motion)
          - NO pulsing, NO particle motion, NO continuous animations
        */}
        <g id="dotsFar">
          {farDots.map(dot => {
            const pos = getDotPosition(dot);
            return (
              <circle
                key={dot.id}
                cx={pos.x}
                cy={pos.y}
                r={dot.size}
                className="hero-dot-far"
                opacity={dot.opacity}
              />
            );
          })}
        </g>
        
        {/* Layer 4: dotsNear (constellation field - fragmented points) */}
        {/* Warm neutrals, not teal */}
        {/* 
          DESIGN PRINCIPLE: No decorative animations
          - Dots switch instantly between scatter and aligned positions (no tweening)
          - Only opacity transitions allowed (200ms, disabled for reduced motion)
          - NO pulsing, NO particle motion, NO continuous animations
        */}
        <g id="dotsNear">
          {nearDots.map(dot => {
            const pos = getDotPosition(dot);
            return (
              <circle
                key={dot.id}
                cx={pos.x}
                cy={pos.y}
                r={dot.size}
                className="hero-dot-near"
                opacity={dot.opacity}
              />
            );
          })}
        </g>
        
        {/* Layer 5: curve (biological trajectory - two-stroke system, not a line chart) */}
        {/* Visible only in Aligned + Foresight states */}
        <g id="curve" opacity={curveOpacity} style={{
          transition: prefersReducedMotion ? 'none' : `opacity ${transitionDuration} ease-out`,
        }}>
          {/* Under-stroke (soft tissue) - uses CSS variable */}
          <path
            d={CURVE_PATH}
            fill="none"
            className="hero-curve-understroke"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Main stroke (trajectory) - uses CSS variable */}
          <path
            d={CURVE_PATH}
            id="arc-curve"
            fill="none"
            className="hero-curve-stroke"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Subtle curve emphasis overlay (Foresight only) - no color change, just subtle overlay */}
          {state === 'foresight' && (
            <path
              d={CURVE_EMPHASIS_PATH}
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
        
        {/* Layer 6: signal (early risk signal - only mint element, visible only in Foresight) */}
        {signalOpacity > 0 && (
          <SignalGroup 
            center={SIGNAL_CENTER}
            opacity={signalOpacity}
            tooltipId="signal-tooltip"
            prefersReducedMotion={prefersReducedMotion}
            transitionDuration={transitionDuration}
            tooltipOffset={SIGNAL_DATA.signal.tooltipOffset}
          />
        )}
      </svg>
    </div>
  );
}

