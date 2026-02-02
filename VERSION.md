# The Arc Website - Version Documentation

## Current Version: 1.0.0
**Build Date:** January 2025
**Build Status:** ✅ Production Ready

---

## Overview

This is a Next.js-based website and clinical application platform for The Arc, featuring both B2C marketing pages and a comprehensive doctor-facing clinical workspace.

---

## Key Features Implemented

### 1. Marketing Pages

#### Homepage (`/`)
- Clinicians section with interactive feature list and dashboard preview
- Two-column desktop layout, stacked mobile layout
- Proof points, CTAs, and trust indicators

#### Clinics Page (`/clinics`)
- Hero section with clinical dashboard preview
- Problem section with interactive problem signal chips
- Core modules overview
- Workflow walkthrough with interactive stages
- Marketplace for clinics
- Data and interoperability section
- Security and governance
- FAQ section
- Final CTA

#### Your Arc Page (`/your-arc`)
- B2C marketing page for individual users
- Hero with early access promise
- Realistic outcomes showcase
- How people use Arc section
- Marketplace with early access advantage
- Web platform and mobile app showcase
- What Arc is and is not section
- Final CTA

### 2. B2C Dashboard (`/dashboard/your-arc`)

#### Overview Page
- Current status summary
- Summary cards
- Upcoming interventions
- No action needed state

#### Timeline Page (`/dashboard/your-arc/timeline`)
- Unified chronological feed
- Categories: Labs, Documents, Imaging, Wearables, Notes
- Filter chips and search functionality
- 12+ realistic entries across 18 months
- Expandable detail views

#### Next Actions Page (`/dashboard/your-arc/next-actions`)
- Concierge reasoning simulation
- Sections: Recommended now, Recommended later, Monitor only, Nothing needed
- Each action includes: trigger, context, timing logic, next steps
- Examples for blood work, vaccinations, dental, imaging, BP monitoring

#### Additional Dashboard Pages
- Insights (placeholder)
- Records (placeholder)
- Blueprints (using `/dashboard/experiments` components)
- Interventions
- Marketplace
- Notifications
- Settings
- Messages (placeholder)

### 3. Doctor Cabinet - Clinical Workspace

#### Layout System
- **DoctorCabinetLayout** (`/cabinet/*`)
  - Isolated from marketing layout
  - Fixed top bar (56px height)
  - Collapsible side navigation (64px/240px)
  - Patient drawer host (right side, below top bar)
  - Light mode only
  - No marketing header/footer on cabinet routes

#### Clinical Priority Queue (`/cabinet/priority-queue`)
- Primary landing screen for physicians
- Fixed layout: no page scroll for critical content
- Top utility bar with patient search
- Priority filters and status summary
- Clinical priority table with:
  - Patient information
  - Why this patient is here
  - Risk level indicators
  - Category badges
  - Urgency pills
  - Suggested actions (CTAs)
  - Last MD contact
- Contextual workspace drawer (right side)
- Urgent review modal
- Toast notifications with undo
- Keyboard navigation support
- Responsive: drawer on desktop, full page on mobile

#### Patient Workbench (`/cabinet/workbench/:queueItemId`)
- Focused patient decision view
- Two rendering modes:
  - Desktop: Right-side drawer (480px width)
  - Mobile/Tablet: Full page route
- Three-region layout:
  - Header: Patient identity, trigger badge, quick exit
  - Body: Left (Decision Context ~60%), Right (Actions ~40%)
  - Footer: Resolution controls (sticky)
- Features:
  - Editable "Why You're Here" sentence
  - Dynamic trigger details (Labs, Message, Symptoms, Follow-up)
  - Relevant context (auto-curated)
  - Clinical notes with voice dictation stub
  - Suggested actions panel
  - One-click core actions (Call, Message, Schedule, Task, Delegate)
  - Resolution controls (Resolve, Snooze, Escalate)
- Action modals for all core actions
- Accessibility: ESC to close, focus trap, keyboard navigation

#### First Visit Intake Workspace (`/cabinet/patients/:patientId/visits/visit-1/intake`)
- Live visit workspace for first clinical consultations
- Three-column layout:
  - Left: Patient context (demographics, goals, known risks)
  - Center: Main intake workspace (scrollable)
  - Right: Decision support (suggested diagnostics, missing info alerts)
- Sections:
  1. Patient Story: Large free-text field with voice dictation
  2. Guided Review: Optional accordion checklist (Family history, Lifestyle, Hormonal, Stress, Medications)
  3. Live Risk Map: Auto-updating risk tiles (Cardiovascular, Cancer, Metabolic, Venous, Neuro/Cognitive)
  4. Open Questions/Hypotheses: Optional free text
- Sticky footer with visit actions:
  - Save draft
  - Order diagnostics
  - Schedule Visit 2
  - Send patient summary
  - Complete visit
- Autosave every 10 seconds
- Draft safety with unsaved changes confirmation
- Visit completion automatically:
  - Locks Visit 1
  - Generates intake summary
  - Updates Priority Queue
  - Populates Visit 2 workspace

