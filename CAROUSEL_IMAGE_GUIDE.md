# Carousel Image Configuration Guide

## Overview
The Carousel component has been updated to support images with a fixed 1:1 aspect ratio. This ensures a clean, uniform appearance when displaying team members or any image-based content.

## Key Features

### 🎨 Fixed 1:1 Aspect Ratio
- All images maintain a perfect square ratio regardless of original dimensions
- Excess portions of the image are hidden (overflow: hidden)
- Images are centered using `object-fit: cover` and `object-position: center`

### 🔄 Automatic Layout Detection
- If an item has an `image` property, it displays the image at the top
- If no `image` property exists, it falls back to the original icon-based layout
- Text content (title and description) always appears below the image/icon

### 📱 Responsive & Round Mode Compatible
- Works perfectly in both standard and round carousel modes
- In round mode, images are circular (borderRadius: 50%)
- In standard mode, images follow the card's border radius

## Usage

### Basic Example with Images

```jsx
import Carousel from './components/outSourcedComponents/Carousel';

const teamMembers = [
  {
    image: '/TeamMembers/member1.jpg',
    title: 'John Doe',
    description: 'Creative Director',
    id: 1
  },
  {
    image: '/TeamMembers/member2.jpg',
    title: 'Jane Smith',
    description: 'Lead Designer',
    id: 2
  }
];

<Carousel
  items={teamMembers}
  baseWidth={300}
  autoplay={true}
  autoplayDelay={3000}
  pauseOnHover={true}
  loop={true}
  round={false}
/>
```

### With Team Members Data Structure

```jsx
const teamData = [
  {
    image: 'public/TeamMembers/krishna.jpg',
    title: 'Krishna Mishra',
    description: 'Founder · CEO · Actor',
    id: 1
  },
  {
    image: 'public/TeamMembers/vedant.jpg',
    title: 'Vedant Ghodke',
    description: 'Creative Head',
    id: 2
  }
];

<Carousel items={teamData} baseWidth={350} round={true} />
```

### Mixed Content (Images + Icons)

```jsx
const mixedItems = [
  {
    image: '/path/to/image.jpg',
    title: 'Team Member',
    description: 'Role description',
    id: 1
  },
  {
    icon: <FiCode className="h-4 w-4 text-white" />,
    title: 'Feature',
    description: 'Feature description',
    id: 2
  }
];

<Carousel items={mixedItems} />
```

## Image Requirements

### Recommended Specifications
- **Format**: JPG, PNG, or WebP
- **Minimum Size**: 400x400px (for sharp display)
- **Optimal Size**: 800x800px or 1000x1000px
- **Aspect Ratio**: Any (will be cropped to 1:1)
- **File Size**: < 500KB (optimized for web)

### Image Preparation Tips
1. **Center Important Content**: The center of the image will always be visible
2. **Avoid Edge Details**: Important elements should be in the middle 80% of the image
3. **Use High Contrast**: Ensures text remains readable over the image
4. **Optimize for Web**: Compress images before uploading

### Image Cropping Behavior
- Images are cropped from the center using `object-fit: cover`
- If image is **wider** than tall: Top and bottom visible, sides cropped
- If image is **taller** than wide: Left and right visible, top/bottom cropped
- If image is **square**: Entire image visible

## Component Structure

### With Image
```
┌─────────────────────┐
│                     │
│  Image (1:1 ratio)  │  ← Fixed aspect ratio
│    object-cover     │  ← Fills space, crops excess
│                     │
├─────────────────────┤
│  Title              │  ← Text content below
│  Description        │
└─────────────────────┘
```

### Without Image (Fallback)
```
┌─────────────────────┐
│  ⦿ Icon             │  ← Original icon layout
│                     │
│  Title              │
│  Description        │
│                     │
└─────────────────────┘
```

## Styling Customization

### Change Image Border Radius

For rounded corners on images:
```jsx
// In Carousel.jsx
<div 
  className="relative shrink-0 overflow-hidden"
  style={{
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '16px' // Add custom border radius
  }}
>
```

### Adjust Object Position

To focus on different parts of the image:
```jsx
<img
  src={item.image}
  alt={item.title}
  className="absolute inset-0 w-full h-full object-cover"
  style={{ 
    objectPosition: 'top center' // or 'bottom', '20% 30%', etc.
  }}
/>
```

### Add Image Overlay

For better text readability:
```jsx
<div className="relative shrink-0 overflow-hidden">
  <img src={item.image} alt={item.title} />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
</div>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | DEFAULT_ITEMS | Array of items with `image`, `title`, `description`, `id` |
| `baseWidth` | Number | 300 | Width of carousel container in pixels |
| `autoplay` | Boolean | false | Enable automatic sliding |
| `autoplayDelay` | Number | 3000 | Delay between slides (milliseconds) |
| `pauseOnHover` | Boolean | false | Pause autoplay on hover |
| `loop` | Boolean | false | Enable infinite loop |
| `round` | Boolean | false | Circular carousel mode |

## Item Object Structure

```typescript
{
  image?: string;        // Optional: Path to image file
  icon?: ReactNode;      // Optional: Icon component (fallback if no image)
  title: string;         // Required: Item title
  description?: string;  // Optional: Item description
  id: number | string;   // Required: Unique identifier
}
```

## Common Issues & Solutions

### Images Appear Stretched
- **Cause**: Using `object-fit: contain` instead of `cover`
- **Solution**: Ensure `object-fit: cover` is set on the img element

### Important Parts Cropped
- **Cause**: Image aspect ratio very different from 1:1
- **Solution**: Pre-crop images to square aspect ratio or adjust `objectPosition`

### Images Too Small
- **Cause**: Low resolution source images
- **Solution**: Use images at least 400x400px, ideally 800x800px

### Inconsistent Sizes
- **Issue Fixed**: The fixed 1:1 aspect ratio ensures all images are the same size
- Images now automatically scale to container width with consistent height

## Performance Tips

1. **Lazy Loading**: Consider adding lazy loading for multiple images
2. **Image Optimization**: Use WebP format for smaller file sizes
3. **CDN**: Host images on a CDN for faster loading
4. **Responsive Images**: Use `srcset` for different screen sizes (optional enhancement)

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11: Not supported (uses CSS aspect-ratio)

## Example: Team Page Integration

```jsx
import Carousel from './components/outSourcedComponents/Carousel';

const TeamsPage = () => {
  const teamMembers = [
    {
      image: 'public/TeamMembers/krishna.jpg',
      title: 'Krishna Mishra',
      description: 'Founder · CEO',
      id: 1
    },
    // ... more members
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold mb-8">Our Team</h2>
      <Carousel
        items={teamMembers}
        baseWidth={400}
        autoplay={true}
        autoplayDelay={4000}
        pauseOnHover={true}
        loop={true}
      />
    </section>
  );
};
```

---

**Last Updated**: October 9, 2025  
**Version**: 2.0  
**Status**: Production Ready ✅
