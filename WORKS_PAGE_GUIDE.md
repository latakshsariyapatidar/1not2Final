# Works Page - Customization Guide

## Overview
The Works page is a stunning cinematic showcase for your production house's portfolio, featuring dual panels for Released and Upcoming movies with smooth animations and interactive elements.

## Features Implemented

### ✨ **Visual Design**
- **Cinematic Hero Section** with TextPressure interactive typography
- **Background Integration** with animated overlays
- **Dual-Panel System** with smooth tab transitions
- **Movie Card Design** with hover effects and play button overlays
- **Responsive Grid Layout** adapting to all screen sizes
- **Stats Section** showcasing achievements

### 🎬 **Movie Cards**
- **Poster Display** with zoom animation on hover
- **Play Button Overlay** appearing on hover
- **Movie Information**: Title, Year, Genre, Duration
- **Status Badges** for upcoming movies (In Production, Pre-Production)
- **YouTube Integration** - Opens video in new tab when clicked
- **Modal View** for upcoming movies without links

### 🎯 **Interactivity**
- **Tab Switching** between Released and Upcoming
- **Smooth Animations** using Framer Motion
- **Hover Effects** on all interactive elements
- **Click to Watch** - Opens YouTube links
- **Detail Modal** for movies without YouTube links

## How to Customize

### 1. **Adding Released Movies**

Edit the `releasedMovies` array in `WorksPage.jsx`:

```javascript
const releasedMovies = [
  {
    id: 1,
    title: "Your Movie Title",
    image: "/ReleasedWork/your-poster.webp",
    youtubeLink: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
    year: "2024",
    genre: "Drama/Action/Romance",
    duration: "15 min",
    description: "Brief description of your movie"
  },
  // Add more movies...
];
```

### 2. **Adding Upcoming Movies**

Edit the `upcomingMovies` array:

```javascript
const upcomingMovies = [
  {
    id: 4,
    title: "Your Upcoming Movie",
    image: "/ReleasedWork/poster.webp",
    youtubeLink: "#", // Use "#" if no trailer yet
    year: "2025",
    genre: "Mystery",
    duration: "TBA",
    description: "Exciting new project description",
    status: "In Production" // or "Pre-Production", "Post-Production"
  },
  // Add more upcoming movies...
];
```

### 3. **Adding Movie Posters**

Place your movie poster images in the `public/ReleasedWork/` directory:

```
public/
  ReleasedWork/
    your-movie-poster.webp
    another-movie.webp
```

**Image Requirements:**
- **Format**: WebP, JPG, or PNG
- **Aspect Ratio**: 2:3 (portrait, like movie posters)
- **Recommended Size**: 600x900px minimum
- **File Naming**: Use lowercase with hyphens (e.g., `burden-of-masks.webp`)

### 4. **Getting YouTube Video IDs**

From a YouTube URL like: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

The video ID is: `dQw4w9WgXcQ`

Use it in your data:
```javascript
youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

### 5. **Customizing Stats Section**

Edit the stats array to show your achievements:

```javascript
{[
  { label: "Projects Completed", value: releasedMovies.length },
  { label: "In Production", value: upcomingMovies.filter(m => m.status === 'In Production').length },
  { label: "Awards Won", value: "5+" },
  { label: "Happy Clients", value: "50+" }
].map((stat, index) => (
  // ... stat card rendering
))}
```

### 6. **Customizing Colors**

The page uses your brand colors. To change them, modify the gradient classes:

```javascript
// Purple to Pink gradient
from-purple-600 to-pink-600

// Your brand colors
from-[#5227FF] to-[#FF9FFC]
```

## Movie Data Structure

### Required Fields
- `id` (number): Unique identifier
- `title` (string): Movie title
- `image` (string): Path to poster image
- `youtubeLink` (string): YouTube URL or "#"
- `year` (string): Release year
- `genre` (string): Movie genre
- `duration` (string): Runtime or "TBA"
- `description` (string): Brief description

### Optional Fields (for upcoming)
- `status` (string): Production status badge

## Example: Adding a New Movie

1. **Add poster image** to `public/ReleasedWork/new-movie.webp`

2. **Add to array**:
```javascript
const releasedMovies = [
  // ... existing movies
  {
    id: 4,
    title: "My New Film",
    image: "/ReleasedWork/new-movie.webp",
    youtubeLink: "https://www.youtube.com/watch?v=ABC123",
    year: "2024",
    genre: "Thriller",
    duration: "22 min",
    description: "An gripping story of suspense and mystery."
  }
];
```

3. **Save and refresh** - Your new movie appears!

## Advanced Customization

### Changing Grid Layout

Current: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

```javascript
// In the movies grid section
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"

// Change to 4 columns on larger screens:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
```

### Adding More Status Types

```javascript
// In the upcoming movies section
{movie.status && (
  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
    movie.status === 'In Production' ? 'bg-purple-600/90' :
    movie.status === 'Pre-Production' ? 'bg-blue-600/90' :
    movie.status === 'Post-Production' ? 'bg-green-600/90' :
    'bg-gray-600/90'
  } backdrop-blur-sm`}>
    {movie.status}
  </div>
)}
```

### Changing Animation Speed

```javascript
// Hero animation
transition={{ duration: 1 }} // Change to 0.5 for faster

// Card animations
transition={{ duration: 0.5, delay: index * 0.1 }} // Adjust delay
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (lg/xl)

## Tips for Best Results

1. **Image Quality**: Use high-quality posters for best visual impact
2. **Consistent Sizes**: Keep all posters in same aspect ratio (2:3)
3. **Descriptions**: Keep descriptions concise (2-3 lines max)
4. **YouTube Links**: Test all links before publishing
5. **Status Updates**: Keep upcoming movies list current
6. **Stats Section**: Update numbers regularly

## Troubleshooting

### Images Not Loading
- Check file path starts with `/ReleasedWork/`
- Ensure image is in `public/ReleasedWork/` folder
- Verify file name matches exactly (case-sensitive)

### YouTube Not Opening
- Ensure link format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Check video is public/unlisted (not private)
- Test link in browser first

### Layout Issues
- Clear browser cache
- Check console for errors
- Verify all required fields are present in data

## Future Enhancements (Optional)

- [ ] Add video trailers directly embedded
- [ ] Implement filtering by genre
- [ ] Add search functionality
- [ ] Create detailed movie pages
- [ ] Add video galleries
- [ ] Implement awards/recognition section
- [ ] Add director/cast information
- [ ] Create behind-the-scenes section

---

**Your Works page is production-ready!** 🎬

Simply update the movie arrays with your content and poster images to showcase your incredible work!
