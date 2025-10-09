# Movie Promotional Popup Guide

## Overview
The promotional popup appears on the **HomePage only** when users first visit the website. It's designed to advertise your latest upcoming movie production with a stunning, cinematic presentation.

## Features

### 🎬 Current Configuration
- **Movie**: Kadi Dark Kadi
- **Poster**: `/UpcomingWork/kadidarkadi.jpg`
- **Status**: In Production
- **Genre**: Thriller / Drama
- **Year**: 2025

### ⏰ Display Logic
The popup uses simple timing to promote your latest movie:
- **Every HomePage Visit**: Shows popup each time user navigates to home page
- **Delay**: 1 second after page loads
- **User Control**: Users can close it anytime with close button or CTA actions
- **Fresh on Return**: Will show again when user comes back to homepage from other pages

**Why This Approach?**
Since this is promoting a new production, we want maximum visibility. The popup shows on every homepage visit to ensure users don't miss the announcement. Users who are interested will click through, and those who aren't can easily close it.

### 🎨 Design Elements
1. **Split Layout**: Movie poster on left, details on right
2. **Coming Soon Badge**: Top-left corner of poster
3. **Gradient Background**: Purple/pink theme matching your brand
4. **Close Button**: Top-right with rotate animation on hover
5. **CTA Buttons**:
   - "View All Projects" → Redirects to Works page
   - "Maybe Later" → Closes popup
6. **Social Proof**: Shows "1000+ interested viewers" badge
7. **Decorative Blurs**: Purple/pink gradient blurs for depth

## Customization

### Change Movie Information

Edit `src/components/customComponents/Pages/HomePage.jsx`:

```jsx
{/* Movie Title */}
<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
  Your Movie Title Here
</h2>

{/* Tagline */}
<p className="text-lg md:text-xl text-gray-300 mb-6 italic">
  "Your movie tagline here..."
</p>

{/* Movie Info */}
<span>2026</span> {/* Change year */}
<span>Action / Adventure</span> {/* Change genre */}

{/* Description */}
<p className="text-gray-300 mb-8 leading-relaxed">
  Your movie description here. Make it compelling!
</p>
```

### Change Movie Poster

Replace the image source:
```jsx
<img
  src="/UpcomingWork/your-movie-poster.jpg"
  alt="Your Movie Name"
  className="w-full h-full object-cover"
/>
```

**Image Requirements**:
- **Aspect Ratio**: Portrait (2:3 recommended)
- **Resolution**: Minimum 1200x1800px
- **Format**: JPG or WebP
- **Location**: Place in `/public/UpcomingWork/`

### Change Status Badge

Current options:
```jsx
{/* Option 1: In Production */}
<span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
  In Production
</span>

{/* Option 2: Coming Soon */}
<span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
  Coming Soon
</span>

{/* Option 3: Pre-Production */}
<span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
  Pre-Production
</span>
```

### Adjust Timing

Change when popup appears:
```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setShowPromo(true);
  }, 3000); // Change delay (milliseconds) - 3000 = 3 seconds

  return () => clearTimeout(timer);
}, []);
```

### Add "Don't Show Again Today" Feature (Optional)

If you want to prevent showing multiple times per day:
```jsx
const handleClosePromo = () => {
  setShowPromo(false);
  // Add this to prevent showing again today
  localStorage.setItem('promoDate', new Date().toDateString());
};

// Then update useEffect:
useEffect(() => {
  const promoDate = localStorage.getItem('promoDate');
  const today = new Date().toDateString();
  
  // Only show if not shown today
  if (promoDate !== today) {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 1000);
    return () => clearTimeout(timer);
  }
}, []);
```

### Change Social Proof Numbers

```jsx
<span className="text-gray-400">+5000 interested viewers</span>
```

## Display Control

### Current Behavior
The popup shows **every time** a user visits the homepage. This ensures maximum visibility for your new movie announcement.

### Disable Popup Temporarily
Comment out the popup section in `HomePage.jsx`:
```jsx
{/* Promotional Movie Popup */}
{/* <AnimatePresence>
  {showPromo && (
    ...
  )}
</AnimatePresence> */}
```

### Adjust Display Frequency
If you want less frequent displays, see the "Add Don't Show Again Today Feature" in the Customization section above.

### Developer Testing
To test popup repeatedly:
1. Simply navigate away from home page and back
2. Refresh the page (popup shows after 1 second)
3. No need to clear storage - it shows every time!

**Note**: The popup will appear every time you visit the homepage, making testing very easy.

## Responsive Behavior

### Mobile (< 640px)
- **Scrollable Container**: Full-height with overflow-y-auto to prevent content cut-off
- **Reduced Padding**: Outer padding 0.5rem (p-2) instead of 1rem
- **Single Column**: Poster stacks on top of details
- **Shorter Poster**: 300px height to fit smaller screens
- **Gradient Direction**: Bottom-to-top gradient (vs. left-to-right on desktop)
- **Smaller Text**: 
  - Title: 3xl (vs. 6xl on desktop)
  - Tagline: base (vs. xl on desktop)
  - Body: sm (vs. base on desktop)
  - Info badges: xs (vs. sm on desktop)
- **Compact Spacing**: 
  - Button padding: px-6 py-3 (vs. px-8 py-4)
  - Section margins: mb-6 (vs. mb-8)
  - Content padding: p-5 (vs. p-12)
