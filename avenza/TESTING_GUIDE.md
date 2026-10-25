# Hero 3D Interactions - Testing Guide

## Quick Start
1. The dev server is running at `http://localhost:5173/`
2. Open in your browser and navigate to the homepage
3. Follow the tests below

## Test Scenarios

### Test 1: Dashboard 3D Tilt (Horizontal)
**Action**: Move your mouse slowly from left to right across the dashboard
**Expected**: 
- Dashboard tilts clearly on the Y-axis
- Effect is smooth and follows cursor position
- Maximum tilt visible (±24°)
- **Visual cue**: Left side of dashboard appears darker/recessed, right side appears bright

### Test 2: Dashboard 3D Tilt (Vertical)
**Action**: Move your mouse up and down across the dashboard
**Expected**:
- Dashboard tilts on the X-axis (top appears to recede/approach)
- Range: ±22° 
- Smooth spring response with slight overshoot
- **Visual cue**: Top/bottom edges show perspective depth

### Test 3: Floating Card Parallax
**Action**: Move mouse in circles around the dashboard while observing the floating cards
**Expected**:
- Top-right card (AI Trajectory Engine) moves with increased parallax (±48px on X-axis)
- Bottom-left card (Zero Guesswork) moves oppositely (±44px range)
- Cards maintain independent floating animations
- Different timing cycles (4.8s and 5.6s)
- **Visual cue**: Cards appear to float in front of dashboard at different depths

### Test 4: Cursor-Following Glow
**Action**: Hover over the dashboard and move cursor around
**Expected**:
- Soft cyan/blue radial glow follows your cursor
- Glow expands from cursor position (520px radius)
- Smooth tracking with slight spring lag
- Text remains readable
- **Visual cue**: Lighting effect that highlights dashboard elements based on cursor

### Test 5: Floating Card Hover
**Action**: Hover directly over the top-right card
**Expected**:
- Card lifts up (~6px) with smooth animation
- Border glows brighter (cyan)
- Box shadow expands with enhanced glow (±32px outer glow)
- Card slightly rotates (+2°)
- Subtle depth increase (translateZ: 70px)
- **Visual cue**: Card appears to pop out toward you

### Test 6: Main Button Hover
**Action**: Hover over "Start Free Discovery" button
**Expected**:
- Button lifts up (3px - more pronounced than before)
- Shadow expands significantly
- Glow effect increases (28px radius)
- Arrow icon slides right (+4px)
- Smooth shine animation across button
- **Visual cue**: Button appears more prominent and clickable

### Test 7: Secondary Button Hover
**Action**: Hover over "How It Works" button
**Expected**:
- Button lifts up (3px)
- Background becomes more transparent/lighter
- Border glows with blue accent (0.5 opacity)
- Chevron icon moves down (+3px)
- **Visual cue**: Subtle but clear depth increase

### Test 8: Trust Badge Hover
**Action**: Hover over any trust badge (e.g., "AI Fit Engine 2.0")
**Expected**:
- Badge lifts up (3px - increased from 2px)
- Background becomes more visible
- Icon scales up (1.18x) and rotates (6°)
- Icon glows with cyan color
- **Visual cue**: Badge becomes interactive and glows

### Test 9: 360° Spin
**Action**: Click the "360° 3D" button in the console header
**Expected**:
- Dashboard rotates full 360° smoothly
- Rotation completes in 1.25 seconds
- Spin icon animates during rotation
- Button becomes disabled during spin
- Dashboard returns to neutral position after completion
- **Visual cue**: Full perspective rotation showing all sides

### Test 10: Mouse Leave Reset
**Action**: Hover over dashboard, then move cursor away
**Expected**:
- Dashboard immediately stops responding to cursor
- Smoothly tilts back to neutral (0°, 0°) over ~400ms
- Glow fades out and returns to center
- Floating cards return to base position
- **Visual cue**: Smooth animation returning to rest state

### Test 11: Mobile Responsiveness
**Action**: Resize browser to < 960px width (or test on mobile device)
**Expected**:
- 3D interactions are disabled
- Floating cards (top-right and bottom-left) hidden on very small screens
- Layout remains intact and readable
- No errors in console
- Buttons and badges still functional
- **Visual cue**: Clean mobile layout without 3D complexity

### Test 12: Accessibility - Reduced Motion
**Action**: Enable "Prefer Reduced Motion" in OS settings, then refresh page
**Expected**:
- 3D tilt effects are disabled
- Floating animations are replaced with static positioning
- Hover effects use only opacity/color (no motion)
- Page remains fully functional
- **Visual cue**: Same layout and content, but no animation

### Test 13: Layout Stability
**Action**: Perform all hover tests and check for layout shifts
**Expected**:
- Dashboard dimensions never change
- No text wrapping or reflow
- Buttons stay in same position
- Content never overlaps
- **Visual cue**: Smooth visual effects only, no jumping content

### Test 14: Text Contrast During Glow
**Action**: Hover over dashboard and move cursor over text
**Expected**:
- All text remains clearly readable
- No section of text becomes illegible
- Glow effect enhances, not obscures, visibility
- **Visual cue**: Enhanced, not degraded, readability

### Test 15: Browser Compatibility
Test in multiple browsers:
- **Chrome/Edge**: Full 3D support expected
- **Firefox**: Full 3D support expected  
- **Safari**: Full 3D support expected (backdrop-filter with -webkit- prefix)

## Performance Checklist

- [ ] No console errors
- [ ] Smooth 60 FPS during interactions (check DevTools)
- [ ] No layout thrashing or reflows
- [ ] Mouse movement tracking is responsive (< 50ms lag)
- [ ] All animations complete without stuttering
- [ ] Page loads in < 3 seconds on standard connection
- [ ] Build bundle size: CSS 126.9 kB, JS 567.5 kB (reasonable for feature-rich SPA)

## Visual Verification Points

- [x] 3D tilt is clearly noticeable (15-22° range = obvious 3D effect)
- [x] Parallax cards move with pointer (not static)
- [x] Glow follows cursor smoothly
- [x] All hover effects are visible and smooth
- [x] No fake 3D (everything uses real transforms)
- [x] Premium feel maintained through all interactions
- [x] Original design integrity preserved

## Known Behaviors

1. **3D effects disabled on mobile (< 960px)** - Performance and UX optimization
2. **Floating cards hidden on very small screens (< 580px)** - Display space constraint
3. **360° spin disables tilt tracking during spin** - Prevents conflicting motions
4. **Glow centered on hover, reset on leave** - Intentional UX design
5. **Spring physics overshoot slightly** - Creates snappy, alive feel (configurable)

## If Something Doesn't Look Right

1. Check browser console for errors (F12 → Console)
2. Verify dev server is running: `npm run dev`
3. Hard refresh browser cache: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
4. Check viewport width (DevTools) - interactions disabled on mobile
5. Verify `prefers-reduced-motion` is not enabled in OS
6. Try in a different browser to isolate issues

## Summary
The hero section should now feel like a premium, interactive 3D interface with responsive 
cursor tracking, smooth parallax motion, and polished hover effects. All enhancements are 
performance-optimized and maintain the original beautiful design.
