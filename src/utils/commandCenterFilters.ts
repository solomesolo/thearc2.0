import { DomainId, TileId } from "@/state/useCommandCenterStore";

interface Action {
  id: string;
  title: string;
  reason: string;
  urgency: "High" | "Medium" | "Low";
  domain_ids?: string[];
  source_category?: string;
  related_gap_ids?: string[];
  related_signal_ids?: string[];
  has_services?: boolean;
  recommended_frequency?: string;
}

interface Service {
  id: string;
  name: string;
  why_now: string;
  context_links?: {
    actionId?: string;
    gapId?: string;
    domainId?: string;
    signalId?: string;
  };
}

interface Signal {
  id: string;
  name: string;
  domain_id?: string;
  impactScore?: number;
  confidence?: number;
}

interface Gap {
  id: string;
  title: string;
  domain_id?: string;
  tile_id?: string;
}

/**
 * Filter actions by context
 */
export function filterActions(
  actions: Action[],
  context: { type: string; id?: string }
): Action[] {
  if (context.type === "none" || !context.id) {
    return rankActions(actions).slice(0, 3);
  }

  let filtered: Action[] = [];

  if (context.type === "domain") {
    filtered = actions.filter((action) => action.domain_ids?.includes(context.id!));
  } else if (context.type === "tile") {
    filtered = actions.filter((action) => action.source_category === context.id);
  } else if (context.type === "gap") {
    filtered = actions.filter((action) => action.related_gap_ids?.includes(context.id!));
  } else if (context.type === "signal") {
    filtered = actions.filter((action) => action.related_signal_ids?.includes(context.id!));
  } else {
    filtered = actions;
  }

  return rankActions(filtered).slice(0, 3);
}

/**
 * Rank actions by score = impact * urgencyWeight * confidenceWeight
 */
function rankActions(actions: Action[]): Action[] {
  return [...actions].sort((a, b) => {
    const urgencyWeight = (urgency: string) => {
      switch (urgency) {
        case "High":
          return 1.3;
        case "Medium":
          return 1.1;
        default:
          return 1.0;
      }
    };

    const confidenceWeight = 1.0; // Assuming all actions have same confidence for now

    const scoreA = urgencyWeight(a.urgency) * confidenceWeight;
    const scoreB = urgencyWeight(b.urgency) * confidenceWeight;

    return scoreB - scoreA;
  });
}

/**
 * Filter services by context
 */
export function filterServices(
  services: Service[],
  context: { type: string; id?: string }
): Service[] {
  if (context.type === "none") {
    return []; // Empty state recommended
  }

  return services.filter((service) => {
    if (!service.context_links) return false;

    if (context.type === "action") {
      return service.context_links.actionId === context.id;
    } else if (context.type === "gap") {
      return service.context_links.gapId === context.id;
    } else if (context.type === "domain") {
      return service.context_links.domainId === context.id;
    } else if (context.type === "signal") {
      return service.context_links.signalId === context.id;
    }

    return false;
  });
}

/**
 * Filter signals by context
 */
export function filterSignals(
  signals: Signal[],
  context: { type: string; id?: string }
): Signal[] {
  if (context.type === "domain" && context.id) {
    return signals.filter((signal) => signal.domain_id === context.id).slice(0, 5);
  }

  // Global top signals by impactScore * confidence
  return [...signals]
    .sort((a, b) => {
      const scoreA = (a.impactScore || 0) * (a.confidence || 0);
      const scoreB = (b.impactScore || 0) * (b.confidence || 0);
      return scoreB - scoreA;
    })
    .slice(0, 5);
}

/**
 * Filter gaps by context
 */
export function filterGaps(
  gaps: Gap[],
  context: { type: string; id?: string }
): Gap[] {
  if (context.type === "domain" && context.id) {
    return gaps.filter((gap) => gap.domain_id === context.id);
  } else if (context.type === "tile" && context.id) {
    return gaps.filter((gap) => gap.tile_id === context.id);
  }

  return gaps;
}

/**
 * Get focus area from state and data
 */
export function getFocusArea(
  context: { type: string; id?: string },
  domains: Array<{ id: string; name: string }>
): string {
  if (context.type === "domain" && context.id) {
    return domains.find((d) => d.id === context.id)?.name || "";
  }
  return "";
}

/**
 * Get "What changed" sentence from data
 */
export function getWhatChanged(signals: Array<{ name: string; latest: number | string; baseline: number | string; direction: string }>): string {
  if (!signals || signals.length === 0) {
    return "No meaningful changes detected yet.";
  }

  const topSignal = signals[0];
  if (!topSignal) return "No meaningful changes detected yet.";

  const delta =
    typeof topSignal.latest === "number" && typeof topSignal.baseline === "number"
      ? topSignal.latest - topSignal.baseline
      : 0;

  const absDelta = Math.abs(delta);

  if (topSignal.direction === "Improving") {
    return `${topSignal.name} improved by ${absDelta}`;
  } else if (topSignal.direction === "Worsening") {
    return `${topSignal.name} increased by ${absDelta}`;
  }

  return "No meaningful changes detected yet.";
}

/**
 * Get top action from data and context
 */
export function getTopAction(
  actions: Action[],
  context: { type: string; id?: string }
): Action | null {
  const filtered = filterActions(actions, context);
  return filtered.length > 0 ? filtered[0] : null;
}

/**
 * Map domain to relevant tiles
 */
export function getDomainRelevantTiles(domainId: DomainId): TileId[] {
  const map: Record<DomainId, TileId[]> = {
    heart: ["labs", "screenings", "wearables"],
    metabolic: ["labs", "screenings"],
    sleep: ["wearables", "screenings"],
    fitness: ["wearables", "labs"],
    inflammation: ["labs", "imaging"],
    mind: ["screenings", "labs"],
  };
  return map[domainId] || [];
}

