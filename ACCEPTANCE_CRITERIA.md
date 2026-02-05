# Acceptance Criteria - First Visit Intake Workspace Right Column

## ✅ PASS Criteria

### 1. Right column has a clear purpose and is no longer blank
**Status: ✅ PASS**

- **RightColumn.tsx** contains two panels:
  - Panel A: SectionNavigatorPanel (Important Tabs)
  - Panel B: DecisionSupportPanel (Suggested Diagnostics + Missing Info Alerts)
- Right column is populated with functional content
- No blank/white space

**Implementation:**
- `RightColumn.tsx` - Main container
- `SectionNavigatorPanel.tsx` - Section navigation
- `DecisionSupportPanel.tsx` - Decision support content
- `SuggestedDiagnosticsAccordion.tsx` - Diagnostics selection
- `MissingInfoAlerts.tsx` - Soft reminders

### 2. "Important Tabs" lets doctor jump to sections instantly
**Status: ✅ PASS**

- Tabs use `scrollIntoView({ behavior: "smooth", block: "center" })`
- No route navigation (`router.push` not used)
- Scrolls within center column container only
- IntersectionObserver tracks active section and highlights tab

**Implementation:**
- `SectionNavigatorPanel.tsx` uses `centerScrollContainerRef.current?.querySelector('#sectionId')`
- `scrollToSection()` function uses `scrollIntoView()` on the section element
- No navigation away from intake page

### 3. Suggested Diagnostics is usable, compact, explicit selection only
**Status: ✅ PASS**

- Compact list rows (48px min-height, no heavy card UI)
- Explicit selection: "Add" button when unselected, checkbox when selected
- No auto-selection: Diagnostics start with `selected: false`
- Default: show top 3 items per group + "Show all" link
- Muted colors (no bright green/red)

**Implementation:**
- `SuggestedDiagnosticsAccordion.tsx` - Compact accordion groups
- Each item requires explicit click to select
- Selection state managed via `toggleDiagnostic()` function
- No automatic selection on load or suggestion

### 4. Missing info alerts are soft and dismissible
**Status: ✅ PASS**

- Very subtle neutral background (`bg-gray-50/50`)
- No warning colors (muted gray throughout)
- Dismissible with X button (optional)
- Non-blocking: alerts don't prevent completion
- Header: "Missing information" with subtext "Helpful reminders (not required)."

**Implementation:**
- `MissingInfoAlerts.tsx` - Soft, dismissible alerts
- Subtle styling: `bg-gray-50/50`, `border-gray-200/50`
- Optional dismiss button
- No red/yellow warning colors

### 5. Footer "Order diagnostics" uses selected diagnostics
**Status: ✅ PASS**

- Modal opens when "Order diagnostics" clicked
- Pre-populated with `selectedDiagnostics[]` from right panel
- Doctor can add/remove diagnostics within modal
- Submitting logs audit event with diagnostics details
- Updates `selectedDiagnostics` state

**Implementation:**
- `OrderDiagnosticsModal.tsx` - Pre-populated modal
- Receives `selectedDiagnostics` prop filtered from `intakeData.suggestedDiagnostics`
- Shows all available diagnostics for adding
- Logs audit event on submit

## ❌ FAIL Prevention

### 1. Tabs navigate away from the intake page
**Status: ✅ PREVENTED**

- Tabs use `scrollIntoView()` only
- No `router.push()` calls
- No `href` attributes
- No navigation components (`Link`, `useRouter`)

**Verification:**
- `SectionNavigatorPanel.tsx` - Only uses `scrollToSection()` with `scrollIntoView()`
- No router imports or navigation logic

### 2. Diagnostics auto-select
**Status: ✅ PREVENTED**

- All diagnostics start with `selected: false`
- Selection requires explicit user action (click "Add" or checkbox)
- No automatic selection on suggestion generation
- No `defaultSelected` or `autoSelect` props

**Verification:**
- `suggestDiagnostics()` function sets `selected: false` for all items
- `toggleDiagnostic()` requires explicit click
- No auto-selection logic

### 3. Alerts feel like errors or block completion
**Status: ✅ PREVENTED**

- Alerts use subtle gray colors (no red/yellow)
- Non-blocking: don't prevent form completion
- Dismissible: can be closed without affecting validation
- Header explicitly states "Helpful reminders (not required)."

**Verification:**
- `MissingInfoAlerts.tsx` - Subtle gray styling
- No error colors (`bg-red`, `text-red`, `border-red`)
- Dismissible without validation impact
- Non-blocking UI

### 4. Right column remains empty/white or visually noisy
**Status: ✅ PREVENTED**

- Right column populated with:
  - Section Navigator (10 tabs)
  - Suggested Diagnostics (accordion groups)
  - Missing Info Alerts (3 default alerts)
- Clean, clinical style:
  - Muted colors throughout
  - Compact spacing
  - No bright colors or heavy UI
  - Subtle borders and backgrounds

**Verification:**
- `RightColumn.tsx` - Contains both panels
- `DecisionSupportPanel.tsx` - Populated with content
- Visual style: Clean, clinical, non-noisy

## Summary

**All PASS criteria met ✅**
**All FAIL conditions prevented ✅**

The right column implementation meets all acceptance criteria and prevents all failure conditions.


