# Cinematic Page Transition System

This project implements a sophisticated page transition system inspired by movie production houses, creating smooth, cinematic transitions between pages while maintaining persistent background and header elements.

## Architecture Overview

### Core Components

1. **Layout Component** (`CommonComponents/Layout.jsx`)
   - Provides persistent Background and Header across all pages
   - Implements cinematic effects (film grain, widescreen bars)
   - Contains the main content wrapper for transitions

2. **PageTransition Component** (`CommonComponents/PageTransition.jsx`)
   - Handles the actual page transition animations
   - Creates cinematic title overlays during transitions
   - Uses GSAP for smooth, professional animations

3. **Updated Page Components**
   - Optimized for the new layout structure
   - Enhanced with production house theming
   - Responsive design with proper spacing

## Cinematic Effects

### Film Industry Inspired Transitions

1. **Title Card Animations**
   - Large, bold titles with cinematic typography
   - 3D rotation and scaling effects
   - Gradient text effects and glowing shadows

2. **Camera-like Movements**
   - Subtle scale and blur effects
   - Smooth fade transitions
   - Depth-of-field simulation

3. **Visual Enhancements**
   - Film grain texture overlay
   - Cinematic widescreen bars (letterboxing)
   - Professional color grading effects

### Transition Sequence

```
1. Content Fade Out (0.3s)
   ↓
2. Cinematic Overlay Appears (0.4s)
   ↓
3. Title Animation with 3D Effects (0.6s)
   ↓
4. Dramatic Hold (0.8s)
   ↓
5. Title Exit Animation (0.4s)
   ↓
6. Overlay Fade Out (0.5s)
   ↓
7. New Content Fade In (0.6s)
```

## Technical Implementation

### Dependencies
- `@barba/core` - For advanced page transitions
- `@barba/css` - CSS transition helpers
- `gsap` - High-performance animations
- `react-router-dom` - Client-side routing

### File Structure
```
src/
├── components/
│   ├── customComponents/
│   │   ├── CommonComponents/
│   │   │   ├── Layout.jsx          # Persistent layout
│   │   │   ├── PageTransition.jsx  # Transition logic
│   │   │   └── Header.jsx          # Persistent header
│   │   └── Pages/                  # Individual pages
├── hooks/
│   └── usePageTransition.js        # Transition hook
├── styles/
│   └── cinematic.css              # Cinematic effects
└── App.jsx                        # Main app structure
```

## Usage

### Basic Implementation
```javascript
import { Layout, PageTransition } from './components';

function App() {
  return (
    <Layout>
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Other routes */}
        </Routes>
      </PageTransition>
    </Layout>
  );
}
```

### Custom Page Component
```javascript
const MyPage = () => {
  return (
    <div className="w-full h-full p-8 pt-20 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
          Page
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Title
          </span>
        </h1>
        {/* Page content */}
      </div>
    </div>
  );
};
```

## Customization

### Modifying Transition Duration
Edit the timeline in `PageTransition.jsx`:
```javascript
// Adjust these values for different timing
.to(container, { opacity: 0, duration: 0.3 }) // Fade out speed
.to(title, { duration: 0.6 }) // Title animation speed
```

### Adding New Cinematic Effects
Add effects to `cinematic.css`:
```css
/* Custom film effect */
.custom-effect {
  /* Your cinematic styling */
}
```

### Changing Page Titles
Update the `getPageTitle` function in `PageTransition.jsx`:
```javascript
const getPageTitle = useCallback((pathname) => {
  const titles = {
    '/': 'HOME',
    '/about': 'ABOUT',
    '/custom': 'CUSTOM PAGE'
  };
  return titles[pathname] || 'PAGE';
}, []);
```

## Performance Considerations

1. **GSAP Optimization**: Uses hardware acceleration for smooth animations
2. **Persistent Elements**: Background and Header remain mounted, avoiding re-renders
3. **Efficient Transitions**: Transitions only affect content area, not the entire page
4. **Memory Management**: Proper cleanup of GSAP timelines

## Browser Support

- Modern browsers with ES6+ support
- Hardware acceleration recommended for smooth animations
- Graceful degradation for older browsers (transitions still work, effects may be simplified)

## Movie Production House Inspiration

The transition system draws inspiration from:
- **Studio Logos**: Bold, dramatic title presentations
- **Film Credits**: Elegant typography and spacing
- **Scene Transitions**: Professional fade and wipe effects
- **Cinematic Techniques**: Depth of field, grain, and letterboxing