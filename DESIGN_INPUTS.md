# Design Inputs Required for Hero Section

This document outlines the exact design inputs needed to complete the hero section implementation.

## A) Curve SVG Path

**Required:** Final curve SVG path or control points

### Option 1: SVG Path String (Preferred)
- **Format:** Single spline path in normalized viewBox
- **viewBox:** `0 0 1000 700`
- **Example:** `M 80 420 C ... 920 280`
- **Delivery:** Provide as `d` attribute string
- **File:** `src/data/curve.json`

### Option 2: Control Points JSON
```json
{
  "viewBox": [0, 0, 1000, 700],
  "points": [
    {"x": 80, "y": 420},
    {"x": 240, "y": 410},
    {"x": 420, "y": 360},
    {"x": 610, "y": 330},
    {"x": 780, "y": 300},
    {"x": 920, "y": 280}
  ],
  "spline": "catmull-rom"
}
```

**Acceptance Criteria:**
- Must not read as a chart (no axes)
- Smooth spline, gentle slope changes
- Slight inflection AFTER the signal zone

---

## B) Dot Maps

**Required:** Two JSON files with dot positions

### Files Needed:
1. `src/data/dots.desktop.json` (~90-140 dots)
2. `src/data/dots.mobile.json` (~45-70 dots)

### Schema:
```json
{
  "viewBox": [0, 0, 1000, 700],
  "dots": [
    {
      "id": "d001",
      "tier": "far",
      "scatter": {"x": 120, "y": 180},
      "aligned": {"x": 210, "y": 410},
      "stateMode": "aligned"
    }
  ]
}
```

### Field Definitions:
- **tier:** `"far"` or `"near"` (controls opacity)
- **scatter:** Position used in `ambient` state (and always for scatter dots)
- **aligned:** Position used in `aligned`/`foresight` states if `stateMode === "aligned"`
- **stateMode:**
  - `"aligned"` = uses aligned position in aligned/foresight states
  - `"scatter"` = always scatter in all states

### Rendering Logic:
- **ambient:** All dots at `scatter` position
- **aligned:** If `stateMode === "aligned"` → use `aligned`, else `scatter`
- **foresight:** Same as aligned

---

## C) Signal Placement

**Required:** Normalized coordinates along curve

### File: `src/data/signal.json`

### Schema:
```json
{
  "viewBox": [0, 0, 1000, 700],
  "signal": {
    "t": 0.72,
    "x": 735,
    "y": 312,
    "tooltipOffset": {"dx": 14, "dy": -18},
    "emphasisZone": {
      "tStart": 0.65,
      "tEnd": 0.80
    }
  }
}
```

### Field Definitions:
- **t:** Value along curve (0-1) - used for emphasis zone
- **x, y:** Explicit coordinates for dot placement
- **tooltipOffset:** Offset from signal dot for tooltip positioning
- **emphasisZone:** Optional zone to highlight along curve

**Constraint:** Signal must appear before the curve's inflection point.

---

## D) Dashboard Fragments

**Required:** 2-4 blurred image exports + placement guidance

### Files Needed:
1. Image files: `fragment-01.avif`, `fragment-02.avif`, etc. (and/or `.webp`)
2. Placement JSON: `src/data/fragments.json`

### Image Requirements:
- Pre-blurred/defocused (8-12px blur)
- Cropped so no UI chrome is recognizable
- Low contrast
- AVIF or WebP format
- Export at 1x and 2x sizes for retina displays

### Placement Schema:
```json
{
  "fragments": [
    {
      "id": "fragment-01",
      "src": "fragment-01.avif",
      "placement": {
        "anchor": "right",
        "x": 0.62,
        "y": 0.18,
        "w": 0.42,
        "h": 0.55,
        "rotationDeg": -6
      },
      "opacity": 0.10,
      "mask": {
        "type": "radial",
        "feather": 0.35
      },
      "priority": true
    }
  ]
}
```

### Field Definitions:
- **placement:** Normalized coordinates (0-1) relative to hero visual bounds
  - **anchor:** `"left"`, `"right"`, or `"center"` (for positioning reference)
  - **x, y:** Top-left anchor point (normalized 0-1)
  - **w, h:** Width and height (normalized 0-1)
  - **rotationDeg:** Rotation in degrees
- **opacity:** Hard cap at 0.12 (will be clamped)
- **mask:** 
  - **type:** `"radial"` or `"linear"` gradient fade
  - **feather:** Feather amount (0-1)
- **priority:** `true` for first fragment (LCP optimization)

---

## Current Status

### ✅ Implemented:
- Component structure ready to accept design inputs
- JSON schema interfaces defined
- Conversion functions ready
- Placeholder JSON files created

### ⏳ Waiting for Design:
1. **Curve:** Final SVG path or control points
2. **Dots:** Desktop and mobile dot maps
3. **Signal:** Exact placement coordinates
4. **Fragments:** Blurred images + placement JSON

---

## How to Integrate Design Files

Once design files are provided:

1. **Curve:** Replace `CURVE_PATH` constant with import from `curve.json`
2. **Dots:** Replace `generateDesktopDots()` and `generateMobileDots()` with imports from JSON files
3. **Signal:** Replace `SIGNAL_DATA` constant with import from `signal.json`
4. **Fragments:** Replace `FRAGMENTS_DATA` constant with import from `fragments.json`
5. **Images:** Place fragment images in `/public/dashboard-fragments/` directory

All conversion functions are already implemented and ready to use.


