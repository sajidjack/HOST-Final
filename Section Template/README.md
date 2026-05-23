# 🚀 Project Showcase Template
### Animated Carousel + Neon Cards · HTML5 · CSS3 · JavaScript ES6
---

## 📁 File Structure

```
project-showcase/
│
├── project-showcase.html     ← Main template file (everything inside)
├── README.md                 ← This guide
│
└── assets/                   ← (Create this folder for your images)
    ├── carousel/
    │   ├── slide-01.jpg
    │   ├── slide-02.jpg
    │   └── ... (up to slide-20.jpg)
    └── cards/
        ├── card-01.jpg
        ├── card-02.jpg
        └── ... (card-01 to card-09)
```

---

## 🔧 QUICK SETUP

### Step 1 — Download & Place File
Copy `project-showcase.html` into your existing website folder.

### Step 2 — Link it to Your Existing Website
In your existing website navigation, add a link to this file:

```html
<!-- In your navbar / header -->
<a href="project-showcase.html">Projects</a>
```

Or link to a specific section in your existing page:

```html
<a href="project-showcase.html#carousel">View Projects</a>
```

---

## 🎠 CAROUSEL CUSTOMIZATION

### ▶ Replace Slide Images
Find this section in the HTML (look for `<!-- SLIDE 1 -->`):

```html
<!-- SLIDE 1 -->
<div class="carousel-slide active">
  <img src="https://picsum.photos/seed/proj1/1400/600" alt="Project 1"/>
  <div class="slide-caption">
    <h2>Your Project Title Here</h2>
    <p>Short one-line description of your project</p>
  </div>
</div>
```

**Replace with your own image:**

```html
<div class="carousel-slide active">
  <img src="assets/carousel/slide-01.jpg" alt="My Project 1"/>
  <div class="slide-caption">
    <h2>My Stock Market App</h2>
    <p>Live trading signals and technical analysis for NSE/BSE</p>
  </div>
</div>
```

### ▶ Change Number of Slides
- To **reduce** slides (e.g., only 10): Delete the extra `<div class="carousel-slide">` blocks
- To **add** more slides: Copy any slide block and paste it — JavaScript auto-detects count
- Numbered buttons generate automatically — no JS change needed

### ▶ Change Autoplay Speed
Find in `<script>` section:
```javascript
const INTERVAL = 4000; // ms per slide ← Change this (4000 = 4 seconds)
```

---

## 🃏 CARD CUSTOMIZATION

### ▶ Replace Card Image
```html
<!-- OLD (placeholder) -->
<img src="https://picsum.photos/seed/card1/600/400" alt="Project Card 1"/>

<!-- NEW (your image) -->
<img src="assets/cards/card-01.jpg" alt="AI Dashboard Project"/>
```

### ▶ Update Card Content
For each card, find and change these 3 parts:

```html
<div class="card-tag">AI · Machine Learning</div>
<!-- Change the category tag above ↑ -->

<h3 class="card-title">Your Project Name</h3>
<!-- Change the project title above ↑ (max ~6 words looks best) -->

<p class="card-text">
  Write your 50-word project summary here. Describe what the project does,
  what technologies were used, who it's for, and the key benefit it provides
  to users. Keep it between 40 to 55 words for the best visual balance.
</p>
<!-- Change the description above ↑ -->
```

### ▶ Update Know More Gallery (per card)
Find the `data-gallery` attribute on the "Know More" button:

```html
<button class="btn-know"
  onclick="openGallery(1)"
  data-gallery='[
    {
      "src": "assets/cards/gallery/card1-img1.jpg",
      "title": "Dashboard Overview",
      "desc": "Description of what this screenshot shows. Keep it 1-2 sentences."
    },
    {
      "src": "assets/cards/gallery/card1-img2.jpg",
      "title": "Mobile View",
      "desc": "Second gallery image description here."
    }
  ]'>
  🔍 Know More
</button>
```

- **Add more gallery images**: Add more `{...}` objects inside the array
- **Minimum recommended**: 2 images per card
- **Maximum recommended**: 8 images per card

### ▶ Update YouTube Videos (per card)
Find the `data-yt` attribute on the "YouTube" button:

