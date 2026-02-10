# The Arc Website - Project Documentation

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready (Minimal Version)

## Overview

The Arc Website is a Next.js-based clinical application platform featuring marketing pages, a B2C dashboard, and a Doctor Cabinet clinical workspace. This minimal version focuses on core functionality: marketing pages and the Doctor Cabinet with Visit 1 Intake Workspace.

## Architecture

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Analytics:** Vercel Analytics, Mixpanel

### Project Structure

```
thearc-website-v1.0.0/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── cabinet/            # Doctor Cabinet routes
│   │   │   ├── priority-queue/ # Clinical Priority Queue
│   │   │   ├── workbench/      # Patient Workbench (Contextual Workspace)
│   │   │   └── patients/       # Patient-specific routes
│   │   ├── clinics/            # Clinics marketing page
│   │   └── your-arc/           # Your Arc marketing page
│   ├── components/
│   │   ├── cabinet/            # Cabinet-specific components
│   │   ├── intake/             # Visit 1 Intake Workspace components
│   │   ├── workbench/           # Workbench components
│   │   └── ui/                 # Reusable UI components
│   └── lib/
│       ├── intakeTypes.ts      # Visit 1 Intake data types & logic
│       ├── patientTypes.ts     # Patient/Visit/Queue types & mock data
│       ├── visit1ProgressEngine.ts # Tab status computation engine
│       └── workbenchTypes.ts   # Workbench types
├── public/                     # Static assets
└── docs/                       # Documentation files
```

## Key Features

### 1. Marketing Pages
- **Homepage** (`/`): Main landing page
- **Clinics** (`/clinics`): Clinics information page
- **Your Arc** (`/your-arc`): Patient-facing information page

### 2. Doctor Cabinet

#### Priority Queue (`/cabinet/priority-queue`)
- Clinical priority queue displaying patients requiring attention
- Queue items categorized by: labs, messages, symptoms, follow-ups
- Risk level indicators (low, medium, high)
- Urgency badges (today, this week, routine)
- Row click navigation to workbench or Visit 1 intake

#### Patient Workbench (`/cabinet/workbench/:queueItemId`)
- Contextual patient workspace for resolving clinical triggers
- Fixed header with patient identity, risk badge, trigger details
- Left panel: Decision context ("Why you're here", trigger details, relevant context)
- Right panel: Suggested actions, one-click core actions, team routing
- Sticky footer: Resolve, Snooze, Escalate actions
- Responsive: Drawer on desktop (≥1024px), full page on tablet/mobile (<1024px)

#### Visit 1 Intake Workspace (`/cabinet/patients/:patientId/visits/visit-1/intake`)
- **3-Column Layout:**
  - **Left Column:** Patient context (demographics, goals, known risks, tab rail)
  - **Center Column:** Main intake workspace (scrollable)
    - Patient Story (narrative editor)
    - Guided Review (accordion checklist)
    - Live Risk Map (auto-updating tiles)
    - Open Questions / Hypotheses
    - Timeline (placeholder)
    - Documents (placeholder)
  - **Right Column:** Decision support (Orders draft, Missing info reminders)

- **Tab System:**
  - 10 tabs in left rail (Overview, Cardiovascular, Metabolic, Cancer/Screening, Neuro, Sleep, Fitness, Plan, Timeline, Documents)
  - Tabs show status indicators (🟢 Reviewed, 🟡 Partial, ⬜ Not reviewed)
  - Clicking a tab opens "Sanity-Check Drawer" overlay
  - Overlay shows auto-generated summary, structured confirmation blocks, decision support

- **Key Features:**
  - Autosave every 10 seconds
  - Visit timer
  - Sticky header and footer
  - Smooth scrolling to section anchors
  - Focus trap in overlay
  - ESC key support
  - Unsaved changes confirmation

## Component Architecture

### Visit 1 Intake Workspace Components

#### Core Components
- `FirstVisitIntakeWorkspace.tsx`: Main orchestrator component
- `IntakeHeader.tsx`: Fixed header with patient identity, visit metadata, trust signals
- `PatientContextPanel.tsx`: Left column with demographics, goals, risks, tabs rail
- `RightColumn.tsx`: Right column with Orders draft and Missing info hints
- `VisitFooterActions.tsx`: Sticky footer with visit actions

#### Tab System Components
- `Visit1TabsRail.tsx`: Left rail tabs with status indicators
- `Visit1TabOverlay.tsx`: Reusable overlay container (backdrop + panel)
- `Visit1TabSanityDrawer.tsx`: Tab-specific drawer wrapper
- Tab Views: `CardioTabView.tsx`, `MetabolicTabView.tsx`, `CancerTabView.tsx`, etc.

#### Shared Components
- `AutoSummaryBlock.tsx`: Auto-generated summary display
- `StructuredBlock.tsx`: Read-first structured data with inline edit
- `QuietDecisionSupport.tsx`: Collapsible decision support suggestions
- `JumpToOverviewLink.tsx`: Footer navigation links

#### Intake Components
- `PatientStoryEditor.tsx`: Large free-text narrative editor
- `GuidedReviewAccordion.tsx`: Optional accordion checklist
- `LiveRiskMap.tsx`: Auto-updating risk tiles
- `OpenQuestionsEditor.tsx`: Working hypotheses editor

