# Jack Techie Hub Portfolio — Workspace Instructions

## Project Overview

**Jack Techie Hub Portfolio** is a modern, animated portfolio website showcasing projects with interactive components and dark/light theme support. The project consists of two main HTML pages with custom styling and vanilla JavaScript interactions.

### Key Components
- **index.html**: Main portfolio landing page with dark/light mode toggle, glassmorphism design, and responsive layout
- **Section Template/project-showcase.html**: Reusable project showcase template with animated carousel (20 slides) and neon-bordered project cards (9 cards max)
- **Asset/**: Organized image directories
  - `Catlog IMG/` - Catalog images
  - `ICON IMG/` - Icon assets  
  - `IMG/` - General images
  - `Portfolio IMG/` - Portfolio showcase images

---

## Architecture & Design Patterns

### Visual Design Language
- **Color Scheme**: Dark theme (deep blue/cyan) with light theme variant (cream/gold)
- **Typography**: 
  - Headlines: `Orbitron` (project-showcase) or `Bebas Neue`, `Instrument Serif` (index)
  - Body text: `Rajdhani` (project-showcase) or `Syne`, `DM Mono` (index)
- **Effects**: Neon glows, animated borders, transitions, glassmorphism
- **Radius defaults**: `--radius-card: 18px`, `--radius-btn: 8px`
- **Transition timing**: `--transition-speed: 0.4s` or `cubic-bezier(.4,0,.2,1)`

### CSS Variables & Theming
Both pages use CSS custom properties for consistent theming:
- Dark mode (default): `data-theme="dark"` or `html` root
- Light mode: `html.day-mode` class or `data-theme="light"`
- Variables defined at `:root` and updated per theme (colors, glows, backgrounds)

### Interactive Patterns
- **Theme Toggle**: Button with emoji indicator toggling `data-theme` attribute
- **Carousel**: Auto-rotating with manual controls (arrows, numbered dots), progress bar, keyboard support (ArrowLeft/ArrowRight), touch swipe support
- **Modal System**: Overlay backdrop with escaper key support, smooth transitions
- **Cards**: Float animations with hover states, close button removes card with CSS animations

---

## Code Style & Conventions

### HTML
- **Semantic structure**: Sections with class names describing purpose (`.carousel-section`, `.cards-section`)
- **Accessibility**: ARIA labels on buttons (`aria-label="Previous"`)
- **Data attributes**: Used for passing configuration (`data-theme`, `data-gallery`, `data-yt`)
- **Image optimization**: Placeholder patterns use `src="https://picsum.photos/seed/<name>/..."` during design; replace with local assets

### CSS
- **Organization**: Comments organize sections (`/* ═══ THEME VARIABLES ═══ */`)
- **Mobile-first approach**: Start with base styles, use `@media` for larger screens
- **Animations**: Named keyframes (`@keyframes neonBorder`, `@keyframes floatCard1`)
- **Pseudo-elements**: Used for decorative borders and overlays (`.project-card::before` for neon effect)
- **Flex/Grid**: Grid for responsive card layouts, flex for component alignment
- **Common breakpoints**: 
  - `@media (max-width: 480px)` - Mobile
  - `@media (max-width: 768px)` - Tablet
  - `@media (min-width: 769px)` - Desktop

### JavaScript
- **Vanilla ES6**: Const/let, arrow functions, template literals
- **Event handling**: Click handlers, keyboard listeners, touch events
- **State management**: Minimal—track carousel position, autoplay state, modal visibility
- **DOM manipulation**: `querySelector`, `classList.toggle/add/remove`, `innerHTML`
- **Timing**: `setInterval` for auto-play, `setTimeout` for animation delays

---

## Customization Guide

### Project Showcase Template (project-showcase.html)

#### Carousel Slides
See [Section Template/README.md](Section%20Template/README.md#-carousel-customization) for detailed instructions.

**Quick reference:**
- Find `<!-- SLIDE 1 -->` blocks and replace image/caption
- Change autoplay interval: `const INTERVAL = 4000;` (line ~1442)
- Add/remove slides: Duplicate/delete `.carousel-slide` blocks; JS auto-detects count

#### Project Cards
- **Replace images**: Update `src` in `.card-img-wrap img`
- **Update text**: Modify `.card-tag`, `.card-title`, `.card-text`
- **Gallery data**: Pass JSON array to `data-gallery` attribute on "Know More" button
- **YouTube data**: Pass video array to `data-yt` attribute on "YouTube" button
- **Max 9 cards** recommended for 3-column layout (responsive: 1 col on mobile)

#### Gallery Modal
- Opens via "Know More" button
- Displays image slideshow with thumbnails and navigation arrows
- Data structure: `[{ title: "...", desc: "...", src: "..." }, ...]`

#### YouTube Modal  
- Opens via "YouTube" button
- Grid layout of video thumbnails that link to YouTube
- Data structure: `[{ title: "...", thumb: "...", url: "..." }, ...]`

### Main Index Page (index.html)
- Modify title and subtitle in header
- Update section content as needed
- Keep dark/light mode toggle functional
- Maintain responsive breakpoints

---

## File Organization Best Practices

### Assets Structure
```
Asset/
├── Catlog IMG/       - Catalog/product images
├── ICON IMG/         - Icon SVGs or small graphics
├── IMG/              - General purpose images
└── Portfolio IMG/    - Project showcase images (use for carousel & cards)
```

### Image Naming Convention
- Descriptive names: `project-dashboard.jpg` > `1.jpg`
- Prefixed for carousel: `carousel-slide-01.jpg`, `carousel-slide-02.jpg`
- Prefixed for cards: `card-project-01.jpg`, `card-project-02.jpg`

### Responsive Considerations
- **Carousel**: Aspect ratio 16/7 on desktop, 4/3 on tablet (auto-responsive via CSS)
- **Card grid**: 3 columns on desktop, 1 column on mobile (auto via `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`)
- Use `clamp()` for scalable font sizes: `font-size: clamp(0.75rem, 2vw, 0.95rem)`

---

## Common Workflows

### ✓ Adding a New Project to Showcase
1. Prepare 1-3 gallery images for the project
2. Duplicate a card block in `cards-grid`
3. Update card-tag, card-title, card-text
4. Replace image src in `.card-img-wrap img`
5. Populate `data-gallery` JSON with images and descriptions
6. Populate `data-yt` JSON with YouTube video thumbnails (optional)

### ✓ Changing Theme Colors
1. Edit `:root` variables or `[data-theme="light"]` section in `<style>`
2. Update `--cyan`, `--magenta`, `--accent` for primary colors
3. Adjust glow shadows: `--glow-cyan: 0 0 8px #00e5ff, ...`
4. Test in both dark and light modes

