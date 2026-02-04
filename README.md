# The Arc Website

**Version:** 1.0.0  
**Status:** Production Ready (Minimal Version)  
**Last Updated:** January 2025

## Overview

The Arc Website is a Next.js-based clinical application platform featuring marketing pages and a Doctor Cabinet clinical workspace. This minimal version focuses on core functionality: marketing pages and the Doctor Cabinet with Visit 1 Intake Workspace.

## Quick Start

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

## Key Features

### Marketing Pages
- **Homepage** (`/`) - Main landing page
- **Clinics** (`/clinics`) - Clinics information page
- **Your Arc** (`/your-arc`) - Patient-facing information page

### Doctor Cabinet

#### Priority Queue (`/cabinet/priority-queue`)
- Clinical priority queue displaying patients requiring attention
- Queue items categorized by: labs, messages, symptoms, follow-ups
- Risk level indicators and urgency badges
- Row click navigation to workbench or Visit 1 intake

#### Patient Workbench (`/cabinet/workbench/:queueItemId`)
- Contextual patient workspace for resolving clinical triggers
- Fixed header, decision context panel, actions panel, sticky footer
- Responsive: Drawer on desktop, full page on tablet/mobile

#### Visit 1 Intake Workspace (`/cabinet/patients/:patientId/visits/visit-1/intake`)
- **3-Column Layout:**
  - Left: Patient context (demographics, goals, risks, tabs)
  - Center: Main intake workspace (Patient Story, Guided Review, Risk Map, etc.)
  - Right: Decision support (Orders draft, Missing info hints)

- **Tab System:**
  - 10 tabs with status indicators (🟢 Reviewed, 🟡 Partial, ⬜ Not reviewed)
  - Clicking a tab opens "Sanity-Check Drawer" overlay
  - Overlay shows auto-generated summary, structured blocks, decision support

- **Key Features:**
  - Autosave every 10 seconds
  - Visit timer
  - Sticky header and footer
  - Smooth scrolling to section anchors
  - Focus trap in overlay
  - ESC key support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Analytics:** Vercel Analytics, Mixpanel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cabinet/            # Doctor Cabinet routes
│   ├── clinics/            # Clinics marketing page
│   └── your-arc/           # Your Arc marketing page
├── components/
│   ├── cabinet/            # Cabinet-specific components
│   ├── intake/             # Visit 1 Intake Workspace components
│   ├── workbench/          # Workbench components
│   └── ui/                 # Reusable UI components
└── lib/
    ├── intakeTypes.ts      # Visit 1 Intake data types & logic
    ├── patientTypes.ts     # Patient/Visit/Queue types & mock data
    └── visit1ProgressEngine.ts # Tab status computation engine
```

## Demo Patient

- **Patient ID:** `demo-patient-sarah`
- **Name:** Sarah Johnson
- **Age:** 45
- **Sex:** Female
- Comprehensive intake data pre-populated

Access: `/cabinet/patients/demo-patient-sarah/visits/visit-1/intake`

## Development

### Key Routes
- `/` - Homepage
- `/clinics` - Clinics page
- `/your-arc` - Your Arc page
- `/cabinet/priority-queue` - Clinical Priority Queue
- `/cabinet/workbench/:queueItemId` - Patient Workbench
- `/cabinet/patients/:patientId/visits/visit-1/intake` - Visit 1 Intake

### Mock Data
- Uses `localStorage` for persistence
- Mock data functions in `lib/patientTypes.ts` and `lib/intakeTypes.ts`
- Demo patient data is automatically initialized

## Recent Updates (January 2025)

- ✅ Implemented tab-based sanity-check overlay system
- ✅ Enhanced overlay with calm blur backdrop (no blue artifacts)
- ✅ Added focus trap and accessibility features
- ✅ Implemented smooth animations (backdrop fade, panel slide)
- ✅ Added unsaved changes confirmation (inline, not modal)
- ✅ Enhanced dummy data across all sections
- ✅ Fixed scrolling issues (center column only scrolls)
- ✅ Improved right column with Orders draft and Missing info hints
- ✅ Created reusable `Visit1TabOverlay` component
- ✅ Modularized tab views and shared components
- ✅ Removed all blue artifacts from clinical workspace

## Documentation

For detailed documentation, see:
- `PROJECT_DOCUMENTATION.md` - Comprehensive project documentation
- `VERSION.md` - Version information
- `ACCEPTANCE_CRITERIA.md` - Acceptance criteria for features

## Quality Checks

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

### Lighthouse Budget Targets

**Performance:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

**Accessibility:**
- Target: ≥ 90 on landing page
- All images have alt text
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels where needed

**Best Practices:**
- No console errors
- HTTPS enabled
- No deprecated APIs
- Valid HTML

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

```bash
npm run build
npm start
```

Recommended deployment platform: Vercel (optimized for Next.js)

## License

Private - The Arc

---

**Last Updated:** January 2025  
**Version:** 1.0.0
