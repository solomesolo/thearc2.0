# Infographic Primitives

Reusable infographic components that establish a consistent "visual language of intelligence" across the site.

## Components

### 1. SourceListPanel

Displays a list of connected sources (EHR, Labs, Wearables, etc.) with status indicators.

**Props:**
- `title?: string` - Panel title (default: "Connected Sources")
- `sources: SourceItem[]` - Array of source items
- `showHeader?: boolean` - Show/hide header (default: true)
- `onSourceHover?: (sourceId: string | null) => void` - Hover callback
- `hoveredSourceId?: string | null` - Currently hovered source ID

**Example:**
```tsx
import { SourceListPanel, SourceItem } from "@/components/infographics";
import { Database, TestTube, Activity } from "lucide-react";

const sources: SourceItem[] = [
  { id: "ehr", icon: <Database className="w-4 h-4" />, label: "EHR", connected: true },
  { id: "labs", icon: <TestTube className="w-4 h-4" />, label: "Labs", connected: true },
  { id: "wearables", icon: <Activity className="w-4 h-4" />, label: "Wearables", connected: true },
];

<SourceListPanel sources={sources} />
```

### 2. TimelineStrip

Displays a horizontal timeline with events and optional pattern connection line.

**Props:**
- `events: TimelineEvent[]` - Array of timeline events
- `showPatternLine?: boolean` - Show pattern connection line (default: true)
- `patternStart?: number` - Pattern line start percentage (default: 10)
- `patternEnd?: number` - Pattern line end percentage (default: 85)
- `highlightedEventIds?: string[]` - Array of highlighted event IDs
- `selectedEventId?: string | null` - Currently selected event ID
- `onEventClick?: (eventId: string) => void` - Click callback
- `onEventHover?: (eventId: string | null) => void` - Hover callback

**Example:**
```tsx
import { TimelineStrip, TimelineEvent } from "@/components/infographics";

const events: TimelineEvent[] = [
  { id: "1", date: "Jan", type: "lab", position: 10 },
  { id: "2", date: "Feb", type: "wearable", position: 35 },
  { id: "3", date: "Mar", type: "lab", position: 60 },
];

<TimelineStrip 
  events={events}
  highlightedEventIds={["1", "3"]}
  onEventClick={(id) => console.log("Clicked:", id)}
/>
```

### 3. InsightCard

Displays an insight with explanation and optional next step.

**Props:**
- `type?: InsightType` - Type: "pattern" | "trend" | "alert" | "recommendation" (default: "pattern")
- `title: string` - Insight title
- `description: string` - Short description
- `whyItMatters: string` - Explanation text
- `nextStep?: string` - Optional next step text
- `timestamp?: string` - Optional timestamp
- `variant?: "default" | "compact"` - Size variant (default: "default")

**Example:**
```tsx
import { InsightCard } from "@/components/infographics";

<InsightCard
  type="pattern"
  title="Pattern detected"
  description="LDL cholesterol trend: +12% over 18 months"
  whyItMatters="Rising LDL increases cardiovascular risk. Early detection enables timely intervention."
  nextStep="Schedule lipid panel follow-up"
  timestamp="2 hours ago"
/>
```

## Usage Patterns

### Combined Usage (Like SystemPreview)

```tsx
import { SourceListPanel, TimelineStrip, InsightCard } from "@/components/infographics";

<div className="card-premium space-y-6">
  <SourceListPanel sources={sources} />
  
  <div className="pt-4 border-t border-[var(--color-border-base)]">
    <TimelineStrip events={events} />
  </div>
  
  <div className="pt-4 border-t border-[var(--color-border-base)]">
    <InsightCard {...insightData} />
  </div>
</div>
```

## Design Principles

1. **Consistent Visual Language**: All components use the same design tokens (colors, spacing, typography)
2. **Interactive States**: Hover, selected, and highlighted states are consistent across components
3. **Accessibility**: Proper ARIA labels, keyboard navigation, and focus states
4. **Motion**: Subtle, consistent animations using motion tokens
5. **Flexibility**: Components can be used independently or combined

## Where to Use

- **"Why it feels hard"** section: Show scattered sources → timeline → insight
- **"How it works"** section: Show connected sources → timeline progression → insights
- **"From insight to intervention"** section: Show sources → timeline → actionable insights