### ✓ Adjusting Animations
1. Carousel interval: Modify `const INTERVAL`
2. Float animations: Edit `@keyframes floatCard1`, `floatCard2`, `floatCard3`
3. Transition speeds: Update `--transition-speed` and cubic-bezier timings
4. Border rotation: Change `animation: borderRotate 4s linear infinite;`

### ✓ Deployment
1. Replace placeholder images (`picsum.photos`) with actual assets from `Asset/` folder
2. Test both theme modes and all interactive features
3. Verify responsive breakpoints on mobile devices
4. Check carousel and card interactions (click, hover, keyboard)
5. Deploy both `index.html` and `Section Template/project-showcase.html`

---

## Key File Locations

| File | Purpose | Edit When |
|------|---------|-----------|
| `index.html` | Main portfolio page | Adding new sections, updating hero, changing colors |
| `Section Template/project-showcase.html` | Project showcase template | Adding projects, adjusting carousel, updating cards |
| `Section Template/README.md` | Template documentation | Reference during customization |
| `Asset/**` | Image storage | Place portfolio images here |

---

## Testing Checklist

Before committing changes:
- [ ] Dark/light theme toggle works and persists
- [ ] Carousel auto-rotates and manual controls work
- [ ] Keyboard navigation (arrow keys) works in carousel
- [ ] Touch swipe works on mobile devices
- [ ] Modal opens/closes smoothly with escape key
- [ ] Gallery navigation and thumbnails function correctly
- [ ] YouTube button opens video grid
- [ ] Card close button removes card gracefully
- [ ] All images load without 404 errors
- [ ] Responsive layout works on mobile (480px), tablet (768px), desktop (1400px+)
- [ ] No console errors in browser DevTools

---

## Resources

- **Carousel docs**: [Section Template/README.md](Section%20Template/README.md)
- **Font sources**: Google Fonts (Orbitron, Rajdhani, Bebas Neue, Instrument Serif, Syne, DM Mono)
- **Color reference**: CSS variables defined at top of `<style>` blocks
- **Animation timing**: CSS `cubic-bezier(.4,0,.2,1)` used throughout
