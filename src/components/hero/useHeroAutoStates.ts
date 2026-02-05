"use client";

/**
 * useHeroAutoStates Hook
 * 
 * Auto-loops through hero states every 3 seconds:
 * overview → aligned → foresight → (repeat)
 * 
 * Starts on 'overview' at mount.
 * Cycles indefinitely.
 * 
 * Reduced motion: If prefers-reduced-motion is true:
 * - Do not start interval (no auto-looping)
 * - Set state to 'foresight' (stable final state)
 * - No opacity transitions
 */

import { useState, useEffect, useRef } from "react";

export type HeroVisualState = 'overview' | 'aligned' | 'foresight';

const ORDER: HeroVisualState[] = ['overview', 'aligned', 'foresight'];
const DURATION_MS = 3000;

interface UseHeroAutoStatesReturn {
  state: HeroVisualState;
  isTransitioning: boolean;
}

export function useHeroAutoStates(): UseHeroAutoStatesReturn {
  const [stateIndex, setStateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    
    if (prefersReducedMotion) {
      // Reduced motion: Set state to 'foresight' (final state) and do not start interval
      // 'foresight' is at index 2
      setStateIndex(2);
      // No transitions for reduced motion users
      setIsTransitioning(false);
      return; // Exit early - no interval setup
    }
    
    // Normal behavior: Start on 'overview' (index 0) and auto-loop
    setStateIndex(0);
    
    // Set up interval to advance state every 3000ms
    intervalRef.current = setInterval(() => {
      setStateIndex((prevIndex) => {
        // Advance index by 1 mod 3
        const nextIndex = (prevIndex + 1) % ORDER.length;
        
        // Set transitioning flag for 200ms if crossfade is used
        setIsTransitioning(true);
        
        // Clear any existing transition timeout
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        
        // Clear transitioning flag after 200ms
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
        
        return nextIndex;
      });
    }, DURATION_MS);
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);
  
  return {
    state: ORDER[stateIndex],
    isTransitioning,
  };
}

