export type DayLifeStep = "upload" | "timeline" | "signals" | "action" | "marketplace";

// Static image snapshots (Option B - Fast)
export const SNAPSHOTS: Record<DayLifeStep, string> = {
  upload: "/snapshots/daylife-01-upload@2x.png",
  timeline: "/snapshots/daylife-02-timeline@2x.png",
  signals: "/snapshots/daylife-03-signals@2x.png",
  action: "/snapshots/daylife-04-action@2x.png",
  marketplace: "/snapshots/daylife-05-marketplace@2x.png",
};

// Dynamic demo routes (Option A - Best, for future implementation)
export const DEMO_URLS: Record<DayLifeStep, string> = {
  upload: "/demo/documents?state=upload", // Use live Documents page with upload modal open
  timeline: "/demo/timeline?state=after_upload",
  signals: "/demo/signals?state=ldl_trend",
  action: "/demo/command-center?state=action_repeat_lipids",
  marketplace: "/demo/marketplace?state=lipid_panel_due",
};