```html
<button class="btn-yt"
  onclick="openYoutube(1)"
  data-yt='[
    {
      "videoId": "YOUR_VIDEO_ID_HERE",
      "title": "Project Demo Walkthrough",
      "duration": "12:34"
    },
    {
      "videoId": "SECOND_VIDEO_ID",
      "title": "Technical Tutorial",
      "duration": "18:20"
    }
  ]'>
```

**How to get your YouTube Video ID:**
```
Full URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
Video ID:                                  ^^^^^^^^^^^^ (this part only)
```

**Example with your real videos:**
```json
{
  "videoId": "abc123xyz",
  "title": "Stock Market Analysis — Live Session",
  "duration": "45:00"
}
```

Thumbnails are auto-fetched from YouTube:
```
https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg
```

### ▶ Add a New Card (10th, 11th, etc.)
Copy any complete card block and:
1. Change the `id="card-N"` to the next number
2. Update `onclick="closeCard('card-N')"` in close button
3. Update `onclick="openGallery(N)"` in Know More button
4. Update `onclick="openYoutube(N)"` in YouTube button
5. Update all image srcs, title, tag, text

---

## 🌙 DARK / LIGHT MODE INTEGRATION

### ▶ Connect to Your Existing Website's Theme Toggle

If your existing site already has a dark/light toggle, connect them:

```javascript
// In your existing website's JS file
function yourExistingToggle() {
  // ...your existing code...
  
  // Add this line to also toggle the project showcase (if on same page):
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  
  // Update toggle button text:
  document.getElementById('theme-toggle').textContent =
    document.documentElement.dataset.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}
```

### ▶ Read Theme from Your Existing Website's Class/LocalStorage
At the bottom of the `<script>` block, add:

```javascript
// On load — read theme from your existing site
document.addEventListener('DOMContentLoaded', () => {
  // Option A: If your site stores theme in localStorage:
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = savedTheme;

  // Option B: If your site uses a CSS class on <body>:
  const isDark = document.body.classList.contains('dark-mode');
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
});
```

---

## 🔗 EMBEDDING INTO EXISTING WEBSITE (3 Methods)

### Method A — Separate Page (Recommended)
Keep `project-showcase.html` as its own page and link to it:

```html
<!-- In your main website navbar -->
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="project-showcase.html" class="active">Projects</a>  <!-- Add this -->
  <a href="contact.html">Contact</a>
</nav>
```

### Method B — Embed as Section in Existing Page
Copy everything between `<div class="page-wrapper">` and `</div><!-- /page-wrapper -->` into your existing page's HTML.

Then copy the `<style>` block into your existing CSS file.

Then copy the `<script>` block at the bottom of your existing JS file.

**Important:** Also copy both modal divs (`#gallery-modal` and `#yt-modal`).

### Method C — iframe Embed (Quickest)
If you just want to drop it into an existing page without touching your existing code:

```html
<!-- In your existing website's projects section -->
<section id="projects">
  <iframe
    src="project-showcase.html"
    style="width:100%; height:900px; border:none; border-radius:12px;"
    title="Project Showcase"
    loading="lazy">
  </iframe>
</section>
```

---

## 🎨 COLOR CUSTOMIZATION

All colors are controlled by CSS variables at the top of the `<style>` block.

### Dark Mode Colors:
```css
[data-theme="dark"] {
  --bg-primary:  #050c1a;    /* Page background — change to match your dark theme */
  --bg-card:     #0c1832;    /* Card background */
  --cyan:        #00e5ff;    /* Primary neon color (Cyan) */
  --magenta:     #ff2aff;    /* Secondary neon color (Magenta) */
  --text-primary: #e8eef8;   /* Main text color */
  --heading:     #e8eef8;    /* Heading color */
}
```

### Light Mode Colors:
```css
[data-theme="light"] {
  --bg-primary:  #f4f0e8;    /* Page background */
  --bg-card:     #faf8f2;    /* Card background (off-white) */
  --cyan:        #c8900a;    /* Primary neon (Dark Yellow) */
  --magenta:     #a07000;    /* Secondary accent */
  --text-primary: #1a1a1a;   /* Main text (black) */
  --heading:     #6b0000;    /* Heading color (Dark Maroon) */
}
```

