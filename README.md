<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase 12" />
</p>

# 🎬 OneNotTwo Productions

> *Making every story — The Story*

Official website and ticketing platform for **OneNotTwo Productions**, an independent film production house based out of **IIT Dharwad, Karnataka, India**. Founded by **Krishna Mishra**, the studio creates cinematic, character-driven films with uncompromising artistry.

---

## ✨ Features

### 🎥 Public-Facing Website
- **Home** — Cinematic hero landing with full-bleed imagery and call-to-action
- **Works** — Dynamic filmography gallery powered by Firebase, with poster cards, trailer & movie links
- **About** — Studio manifesto and creative philosophy
- **Team** — Full crew directory with Cloudinary-hosted portraits, hover bios, and grayscale-to-color transitions
- **Tickets** — Live screening listings with real-time booking availability
- **Checkout** — Multi-step ticket purchase flow with UPI QR code payment and UTR verification
- **Contact** — Inquiry form with Gmail compose integration + Firestore backup

### 🔐 Admin Panel (`/admin`)
- **Google OAuth** login restricted to whitelisted admin emails
- **Bookings Manager** — View, verify, and manage ticket bookings (approve/reject payments)
- **Movies Manager** — Full CRUD for the movie catalog (Cloudinary poster uploads)
- **Contacts / Inquiries** — View and manage submitted contact form entries
- **Ticket Scanner** — QR-based gate scanner for ticket validation at screenings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 19](https://react.dev) with JSX |
| **Build Tool** | [Vite 7](https://vitejs.dev) |
| **Routing** | [React Router DOM v7](https://reactrouter.com) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + custom design tokens |
| **UI Components** | [Radix UI](https://www.radix-ui.com) primitives + [shadcn/ui](https://ui.shadcn.com) |
| **Backend / Database** | [Firebase](https://firebase.google.com) (Firestore, Auth, Storage) |
| **Media Hosting** | [Cloudinary](https://cloudinary.com) (team portraits, movie posters) |
| **Animations** | [GSAP](https://gsap.com) |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation |
| **Charts** | [Recharts](https://recharts.org) |
| **QR Scanning** | [html5-qrcode](https://github.com/mebjas/html5-qrcode) |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev) toast system |
| **Linting** | ESLint 9 + Prettier |

---

## 📁 Project Structure

```
OneNot2Production.NEW/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite config (React + Tailwind + @ alias)
├── package.json
├── .env                        # Environment variables (not committed)
│
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Router + layout (Navbar / Routes / Footer)
    ├── styles.css              # Global styles & Tailwind directives
    │
    ├── assets/                 # Static images (hero, fallback posters)
    │   ├── hero.jpg
    │   └── poster[1-4].jpg
    │
    ├── components/
    │   ├── Navbar.jsx          # Fixed top nav with mobile hamburger
    │   ├── Footer.jsx          # Site-wide footer
    │   ├── Loader.jsx          # Loading/splash component
    │   ├── ui/                 # Radix-based shadcn/ui primitives
    │   └── admin/              # Admin-only components
    │       ├── BookingsManager.jsx
    │       ├── MoviesManager.jsx
    │       ├── ContactsManager.jsx
    │       └── TicketScanner.jsx
    │
    ├── pages/
    │   ├── Home.jsx            # Hero landing page
    │   ├── Works.jsx           # Filmography grid (Firestore-driven)
    │   ├── About.jsx           # Studio manifesto
    │   ├── Team.jsx            # Crew directory
    │   ├── Tickets.jsx         # Screening listings
    │   ├── Checkout.jsx        # Multi-step ticket purchase
    │   ├── Contact.jsx         # Contact form
    │   ├── Admin.jsx           # Admin dashboard (auth-gated)
    │   └── helpers.jsx         # Shared components (PortraitCard, Field, etc.) & team data
    │
    ├── hooks/
    │   ├── use-movies.js       # Firestore movies fetcher + normalizer
    │   └── use-mobile.jsx      # Responsive breakpoint hook
    │
    ├── lib/
    │   ├── firebase.js         # Firebase app init (lazy singleton)
    │   └── utils.js            # Utility helpers (cn, etc.)
    │
    └── data/
        └── movies.js           # Fallback/seed movie data
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Firebase** project with Firestore, Authentication (Google provider), and Storage enabled
- *(Optional)* A **Cloudinary** account for media uploads

### 1. Clone the Repository

```bash
git clone https://github.com/latakshsariyapatidar/onenottwoproduction.new.git
cd onenottwoproduction.new
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin Access (comma-separated emails)
VITE_EMAIL_ADMIN=admin1@gmail.com,admin2@gmail.com
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
npm run preview    # Preview the production build locally
```

---

## 🔑 Firebase Setup

### Firestore Collections

| Collection | Purpose |
|-----------|---------|
| `movies` | Movie catalog (title, genre, year, posterUrl, ticketPrice, booking, trailerUrl, movieUrl, etc.) |
| `bookings` | Ticket bookings (customer info, payment UTR, verification status) |
| `contacts` | Contact form submissions |

### Authentication

- Enable **Google** sign-in provider in Firebase Console
- Admin access is controlled via the `VITE_EMAIL_ADMIN` environment variable

### Security Rules

Ensure your Firestore rules allow:
- **Public read** on `movies` collection
- **Public write** on `bookings` and `contacts` (for customer submissions)
- **Authenticated admin write** on `movies` (for catalog management)

---

## 📜 Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format code with Prettier |

---

## 🎨 Design System

The site uses a **cinematic dark theme** with the following design tokens:

- **Gold accent** (`--gold`) — Primary brand color used across CTAs, labels, and highlights
- **Display font** (`font-display`) — Large editorial headings
- **Mono labels** (`label-mono`) — Uppercase monospaced micro-labels
- **Ghost buttons** (`ghost-btn`, `ghost-btn-gold`) — Minimal outlined CTAs
- **Surface layers** (`bg-surface`, `bg-surface-2`) — Elevated card backgrounds
- **Grain texture** — Film-grain overlay for cinematic feel

---

## 🤝 Team

| Name | Role |
|------|------|
| **Krishna Mishra** | Founder · CEO · Actor |
| **Sahil Suman** | Cinematographer · Director |
| **Shashank** | Director |
| **Vedant Ghodke** | Creative Head |
| **SILAS** | Cinematographer · Camera Handler |
| **Penumaka Ricky Charan** | Assistant Cinematographer |
| **Rushikesh Deshmukh** | Music Director |
| **Ayush Raj** | Editor |
| **Lataksh Sariya** | Web Developer |
| **Ashmit Singh** | Writer |
| **Sujal** | Assistant Director |
| **Apratim Das** | Video Editor |
| **Samit** | Crew |

---

## 📬 Contact

- **Email**: [1not2productionbusiness@gmail.com](mailto:1not2productionbusiness@gmail.com)
- **Instagram**: [@1not2production](https://www.instagram.com/1not2production/)
- **Phone**: +91 9716224033 (Krishna Mishra)
- **Location**: Indian Institute of Technology Dharwad, Chikkamalligawad, Dharwad — 580007, Karnataka, India

---

## 📄 License

© 2026 OneNotTwo Productions. All rights reserved.
