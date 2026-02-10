# Visit 1 Right-Side Sections Rail - Implementation Summary

## Overview

Implemented a comprehensive two-part right-side rail for Visit 1 intake workspace:
- **Part A**: Section Navigator (tabs list) - sticky at top
- **Part B**: Tab Content Panel - scrollable, shows content based on selected tab

## Layout Requirements ✅

- **Width**: 360px (increased from 320px)
- **Height**: Full body height between header and footer
- **Background**: Surface (white)
- **Border-left**: 1px subtle
- **Padding**: 12px (container), 16px 12px (tab panels)
- **Layout**: Vertical flex with split layout

## Tabs Navigator ✅

### Visual
- Light theme (NOT dark)
- Each tab row: 32px height, icon + label
- Active state: subtle tinted background (`bg-blue-50`) + left indicator (`border-l-2 border-blue-500`)
- Group separators:
  - **Intake**: Overview, Cardiovascular, Metabolic, Cancer/Screening, Neuro, Sleep, Fitness
  - **Outputs**: Plan, Timeline, Documents

### Behavior
- Clicking a tab switches right panel content (no navigation)
- Also scrolls center column to corresponding anchor (`scrollIntoView`)
- Active tab updates automatically based on center scroll (IntersectionObserver)
- Sticky at top inside right column, max height ~280px

## Tab Content Panel Structure ✅

Each tab panel uses the same shared structure:

1. **What you should see** (read-only snapshot; max 6 items)
2. **Quick actions** (2-5 action chips/buttons)
3. **Quiet decision support** (suggestions; collapsible, default collapsed)
4. **Documentation anchors** (what will be captured; read-only indicator)

### UI Constraints
- No big cards with loud colors
- No red warnings
- Compact lists, pills, small buttons
- Default collapsed for "Decision support" section

## Per-Tab Implementation ✅

### Tab: Overview
- **What I should see**: Patient goals (top 3), Patient story status, Baseline risk tiles mini-strip, "What we will decide today" checklist
- **Quick actions**: Add goal, Mark section reviewed, Add highlight, Add hypothesis, Add to Orders draft
- **Quiet decision support**: Entity extraction indicator, Missing goals prompt, Risk status
- **Documentation anchors**: Goals, Patient story, Top risks, Constraints, Next steps
- **Orders draft mini**: Shows selected diagnostics count + "Review selected" link

### Tab: Cardiovascular
- **What I should see**: CVD intake panel snapshot (Family events + ages, BP history, Smoking status, Symptoms)
- **Quick actions**: Add family event, Mark risk factors reviewed, Start BP plan, Add CVD baseline bundle to Orders draft, Document symptoms
- **Quiet decision support**: Advanced lipids suggestion, BP workflow, Missing ages prompt
- **Documentation anchors**: Family CVD history, BP plan, Symptoms, CVD bundle

### Tab: Metabolic
- **What I should see**: Metabolic intake snapshot (Meal timing, Weight history, Gestational diabetes, Energy crashes, Activity summary)
- **Quick actions**: Metabolic risk reviewed, Add metabolic labs bundle to Orders draft, Note dietary pattern, Add lifestyle leverage point
- **Quiet decision support**: Insulin resistance screen suggestion, Mismatch highlight
- **Documentation anchors**: Metabolic risk reviewed, Key lifestyle factors, Bundle selection

### Tab: Cancer / Screening
- **What I should see**: Screening + family cancer intake (Family cancer types + ages, Prior screenings, Red flag checklist, Patient anxiety)
- **Quick actions**: Add family cancer event, Update screening status, Add screening plan, Add recommended screening reminders to Plan
- **Quiet decision support**: Early screening suggestion, Red flags checklist
- **Documentation anchors**: Family cancer history, Screening status, Planned next steps

### Tab: Neuro
- **What I should see**: Cognition / mental health snapshot (Brain fog, Mood, Attention issues, Stress load, Family neuro history)
- **Quick actions**: Add cognition baseline note, Quick stress assessment, Flag burnout risk, Add coping resource suggestion
- **Quiet decision support**: Resilience practices suggestion, Depression/anxiety screen prompt
- **Documentation anchors**: Neuro/cognition baseline, Stress overload acknowledged, Minimal plan

### Tab: Sleep
- **What I should see**: Sleep snapshot (Duration, Quality, Timing, Awakenings, Snoring risk, Circadian stability)
- **Quick actions**: Capture sleep baseline, Mark: no action now, Add sleep questions
- **Quiet decision support**: "No sleep concerns detected" (muted) or sleep study screening questions
- **Documentation anchors**: Sleep reviewed, Risks asked, Monitor vs investigate