### Quick Color Change Examples:

**Purple + Green neon theme (dark mode):**
```css
--cyan:    #a855f7;  /* Purple */
--magenta: #22c55e;  /* Green */
```

**Orange + Blue theme:**
```css
--cyan:    #f97316;  /* Orange */
--magenta: #3b82f6;  /* Blue */
```

---

## 🔠 FONT CUSTOMIZATION

Current fonts: **Orbitron** (headings) + **Rajdhani** (body)

Change to any Google Font pair:

```html
<!-- In <head>, replace the fonts link with your choice: -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
```

```css
:root {
  --font-head: 'Poppins', sans-serif;    /* Change heading font */
  --font-body: 'Inter', sans-serif;      /* Change body font */
}
```

---

## ⚙️ ADVANCED CUSTOMIZATIONS

### Change Floating Cards
By default, cards 1, 4, and 7 float. Change which cards float:

```html
<!-- Remove float-1/2/3 class from unwanted cards, add to different cards -->
<div class="project-card float-1" id="card-1">  ← Remove float-1 to stop floating
<div class="project-card" id="card-5">           ← Add float-2 to make this float
```

### Change Float Speed & Height
```css
@keyframes floatCard1 {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }  /* ← Change -12px for height */
}
/* The animation duration is in: animation: floatCard1 5s ease-in-out infinite; */
/* Change 5s to make it faster or slower */
```

### Change Neon Border Animation Speed
```css
.project-card::before {
  animation: neonBorder 4s ease infinite;  /* ← Change 4s */
}
```

### Change Carousel Border Animation
```css
.carousel-wrapper::before {
  animation: borderRotate 4s linear infinite;  /* ← Change 4s */
}
```

### Disable Floating Cards (mobile fix already built-in)
To completely disable floating on ALL screen sizes, remove the float classes from the card divs.

---

## 📱 RESPONSIVE BEHAVIOR

| Screen Width | Layout |
|---|---|
| < 480px  | 1 card per row, smaller dot buttons |
| 481–768px | 1 card per row, no floating animation |
| > 768px  | 3 cards per row, floating enabled |

The carousel aspect ratio automatically adjusts:
- Mobile: `4:3` ratio
- Desktop: `16:7` ratio

---

## ♿ ACCESSIBILITY

- All images have `alt` text (update with descriptive text)
- Keyboard navigation: `←` `→` arrows control carousel
- `Escape` key closes any open modal
- `aria-label` on carousel arrow buttons
- Touch/swipe supported on mobile

---

## 🐛 TROUBLESHOOTING

| Problem | Fix |
|---|---|
| Images not loading | Check file paths; use absolute paths if needed |
| YouTube thumbnails broken | Verify Video IDs are correct (11 chars, no spaces) |
| Gallery doesn't open | Ensure `data-gallery` JSON uses single quotes around the attribute and double quotes inside |
| Cards overlap on mobile | Make sure viewport meta tag is in `<head>` |
| Theme doesn't sync with existing site | Use Method A (separate page) to avoid CSS conflicts |
| Neon glow too intense | Reduce `var(--glow-cyan)` blur values in CSS variables |

---

## 📋 CHECKLIST BEFORE GOING LIVE

- [ ] Replaced all placeholder images with your real project images
- [ ] Updated all 9 card titles, tags, and descriptions
- [ ] Added real YouTube video IDs (11-character IDs)
- [ ] Updated gallery images for each card's "Know More"
- [ ] Changed site title in `<div class="site-title">` header
- [ ] Updated footer credit text
- [ ] Tested dark and light mode toggle
- [ ] Tested on mobile (portrait and landscape)
- [ ] Tested "Know More" modal image slideshow
- [ ] Tested YouTube thumbnail links open correct videos
- [ ] Linked the page in your existing website navigation

---

## 📌 TEMPLATE CREDIT

Template: **Project Showcase v1.0**
Stack: HTML5 · CSS3 · JavaScript ES6
Features: Animated Carousel (20 slides) · Neon Cards (9) · Dark/Light Mode · Gallery Modal · YouTube Modal · Mobile-First Responsive · Touch/Swipe · Keyboard Navigation

*Replace placeholder images from picsum.photos with your own before deployment.*
