# Intake Workspace Scrolling Fix

## What Was Wrong

### Problem: Scroll Container Issues

The First Visit Intake Workspace had multiple scrolling issues:

1. **Center content stopped scrolling before the bottom** - Page felt "stuck" and unusable during live visits
2. **Sticky footer was missing** - Visit actions weren't always reachable
3. **Right support column was blank** - Decision support content wasn't visible
4. **Layout had height/overflow bugs** - Flex children missing `min-height: 0`, wrong scroll container, or body scrolling disabled incorrectly

### Root Cause

In a 3-column flex layout, "scroll stops early" typically happens because:

- The scroll container was not the element with constrained height
- A parent had `overflow: hidden` without giving a child `min-height: 0`
- The center column used `height: 100%` without a real height context
- Body/page scrolling was disabled, but no internal scroll container was correctly defined

## What Was Changed

### 1. Fixed Height Context

**DoctorCabinetLayout main content area:**
```css
height: calc(100vh - 56px) /* top bar height */
```

**Intake page root:**
```css
height: 100% /* fills parent container */
```

### 2. Applied "min-height: 0" Rule

Any flex child that contains a scroll area must have `min-height: 0`.

**Root container:**
```css
display: flex;
flex-direction: column;
height: 100%;
overflow: hidden;
```

**Body:**
```css
flex: 1 1 auto;
min-height: 0; /* Critical */
overflow: hidden;
display: flex;
```

**Center column scroll region:**
```css
flex: 1 1 auto;
min-width: 0; /* Critical for flex items */
min-height: 0; /* Critical */
overflow-y: auto; /* Only this column scrolls */
padding: 24px;
```

### 3. Layout Structure

```
IntakePageRoot (height: 100%)
 ├─ Header (fixed 64px, flex-shrink-0)
 ├─ Body (flex: 1; min-height: 0; overflow: hidden)
 │    ├─ LeftContext (fixed width; overflow: auto optional)
 │    ├─ CenterScroll (flex: 1; min-height: 0; overflow-y: auto) ✅ main scroll container
 │    └─ RightSupport (fixed width; overflow-y: auto optional)
 └─ Footer (sticky 64px; flex-shrink-0)
```

### 4. Content Sections

All center column sections can grow naturally:
- No `max-height` constraints
- No `height: 100%` on inner containers
- `height: auto` and `minHeight: auto` on content wrappers
- Sections container uses `flex-direction: column` with `gap: 32px`

### 5. Right Column Population

- Width: 320px
- Padding: 16px
- Background: surface (white)
- Border-left: subtle
- Content: Suggested Diagnostics (expandable groups) + Missing Information Alerts
- Selected Orders: Shows selected diagnostics at top

## How to Avoid Regressions

### Critical Rules

1. **Always set `min-height: 0` on flex children that contain scroll areas**
   - Without this, flex items won't shrink below their content size
   - This breaks scrolling in nested flex layouts

2. **Only one scroll container per layout**
   - In this workspace: ONLY CenterScroll has `overflow-y: auto`
   - Left and Right columns have `overflow: auto` (optional, only if content overflows)
   - Body and Root have `overflow: hidden`

3. **Fixed-height app shell + internal scroll region**
   - Root: `height: 100%` (fills parent)
   - Header: `flex-shrink-0, height: 64px`
   - Body: `flex: 1, min-height: 0, overflow: hidden`
   - Footer: `flex-shrink-0, height: 64px`
   - CenterScroll: `flex: 1, min-height: 0, overflow-y: auto`

4. **Never add `height: 100%` to content sections**
   - Content sections should use `height: auto` to grow naturally
   - Only containers that need to fill available space use `height: 100%`

5. **Test scrolling behavior**
   - Verify center column scrolls to bottom
   - Verify header and footer remain visible
   - Verify no "stuck" scroll behavior
   - Verify accordion expansion doesn't break scroll

### Common Mistakes to Avoid

❌ **Don't:** Add `height: 100%` to inner content wrappers
✅ **Do:** Use `height: auto` and let content grow naturally

❌ **Don't:** Forget `min-height: 0` on flex children with scroll
✅ **Do:** Always add `min-height: 0` to flex items that scroll

❌ **Don't:** Use `overflow: hidden` on the scroll container
✅ **Do:** Use `overflow-y: auto` on the scroll container, `overflow: hidden` on parent

❌ **Don't:** Add `max-height` to sections
✅ **Do:** Let sections grow naturally, scroll container handles overflow

### Testing Checklist

Before considering the scrolling fix complete, verify:

- [x] Center column scrolls all the way to the bottom
- [x] Header + footer remain visible always
- [x] No "stuck" scroll
- [x] Footer visible without scrolling
- [x] Buttons clickable and do not overlap content
- [x] Right column shows Suggested Diagnostics + Missing Info Alerts
- [x] Selecting diagnostics updates state (selected property)
- [x] No layout shifting when typing in patient story
- [x] Accordion expansion doesn't break scroll

## Files Modified

- `src/components/intake/FirstVisitIntakeWorkspace.tsx` - Main layout structure
- `src/components/intake/SuggestedDiagnosticsPanel.tsx` - Right column content + Selected Orders
- `src/app/cabinet/layout.tsx` - Main content area height
- `src/components/intake/IntakeHeader.tsx` - Fixed positioning
- `src/components/intake/VisitFooterActions.tsx` - Sticky footer

## Related Documentation

- Design tokens: See component files for spacing, typography, and color specifications
- Layout structure: See `FirstVisitIntakeWorkspace.tsx` for exact layout implementation