#### New Patient Journey
- **CreatePatientModal**: Minimal patient creation (<60 seconds)
  - Fields: Full name (required), DOB (optional), Sex, Phone/Email (optional)
  - Duplicate detection with similarity search
  - "Possible matches" panel with override reasons
  - Buttons: "Create & Start Visit 1", "Create only", "Cancel"
- **UrgentReviewModal**: Create urgent queue items
  - Search existing patients or create new
  - Reason and urgency selection
- Entry points:
  - Top bar: "New patient" button
  - Top bar: "Urgent review" button
  - Global search: "Create new patient" when no results
- Navigation:
  - "Create & Start Visit 1" → navigates to intake workspace
  - "Create only" → returns to previous page
- Queue item creation rules:
  - Only when Visit 1 intake draft started
  - Or intake incomplete rule triggers
  - Or urgent review explicitly creates item
  - "Create only" does NOT create queue item by default

### 4. Navigation & Routing

#### Marketing Routes
- `/` - Homepage
- `/clinics` - Clinics marketing page
- `/your-arc` - B2C marketing page
- `/dashboard/your-arc/*` - B2C dashboard pages

#### Doctor Cabinet Routes
- `/cabinet` - Redirects to `/cabinet/priority-queue`
- `/cabinet/priority-queue` - Clinical Priority Queue (default landing)
- `/cabinet/workbench/:queueItemId` - Patient Workbench (mobile/tablet)
- `/cabinet/patients/:patientId/visits/visit-1/intake` - First Visit Intake
- `/cabinet/patients` - Patients list (placeholder)
- `/cabinet/schedule` - Schedule (placeholder)
- `/cabinet/tasks` - Tasks (placeholder)
- `/cabinet/settings` - Settings (placeholder)

---

## Technical Implementation

### Technology Stack
- **Framework**: Next.js 15.5.10
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Design System

#### Global Design Tokens
- **Base unit**: 8px grid system
- **Allowed spacing**: 4, 8, 12, 16, 24, 32, 40px
- **Typography tokens**:
  - `text-xs`: 12px/16px/400
  - `text-sm`: 13px/18px/400
  - `text-base`: 15px/22px/400
  - `text-md`: 16px/24px/500
  - `text-lg`: 18px/26px/600
- **Colors**: CSS variables for semantic colors (danger, warning, success, muted)
- **Tabular numerals**: For all numeric values

#### Layout Principles
- **Desktop-first**: Minimum width 1280px for clinical pages
- **No page scroll**: Critical content visible without scrolling on 1440x900
- **Fixed headers/footers**: Sticky positioning
- **Internal scroll only**: Table/content areas scroll, not page
- **Consistent padding**: 24px horizontal padding on desktop

### Component Architecture

#### Shared Components
- `MarketingLayoutWrapper` - Conditionally renders marketing header/footer
- `CabinetBodyWrapper` - Manages body background for cabinet routes
- `GlowCard` - Reusable card component with optional animations

#### Doctor Cabinet Components
- `DoctorCabinetLayout` - Root layout for all cabinet routes
- `ClinicalTopBar` - Top utility bar (56px height)
- `SideNav` - Collapsible left navigation
- `PatientDrawerContext` - Context API for shared drawer state
- `CreatePatientModal` - New patient creation
- `UrgentReviewModal` - Urgent review item creation

#### Priority Queue Components
- `PriorityFiltersBar` - Filter toggles and status summary
- `ClinicalPriorityTable` - Main table with rows and columns
- `ContextualWorkspaceDrawer` - Right-side patient drawer
- `Toast` - Notification component with undo
- `SystemStatusFooter` - Minimal footer with system status

#### Workbench Components
- `PatientWorkbench` - Core workbench component
- `PatientWorkbenchDrawer` - Drawer wrapper for desktop
- Action Modals: `CallModal`, `MessageModal`, `ScheduleModal`, `TaskModal`, `DelegateModal`, `ResolveModal`, `SnoozeModal`, `EscalateModal`
- `BaseModal` - Standardized modal base component

#### First Visit Components
- `FirstVisitIntakeWorkspace` - Main intake workspace
- `PatientContextPanel` - Left column patient context
- `PatientStoryEditor` - Primary narrative input
- `GuidedReviewAccordion` - Optional structured review
- `LiveRiskMap` - Auto-updating risk tiles
- `OpenQuestionsEditor` - Hypotheses textarea
- `SuggestedDiagnosticsPanel` - Right column decision support
- `VisitFooterActions` - Sticky footer actions
- `UnsavedChangesModal` - Draft safety confirmation

### Data Models

#### Patient Types
```typescript
type Sex = "F" | "M" | "X" | "unknown";
type IdentityCompleteness = "low" | "medium" | "high";
type Visit1Status = "not_started" | "draft" | "completed";
```

#### Queue Item Types
```typescript
type RiskLevel = "high" | "medium" | "low";
type QueueCategory = "results" | "message" | "visit" | "symptoms" | "intake" | "manual";
type Urgency = "today" | "soon" | "monitor";
type QueueStatus = "open" | "in_progress" | "resolved" | "snoozed";
```

### Services (Mock Implementation)