- **Smaller Icons**: 3x3 (w-3 h-3) vs. 4x4 on desktop
- **Avatar Size**: 6x6 (w-6 h-6) vs. 8x8 on desktop
- **Close Button**: 9x9 (w-9 h-9) vs. 10x10 on desktop
- **Border Radius**: rounded-2xl (vs. rounded-3xl on desktop)
- **Stacked CTAs**: Buttons stack vertically with gap-3
- **Hidden Elements**: Some separators hidden on very small screens

### Small Tablet (640px - 768px)
- **Two Columns Start**: Still stacked but with better spacing
- **Poster**: 400px height
- **Increased Padding**: p-8 for content area
- **Medium Text Sizes**: Intermediate sizes between mobile and desktop
- **Horizontal CTAs**: Side-by-side buttons with gap-4

### Tablet (768px - 1024px)
- **Two Columns**: Poster left, details right
- **Poster**: 600px full height
- **Balanced Layout**: Equal space distribution
- **Gradient Direction**: Left-to-right fade
- **Desktop Text Sizes**: Full-size typography

### Desktop (> 1024px)
- **Maximum Width**: 1280px (5xl)
- **Full Height**: 600px poster height
- **Horizontal Layout**: Side-by-side design
- **Large Text**: Maximum responsive sizes
- **Spacious Padding**: p-12 for comfortable reading

## Animation Details

### Entry Animation
- **Backdrop**: Fades in (0.3s)
- **Modal**: Scales up from 0.8 to 1.0 (0.3s)
- **Delay**: Modal starts 0.1s after backdrop

### Exit Animation
- **Both**: Fade out and scale down simultaneously
- **Duration**: 0.3s

### Hover Effects
- **Close Button**: Rotates 90° on hover
- **CTA Buttons**: Shadow and brightness increase

## Best Practices

### Content Guidelines
1. **Title**: Keep it short and impactful (2-4 words ideal)
2. **Tagline**: One sentence, mysterious or intriguing
3. **Description**: 2-3 sentences, focus on emotion and genre
4. **Call-to-Action**: Clear and action-oriented

### Image Guidelines
1. **High Quality**: Use professional, high-resolution images
2. **Focus**: Main character or key visual should be centered
3. **Contrast**: Ensure text is readable over the image
4. **Mood**: Image should reflect the movie's tone

### Timing Strategy
1. **Not Too Soon**: 1-2 seconds gives users time to orient
2. **Not Too Late**: 3+ seconds and they might miss it
3. **Once Per Day**: Don't annoy return visitors

## Troubleshooting

### Popup Not Showing
1. ~~Check if already shown today (clear Local Storage)~~ **Not applicable - shows every time**
2. Verify `showPromo` state is being set to `true` after 1 second
3. Check console for JavaScript errors
4. Ensure `kadidarkadi.jpg` exists in `/public/UpcomingWork/`
5. Verify the 1-second timeout is completing (check if anything is blocking)

### Popup Not Scrollable on Mobile
1. Verify outer div has `overflow-y-auto` class
2. Check that modal has `my-auto` for vertical centering
3. Test on actual mobile device (not just browser resize)
4. Ensure no parent elements have `overflow: hidden`

### Content Cut Off on Small Screens
1. Check all padding values have mobile variants (sm:, md:)
2. Verify poster height is responsive (h-[300px] sm:h-[400px] md:h-[600px])
3. Test text sizes scale properly with screen size
4. Ensure buttons don't overflow container

### Image Not Loading
1. Verify file path: `/public/UpcomingWork/kadidarkadi.jpg`
2. Check image file name spelling and case
3. Ensure image format is supported (JPG, PNG, WebP)
4. Try absolute URL for testing

### Layout Issues on Specific Devices
1. Test on real devices, not just emulators
2. Check responsive breakpoints match your design
3. Verify Tailwind classes are correct
4. Adjust padding/spacing as needed for specific breakpoints
5. Use browser DevTools responsive mode with device profiles

### Animation Glitches
1. Ensure Framer Motion is installed
2. Check that AnimatePresence wraps the conditional render
3. Verify exit animations are defined
4. Reduce animation complexity if needed

## Future Enhancements

### Potential Features
- [ ] Multiple movie carousel
- [ ] Video trailer autoplay
- [ ] Email newsletter signup
- [ ] Countdown timer to release date
- [ ] Share to social media buttons
- [ ] "Notify Me" button with email capture
- [ ] IMDb/Rotten Tomatoes ratings
- [ ] Cast member highlights
- [ ] Behind-the-scenes gallery

### A/B Testing Ideas
- Different popup timing (1s vs 2s vs 3s)
- Various CTA button text
- With/without social proof
- Different image styles (dark vs bright)
- Modal size variations

## Analytics Recommendations

Track these metrics to optimize:
1. **View Rate**: How many users see the popup
2. **Dismiss Rate**: How many close without action
3. **Click-Through Rate**: Clicks on "View All Projects"
4. **Conversion**: Actual visits to Works page
5. **Return Rate**: Do users come back after seeing it

## Code Location
- **File**: `src/components/customComponents/Pages/HomePage.jsx`
- **Lines**: ~135-276 (Promotional Popup section)
- **Dependencies**: 
  - `framer-motion` (AnimatePresence, motion)
  - `react-router-dom` (Link)
  - `useState`, `useEffect` (React hooks)

---

**Last Updated**: October 9, 2025  
**Version**: 1.0  
**Status**: Production Ready ✅
