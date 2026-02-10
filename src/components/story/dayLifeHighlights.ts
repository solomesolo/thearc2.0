import { DayLifeStep } from "./dayLifeSnapshots";

export interface HighlightRect {
  x: number; // 0-1, relative to image width
  y: number; // 0-1, relative to image height
  w: number; // 0-1, relative to image width
  h: number; // 0-1, relative to image height
}

export const HIGHLIGHTS: Record<DayLifeStep, HighlightRect> = {
  upload: {
    x: 0.62, // Right side where upload modal appears
    y: 0.18, // Top area
    w: 0.30, // Width of modal
    h: 0.22, // Height of modal + progress
  },
  timeline: {
    x: 0.15, // Left side timeline
    y: 0.12, // Top where new event appears
    w: 0.70, // Width of timeline list
    h: 0.25, // Height covering new event + continuity
  },
  signals: {
    x: 0.20, // Left side where signal expands
    y: 0.25, // Middle area
    w: 0.55, // Width of expanded panel
    h: 0.35, // Height of trend chart + summary
  },
  action: {
    x: 0.60, // Right side action inbox
    y: 0.20, // Top area
    w: 0.32, // Width of action card
    h: 0.18, // Height of "Repeat lipid panel" card
  },
  marketplace: {
    x: 0.15, // Left side filter + cards
    y: 0.20, // Top area
    w: 0.70, // Width covering filter + top card
    h: 0.30, // Height of filter chip + recommended service
  },
};