#### Patient Service (`/app/cabinet/services/patientService.ts`)
- `createPatient()` - Create new patient record
- `createVisit1()` - Create Visit 1 with optional queue item
- `searchSimilarPatients()` - Duplicate detection
- `getPatient()` - Get patient by ID
- `getVisit1()` - Get Visit 1 by patient ID
- `getAllPatients()` - Get all patients

#### Queue Service (`/app/cabinet/services/queueService.ts`)
- `createQueueItemForVisit1()` - Create queue item for Visit 1
- `updateQueueItemForVisit1Status()` - Update queue item when visit status changes
- `getQueueItems()` - Get all queue items

#### Audit Service (`/app/cabinet/types/audit.ts`)
- `logAuditEvent()` - Log all clinical actions

---

## Recent Fixes & Improvements

### Build Fixes (Latest)
1. **Suspense Boundary Fix**
   - Wrapped `useSearchParams()` in Suspense boundaries
   - Fixed for `/cabinet/priority-queue` and `/cabinet/patients/[patientId]/visits/visit-1/intake`
   - Resolved Next.js prerendering errors

2. **QueueItem Structure Fix**
   - Updated `queueService.ts` to use correct `QueueItem` type
   - Changed from `patientId`/`patientName` to `patient` object
   - Added missing fields: `riskExplanation`, `urgencyOverriddenByMD`, `triggerDetails`, `visit1Status`

3. **Create Patient Modal Fix**
   - Fixed "Create & Start Visit 1" button
   - Resolved async state update issue
   - Action now passed directly to handler

### Layout Improvements
- Doctor Cabinet layout fully isolated from marketing
- Patient drawer positioned correctly (below top bar, not overlapping)
- Z-index hierarchy properly managed
- No whole window scrolling in clinical workspace

### Navigation Improvements
- Visit 1 Intake navigation from Priority Queue
- CTA buttons navigate directly to intake workspace
- Row clicks open contextual drawer
- `returnTo` navigation state for safe back navigation
- Draft safety with unsaved changes confirmation

---

## Build Warnings (Non-Critical)

### Metadata Viewport Warnings
Multiple pages have viewport configuration in metadata export instead of separate viewport export. These are warnings only and don't affect functionality:
- `/dashboard/your-arc/*`
- `/cabinet/*`
- Marketing pages
- Various other routes

**Note**: These can be fixed by moving viewport config to a separate `generateViewport()` export, but functionality is not impacted.

---

## Known Limitations

1. **Mock Data Only**: All services use in-memory mock data. No persistence between page refreshes.
2. **Voice Dictation**: Stubbed functionality (not implemented)
3. **Placeholder Pages**: Some dashboard and cabinet pages are placeholders
4. **No Real Backend**: All data operations are client-side mocks

---

## Performance

- **Initial Load**: <2s target
- **No Aggressive Auto-refresh**: Soft refresh banner for updates
- **Optimized Build**: Production build generates 61 static/dynamic pages
- **Code Splitting**: Automatic via Next.js

---

## Accessibility

- Keyboard navigation support
- Visible focus states
- ARIA labels and roles
- Screen reader friendly
- Tab order management
- Focus trap in modals
- ESC key to close modals/drawers

---

## Browser Support

- Desktop-first design (minimum 1280px width for clinical pages)
- Responsive breakpoints for mobile/tablet
- Modern browser support (Chrome, Firefox, Safari, Edge)

---

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

## File Structure Highlights

```
thearc-website-v1.0.0/
├── src/
│   ├── app/
│   │   ├── cabinet/              # Doctor Cabinet routes
│   │   │   ├── layout.tsx        # DoctorCabinetLayout
│   │   │   ├── priority-queue/   # Clinical Priority Queue
│   │   │   ├── workbench/         # Patient Workbench
│   │   │   ├── first-visit/       # First Visit Intake
│   │   │   ├── patients/         # Patient routes
│   │   │   ├── services/         # Mock services
│   │   │   └── types/            # TypeScript types
│   │   ├── dashboard/your-arc/   # B2C Dashboard
│   │   ├── clinics/              # Clinics marketing page
│   │   └── your-arc/             # Your Arc marketing page
│   └── components/              # Shared components
└── VERSION.md                    # This file
```

---

## Next Steps / Roadmap

1. **Backend Integration**: Replace mock services with real API calls
2. **Data Persistence**: Implement database/storage layer
3. **Voice Dictation**: Implement actual voice-to-text functionality
4. **Complete Placeholder Pages**: Fill in Insights, Records, Messages pages
5. **Fix Viewport Warnings**: Move viewport config to separate exports
6. **Testing**: Add unit and integration tests
7. **Authentication**: Add user authentication and authorization
8. **Real-time Updates**: WebSocket support for live queue updates

---

## Version History

### v1.0.0 (January 2025)
- Initial production-ready build
- Complete Doctor Cabinet workspace
- B2C dashboard implementation
- Marketing pages (Clinics, Your Arc)
- New patient journey
- First Visit Intake Workspace
- Patient Workbench
- Clinical Priority Queue
- All critical fixes applied

---

**Documentation Last Updated**: January 2025
**Maintained By**: Development Team

