# Right Column Layout Options

## Default Layout: Stacked Panels in Right Column

**Current Implementation:**

```
Right Column (320px, fixed width)
 ├─ Panel A: Important Tabs Navigator (sticky at top, flex-shrink-0)
 └─ Panel B: Decision Support (flex-1, overflow-y: auto)
    ├─ Suggested Diagnostics
    └─ Missing Information Alerts
```

**Behavior:**
- Important Tabs Navigator stays fixed at top of right column
- Decision Support panel scrolls independently if content overflows
- Right column container has `overflow: hidden` to prevent double scrolling
- Decision Support panel has `overflow-y: auto` and `min-height: 0` for proper scrolling

**When to use:**
- Default layout for most cases
- Right column content fits comfortably
- Tabs remain easily accessible

## Alternative Layout: Thin Vertical Sub-Rail

**If right column becomes too dense, consider:**

```
Center Column | Sub-Rail (48px) | Right Column (272px)
              ├─ Important Tabs  | Decision Support
              │  (vertical)      | (scrolls)
              └─ (icons only)    |
```

**Implementation notes:**
- Create a new 48px wide column between center and right
- Important Tabs Navigator moves to sub-rail
- Tabs display as vertical list (icons only or compact labels)
- Right column width reduces to 272px (320px - 48px)
- Decision Support remains in right column

**When to use:**
- Right column is too dense with both panels
- Tabs need to be always visible without scrolling
- Screen width allows for additional column

**Code structure (if implementing):**
```tsx
{/* Body: 3 columns instead of 2 */}
<div className="flex overflow-hidden" style={{ flex: "1 1 auto", minHeight: 0 }}>
  {/* LeftContext (260px) */}
  <div className="w-[260px] ...">...</div>
  
  {/* CenterScroll (flex-1) */}
  <div className="flex-1 ...">...</div>
  
  {/* Sub-Rail: Important Tabs (48px) */}
  <div className="w-[48px] border-l border-gray-200 bg-white flex-shrink-0">
    <ImportantTabsNavigatorVertical centerScrollContainerRef={centerScrollContainerRef} />
  </div>
  
  {/* RightSupport: Decision Support only (272px) */}
  <div className="w-[272px] border-l border-gray-200 bg-white flex-shrink-0 overflow-y-auto">
    <SuggestedDiagnosticsPanel ... />
  </div>
</div>
```

## Current Implementation Details

### Right Column Container
- Width: 320px (fixed)
- Layout: `flex flex-col`
- Overflow: `hidden` (container doesn't scroll)
- Min-height: `0` (allows flex children to shrink)

### Panel A: Important Tabs Navigator
- Position: `sticky, top: 0` (stays at top of right column)
- Flex: `flex-shrink-0` (doesn't shrink, stays fixed)
- Height: Variable (based on number of tabs + collapse state)

### Panel B: Decision Support
- Flex: `flex-1` (takes remaining space)
- Overflow: `overflow-y: auto` (scrolls if content overflows)
- Min-height: `0` (critical for scrolling in flex container)

## Testing Scrolling Behavior

1. **Right column not too dense:**
   - Tabs visible at top
   - Decision Support scrolls smoothly
   - No double scrollbars

2. **Right column too dense:**
   - Consider alternative layout (sub-rail)
   - Or ensure Decision Support scrolls correctly
   - Tabs remain accessible

## Migration Path (if needed)

To implement the alternative layout:

1. Create `ImportantTabsNavigatorVertical.tsx` component
   - Icons-only or compact vertical layout
   - 48px width constraint
   - Same scroll-to-section functionality

2. Update `FirstVisitIntakeWorkspace.tsx`:
   - Add sub-rail column (48px)
   - Move ImportantTabsNavigator to sub-rail
   - Reduce right column width to 272px
   - Keep Decision Support in right column

3. Update responsive breakpoints if needed:
   - At narrower widths, may need to stack or hide sub-rail




