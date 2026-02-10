export type DayLifeStepId = "upload" | "timeline" | "signals" | "action" | "marketplace";

export const DAYLIFE_STEPS: {
  id: DayLifeStepId;
  label: string;
  title: string;
  body: string;
  whatYouSee: string;
  cta: { text: string; href: string };
}[] = [
  {
    id: "upload",
    label: "1 — UPLOAD",
    title: "Upload a lab result",
    body: "Add a PDF from your portal or email. Arc organizes it automatically.",
    whatYouSee: "Document added → categorized → placed on timeline.",
    cta: { text: "See the document →", href: "#" },
  },
  {
    id: "timeline",
    label: "2 — TIMELINE",
    title: "Your history becomes one view",
    body: "Records from different clinics become a continuous timeline you can scan.",
    whatYouSee: "Labs, visits, imaging, and notes in one chronological view.",
    cta: { text: "Explore timeline →", href: "#" },
  },
  {
    id: "signals",
    label: "3 — SIGNALS",
    title: "A trend becomes visible",
    body: "A single result may look normal — but a pattern across time can matter.",
    whatYouSee: "Domains + trends show what changes across time.",
    cta: { text: "View trend →", href: "#" },
  },
  {
    id: "action",
    label: "4 — NEXT STEP",
    title: "You get a clear next step",
    body: "No diagnosis. No pressure. Just a recommendation based on your timeline.",
    whatYouSee: "Action Inbox shows what to do next + reminders.",
    cta: { text: "Set a reminder →", href: "#" },
  },
  {
    id: "marketplace",
    label: "5 — OPTIONS",
    title: "Trusted services, matched to context",
    body: "If you want to act, Arc shows relevant options with preparation notes and follow-up.",
    whatYouSee: "Services tailored to your current need with context.",
    cta: { text: "See options →", href: "#" },
  },
];