### Tab: Fitness
- **What I should see**: Movement baseline snapshot (Strength frequency, Cardio gap indicator, Steps/walking, Sitting time, Vein-support habits)
- **Quick actions**: Capture routine, Identify gaps, Add movement prescription draft
- **Quiet decision support**: Zone 2 suggestion (if CVD risk high), Calf pump suggestion (if varicosis)
- **Documentation anchors**: Fitness baseline, Leverage points

### Tab: Plan
- **What I should see**: Visit 1 Next Steps Plan (Diagnostics to do, What patient should do before Visit 2, Expectations on results communication)
- **Quick actions**: Generate patient-friendly plan, Assign tasks to team, Choose follow-up type, Set follow-up timing
- **Quiet decision support**: No diagnostics selected prompt, Visit 2 scheduling reminder
- **Documentation anchors**: Ordered tests, Prep instructions, What happens next, Follow-up timing

### Tab: Timeline
- **What I should see**: Today's artifacts (Intake note, Orders, Tasks, Follow-up, Messages)
- **Quick actions**: Mark orders placed, Finish unfinished
- **Quiet decision support**: Orders drafted but not placed warning
- **Documentation anchors**: Audit trail entries

### Tab: Documents
- **What I should see**: Uploaded records list, Missing documents list, Tag categories, Review status
- **Quick actions**: Upload document, Tag to category, Mark reviewed
- **Quiet decision support**: Document ingestion assist (stub)
- **Documentation anchors**: Documents reviewed/awaiting, Imported history acknowledged

## Component Structure ✅

### Main Components
- `Visit1RightRail.tsx` - Main container (360px width)
- `RightRailTabsNavigator.tsx` - Tabs list with group separators
- `RightRailTabPanel.tsx` - Shared panel structure

### Tab Panels
- `TabOverviewPanel.tsx`
- `TabCardioPanel.tsx`
- `TabMetabolicPanel.tsx`
- `TabCancerPanel.tsx`
- `TabNeuroPanel.tsx`
- `TabSleepPanel.tsx`
- `TabFitnessPanel.tsx`
- `TabPlanPanel.tsx`
- `TabTimelinePanel.tsx`
- `TabDocumentsPanel.tsx`

### Shared Subcomponents
- `QuietSuggestions.tsx` - Collapsible decision support
- `QuickActionsRow.tsx` - Action chips/buttons
- `DocumentationAnchors.tsx` - What will be captured
- `OrdersDraftMini.tsx` - Orders draft list + count + "Review selected"

## Integration ✅

### Center Column
- All sections have anchored IDs matching tabs (`#overview`, `#cardiovascular`, etc.)
- Tabs scroll center column to corresponding anchor using `scrollIntoView`
- IntersectionObserver tracks active section and highlights tab

### Footer
- "Order diagnostics" opens modal prefilled from Orders draft (selected diagnostics)
- "Complete visit" shows soft review if missing info reminders exist

## Acceptance Criteria ✅

### PASS Criteria (All Met)
- ✅ Right column is useful (not blank) - All tabs have meaningful content
- ✅ Tabs exist and show meaningful, visit-relevant content - All 10 tabs implemented
- ✅ Everything is optional and quiet - No mandatory fields, all suggestions collapsible
- ✅ Doctors can add to Orders draft from any relevant tab - Quick actions in Overview, Cardio, Metabolic tabs
- ✅ Missing info reminders are non-blocking - Soft, dismissible, subtle gray
- ✅ The "Plan" tab clearly synthesizes next steps - Shows diagnostics, patient tasks, results communication

### FAIL Prevention (All Prevented)
- ✅ Tabs are NOT dark/marketing styled - Light theme throughout
- ✅ Right column is NOT cluttered or distracting - Clean, clinical style, compact spacing
- ✅ No tab forces mandatory data entry - All fields optional, no validation blocking
- ✅ Decision support does NOT appear as popups/alerts - Collapsible, quiet, default collapsed
- ✅ Navigation does NOT leave the visit unintentionally - Uses `scrollIntoView` only, no `router.push`

## Technical Details

### Styling
- All spacing uses multiples of 8px
- Typography: 12px/13px for labels, 13px/16px for body
- Colors: Subtle grays, muted backgrounds, no bright colors
- Borders: 1px subtle gray

### State Management
- Active tab state managed in `Visit1RightRail`
- Tab content derived from `intakeData` prop
- Updates flow through `onUpdateIntakeData` callback

### Performance
- IntersectionObserver efficiently tracks visible sections
- Tab panels render on-demand (only active tab)
- No unnecessary re-renders

## Next Steps (Future Enhancements)

1. Implement actual modals for quick actions (Add goal, Add family event, etc.)
2. Connect to backend for persistent storage
3. Add real-time collaboration features
4. Implement document upload functionality
5. Add audit trail logging for all actions
6. Enhance AI suggestions based on narrative analysis