### Workbench Components
- `PatientWorkbench.tsx`: Main workbench component
- `WorkbenchHeader.tsx`: Fixed header
- `DecisionContextPanel.tsx`: Left decision context panel
- `ActionsPanel.tsx`: Right actions panel
- `WorkbenchFooter.tsx`: Sticky footer with resolution controls
- `ActionModals.tsx`: Modals for actions (Call, Message, Schedule, etc.)
- `CreatePatientModal.tsx`: New patient creation modal
- `UrgentReviewModal.tsx`: Urgent review modal

## Data Management

### Mock Data Storage
- Uses `localStorage` for persistence
- Mock data functions in `lib/patientTypes.ts` and `lib/intakeTypes.ts`
- Demo patient: `demo-patient-sarah` (Sarah Johnson, 45-year-old female)

### Key Data Types

#### `Visit1IntakeData`
```typescript
{
  patientStory: { narrative: string, lastSavedISO?: string },
  patientGoals: string[],
  knownRisks: string[],
  guidedReview: GuidedReviewSection[],
  riskMap: RiskTile[],
  suggestedDiagnostics: SuggestedDiagnostic[],
  openQuestions: string,
  visitStatus: "in_progress" | "completed" | "draft"
}
```

#### `QueueItem`
```typescript
{
  id: string,
  patient: Patient,
  whyHere: string,
  riskLevel: "low" | "medium" | "high",
  category: "labs" | "message" | "symptoms" | "follow-up",
  urgency: "today" | "this_week" | "routine",
  status: "open" | "resolved" | "snoozed",
  triggerDetails: TriggerDetails,
  suggestedActions: SuggestedAction[]
}
```

## Design System

### Design Tokens
- **Spacing:** Multiples of 8px
- **Typography:** Montserrat font family
- **Colors:** Neutral grays, no blue backgrounds in clinical workspace
- **Component Heights:**
  - Header: 64px (fixed)
  - Footer: 64px (sticky)
  - Tab rows: 32px
- **Column Widths:**
  - Left context: 260px (fixed)
  - Center intake: flex-1 (scrollable)
  - Right support: 320px (fixed)
  - Overlay panel: 520px (desktop)

### Key Design Principles
- **Calm & Clinical:** Neutral colors, no bright primary colors
- **No Focus Stealing:** No auto-focus on inputs
- **Smooth Animations:** Backdrop fade 120ms, panel slide 180ms
- **Accessibility:** Focus trap, ESC key support, ARIA labels

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Run development server (port 3002)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Key Routes
- `/` - Homepage
- `/clinics` - Clinics page
- `/your-arc` - Your Arc page
- `/cabinet/priority-queue` - Clinical Priority Queue
- `/cabinet/workbench/:queueItemId` - Patient Workbench
- `/cabinet/patients/:patientId/visits/visit-1/intake` - Visit 1 Intake

### Demo Patient
- Patient ID: `demo-patient-sarah`
- Name: Sarah Johnson
- Age: 45
- Sex: Female
- Comprehensive intake data pre-populated

## Recent Updates (January 2025)

### Visit 1 Intake Workspace Enhancements
- ✅ Implemented tab-based sanity-check overlay system
- ✅ Enhanced overlay with calm blur backdrop (no blue artifacts)
- ✅ Added focus trap and accessibility features
- ✅ Implemented smooth animations (backdrop fade, panel slide)
- ✅ Added unsaved changes confirmation (inline, not modal)
- ✅ Enhanced dummy data across all sections
- ✅ Fixed scrolling issues (center column only scrolls)
- ✅ Improved right column with Orders draft and Missing info hints

### Component Refactoring
- ✅ Created reusable `Visit1TabOverlay` component
- ✅ Modularized tab views (CardioTabView, MetabolicTabView, etc.)
- ✅ Created shared components (AutoSummaryBlock, StructuredBlock, etc.)
- ✅ Removed all blue artifacts from clinical workspace

### Documentation
- ✅ Created comprehensive project documentation
- ✅ Added acceptance criteria documentation
- ✅ Documented scrolling fixes
- ✅ Documented right column layout options

## Known Limitations

### Minimal Version Exclusions
- Questionnaires/Surveys
- API routes (using mock data)
- Dashboard pages
- Blueprint pages
- Test files
- Some documentation files

### Future Enhancements
- Real API integration
- User authentication
- Real-time collaboration
- Advanced analytics
- Mobile app
- Patient portal integration

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Next.js 15 with Turbopack for fast development
- Optimized builds with code splitting
- Lazy loading for components
- Efficient state management with React hooks

## Security Considerations
- No sensitive data in client-side code
- Mock data only (no real patient data)
- Ready for API integration with proper authentication

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
Currently using mock data. For production:
- Set up API endpoints
- Configure authentication
- Set environment variables for API keys

### Deployment Platforms
- Vercel (recommended for Next.js)
- Netlify
- Self-hosted Node.js server

## Support & Maintenance

### Code Organization
- Components are modular and reusable
- Types are centralized in `lib/` directory
- Mock data functions are separated from UI components

### Adding New Features
1. Create component in appropriate directory
2. Add types to `lib/` if needed
3. Update routing in `app/` directory
4. Add documentation

### Debugging
- Check browser console for errors
- Check `localStorage` for mock data
- Use React DevTools for component inspection
- Check Network tab for API calls (when integrated)

## License
Private - The Arc

## Contact
For questions or issues, contact the development team.

---

**Last Updated:** January 2025  
**Version:** 1.0.0



