# Scrolling Fix Documentation

## What Was Wrong

The Clinical Priority Queue page had critical UX issues:

1. **Page-level scrolling**: The entire page scrolled, causing the table header and filters to scroll out of view
2. **Rows scrolling under header**: Table rows would scroll behind the table header, making it impossible to see column labels while reviewing patient data
3. **Loss of orientation**: Doctors lost visual reference points (filters, headers) while scrolling through patient data
4. **Missing footer**: No system status indicator at the bottom

## What Fixed It

### 1. Layout Structure Changes

**Cabinet Layout (`src/app/cabinet/layout.tsx`)**:
- Set main content area to fixed height: `calc(100vh - 56px)` (accounting for top bar)
- Changed main content from `overflow-y-auto` to `overflow-hidden` with `flex flex-col`
- Added `min-height: 0` to flex children to enable proper scroll container behavior

**Priority Queue Page (`src/app/cabinet/priority-queue/page.tsx`)**:
- Restructured into three fixed-height regions:
  - **Filters Bar**: `flex-shrink-0` (56px, no scroll)
  - **Table Container**: `flex-1` with `overflow-hidden` and `min-height: 0`
  - **Footer**: `flex-shrink-0` (28px, no scroll)

### 2. Scroll Container Implementation

The table body is now the **only** scrollable element:

```tsx
<div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
  <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
    <table>
      <thead className="sticky top-0 z-10 bg-gray-50">...</thead>
      <tbody>...</tbody>
    </table>
  </div>
</div>
```

Key CSS properties:
- `overflow-hidden` on parent prevents page scrolling
- `overflow-y-auto` on table container enables body scrolling
- `min-height: 0` on flex children is **critical** - without it, flex items won't shrink below content size
- `sticky top-0` on table header keeps it visible during scroll
- `z-index: 10` ensures header stays above body rows
- `bg-gray-50` on header prevents visual bleed-through

### 3. Fixed Regions

**Filters Bar**:
- Uses `flex-shrink-0` to prevent compression
- Contains title, search, status counters, and filter chips
- Always visible, never scrolls

**Footer**:
- New component: `CabinetFooterStatus.tsx`
- Fixed 28px height with `flex-shrink-0`
- Shows system status: "All changes saved · Last sync 14:32"
- Always visible at bottom

## How to Avoid Regressions

### Critical Rules

1. **Never add `overflow-y-auto` to the page container** - only the table body should scroll
2. **Always use `min-height: 0` on flex children** that contain scroll containers
3. **Keep fixed regions with `flex-shrink-0`** - filters bar and footer must never shrink
4. **Sticky headers need `z-index` and background color** - prevents visual overlap
5. **Main content area must be `overflow-hidden`** - prevents page-level scrolling

### Testing Checklist

- [ ] Filters bar remains visible while scrolling table
- [ ] Table header stays sticky and visible
- [ ] Table rows scroll smoothly within body container
- [ ] No rows scroll behind header
- [ ] Footer remains visible at bottom
- [ ] Page itself does not scroll (no window scrollbar)
- [ ] Empty state shows in table body region (footer still visible)

### Common Mistakes to Avoid

❌ **Wrong**: Adding `overflow-y-auto` to page-level div
```tsx
<div className="h-full overflow-y-auto">  // DON'T DO THIS
```

✅ **Correct**: Only table body scrolls
```tsx
<div className="flex-1 overflow-hidden">
  <div className="flex-1 overflow-y-auto">  // Only this scrolls
```

❌ **Wrong**: Missing `min-height: 0` on flex children
```tsx
<div className="flex-1">  // Missing min-height: 0
```

✅ **Correct**: Include `min-height: 0` for proper flex behavior
```tsx
<div className="flex-1" style={{ minHeight: 0 }}>
```

❌ **Wrong**: Sticky header without background
```tsx
<thead className="sticky top-0">  // Missing bg and z-index
```

✅ **Correct**: Sticky header with proper styling
```tsx
<thead className="sticky top-0 z-10 bg-gray-50">
```

## Technical Details

### Height Calculation

- **Top Bar**: 56px (fixed)
- **Main Content**: `calc(100vh - 56px)` (fills remaining viewport)
- **Filters Bar**: ~56px (flex-shrink-0)
- **Table Container**: `flex-1` (fills remaining space)
- **Footer**: 28px (flex-shrink-0)

### Flexbox Behavior

The `min-height: 0` property is essential because:
- Flex items have a default `min-height: auto`
- This prevents them from shrinking below their content size
- Without `min-height: 0`, the scroll container won't constrain properly
- This is a common CSS gotcha with flexbox scroll containers

### Stacking Context

- **Top Bar**: `z-50` (highest)
- **Table Header**: `z-10` (above body rows)
- **Table Body Rows**: `z-0` (default)
- **Footer**: `z-0` (default, but always visible due to layout)

## Related Files

- `src/app/cabinet/layout.tsx` - Cabinet shell layout
- `src/app/cabinet/priority-queue/page.tsx` - Priority queue page
- `src/components/cabinet/CabinetFooterStatus.tsx` - Footer component




