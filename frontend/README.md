# 🎯 Kanda Markets

A modern, full-featured marketing landing page and lead management platform built with Next.js 16, featuring advanced analytics tracking, 3D animations, and a powerful admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 Frontend & UI/UX
- **Modern Landing Page** with smooth GSAP animations
- **3D Interactive Elements** powered by Three.js and React Three Fiber
  - 3D iPhone mockup with video playback
  - Holoboard 3D model with custom textures
- **Responsive Design** with Tailwind CSS v4
- **Component Library** featuring:
  - Fanned card deck with rotation transforms
  - Floating animated badges
  - Aurora background effects
  - Orbiting circles animations
  - Client testimonials carousel
  - Interactive content sections

### 📊 Analytics & Tracking
- **Custom Analytics System** tracking:
  - Page views with session management
  - User interactions and button clicks
  - Device type detection (mobile/tablet/desktop)
  - Geolocation data
  - Referrer tracking
  - Returning vs new visitor identification
  - Form submission tracking
- **Real-time Analytics Dashboard** with enhanced stats panel
- **Auto-click tracking** for user behavior analysis

### 📝 Lead Management
- **Interest Form** with comprehensive data collection:
  - Business information
  - Service preferences
  - Budget and goals
  - Contact details
- **Admin Dashboard** featuring:
  - Lead viewing and filtering
  - Status management (new, contacted, qualified, converted, lost)
  - Search functionality
  - Lead analytics and insights
  - Secure authentication with NextAuth.js

### 🔒 Security & Authentication
- **NextAuth.js** integration for secure admin access
- **bcryptjs** password hashing
- **Protected API routes** for admin operations
- **Environment-based configuration**

### 🗄️ Database
- **MongoDB** integration for data persistence
- **Structured data models** for analytics and leads
- **Efficient querying** and data retrieval

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ekas-7/KandaMarkets.git
cd KandaMarkets/frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy the example environment file and update with your credentials:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_secret_key
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Tech Stack

### Core
- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - Utility-first CSS
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing
- **[class-variance-authority](https://cva.style/docs)** - Component variants
- **[clsx](https://github.com/lukeed/clsx)** - Conditional classNames
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging

### Animations & 3D
- **[GSAP 3.14.2](https://gsap.com/)** - Professional-grade animations
- **[Three.js 0.182.0](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Three.js helpers
- **[OGL](https://oframe.github.io/ogl/)** - Minimal WebGL library

### Backend & Database
- **[MongoDB 7.0.0](https://www.mongodb.com/)** - NoSQL database
- **[NextAuth.js 4.24.13](https://next-auth.js.org/)** - Authentication
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing

### UI Components
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin endpoints
│   │   │   ├── analytics/        # Analytics data
│   │   │   ├── analytics-enhanced/ # Enhanced analytics
│   │   │   └── leads/            # Lead management
│   │   ├── analytics/            # Public analytics
│   │   ├── auth/                 # NextAuth endpoints
│   │   └── submit-lead/          # Lead submission
│   ├── interestform/             # Interest form page
│   ├── theauthadminkanda/        # Admin area
│   │   ├── dashboard/            # Lead dashboard
│   │   └── stats/                # Statistics page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # UI primitives
│   │   ├── aurora.tsx            # Aurora background
│   │   ├── Button.tsx            # Button component
│   │   ├── folder-tree.tsx       # Folder tree UI
│   │   ├── iphone.tsx            # iPhone mockup
│   │   ├── iphone3d.tsx          # 3D iPhone
│   │   └── orbiting-circles.tsx  # Orbiting animation
│   ├── AutoClickTracker.tsx      # Click tracking
│   ├── ClientTestimonials.tsx    # Testimonials section
│   ├── CuratedContent.tsx        # Content showcase
│   ├── EnhancedStatsPanel.tsx    # Analytics stats
│   ├── FannedCards.tsx           # Card deck animation
│   ├── FloatingBadge.tsx         # Floating badges
│   ├── Footer.tsx                # Footer component
│   ├── HeroSection.tsx           # Hero section
│   ├── HighLevelRepurposing.tsx  # Feature section
│   ├── Holoboard3D.tsx           # 3D holoboard
│   ├── Navigation.tsx            # Navigation bar
│   ├── ProblemsWesolve.tsx       # Problems section
│   ├── StatsPanel.tsx            # Stats display
│   ├── TrackableButton.tsx       # Tracked button
│   └── TrailersLongForm.tsx      # Trailers section
├── hooks/                        # Custom React hooks
│   └── useGSAP.ts                # GSAP timeline hook
├── lib/                          # Utility libraries
│   ├── models/                   # Data models
│   │   └── analytics.ts          # Analytics model
│   ├── analytics.ts              # Analytics utils
│   ├── auth.ts                   # Auth configuration
│   ├── geolocation.ts            # Geolocation utils
│   ├── mongodb.ts                # MongoDB connection
│   ├── referrerUtils.ts          # Referrer tracking
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
│   ├── models/                   # 3D models
│   │   └── holoboard/            # Holoboard 3D files
│   └── videos/                   # Video files
├── types/                        # TypeScript types
│   └── next-auth.d.ts            # NextAuth types
├── .env.local.example            # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies

```

## 🎯 Key Features Explained

### Analytics System
The custom analytics system tracks:
- **Session Management**: Unique session IDs with returning visitor detection
- **Geolocation**: IP-based location tracking
- **Device Detection**: Mobile, tablet, desktop identification
- **Referrer Tracking**: UTM parameters and referrer URLs
- **Event Tracking**: Page views, button clicks, form submissions

### Admin Dashboard
Access at `/theauthadminkanda` with credentials:
- View and manage all leads
- Filter by status (new, contacted, qualified, converted, lost)
- Search leads by name, email, or business
- View enhanced analytics and statistics
- Export lead data

### 3D Components
- **iPhone 3D Mockup**: Interactive device with video playback
- **Holoboard**: Animated 3D model with custom textures and emissive materials
- Optimized performance with React Three Fiber

## 🔧 Available Scripts

```bash
# Development
npm run dev         # Start dev server at localhost:3000

# Production
npm run build       # Build for production
npm run start       # Start production server
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | ✅ |
| `NEXTAUTH_URL` | Base URL of the application | ✅ |

## 📱 API Routes

### Public Endpoints
- `POST /api/submit-lead` - Submit interest form
- `POST /api/analytics/track` - Track analytics events

### Protected Admin Endpoints
- `GET /api/admin/leads` - Get all leads
- `GET /api/admin/leads/[id]` - Get single lead
- `PATCH /api/admin/leads/[id]` - Update lead status
- `DELETE /api/admin/leads/[id]` - Delete lead
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/analytics-enhanced` - Get enhanced analytics

## 🎨 Component Usage Examples

### TrackableButton
```tsx
import TrackableButton from "@/components/TrackableButton";

<TrackableButton 
  trackingId="hero-cta"
  variant="primary"
>
  Get Started
</TrackableButton>
```

### 3D iPhone with Video
```tsx
import { Iphone3D } from "@/components/ui/iphone3d";

<Iphone3D videoSrc="/videos/demo.mp4" />
```

### GSAP Animations
```tsx
import { useGsapTimeline } from "@/hooks/useGSAP";

const sectionRef = useRef<HTMLElement>(null);

useGsapTimeline(sectionRef, ({ gsap }) => {
  gsap.from(".element", { 
    y: 60, 
    opacity: 0, 
    duration: 0.9 
  });
}, []);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔐 Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Generate a strong** `NEXTAUTH_SECRET` for production
3. **Use MongoDB connection string** with authentication
4. **Enable CORS** appropriately for API routes
5. **Validate and sanitize** all user inputs

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Verify MongoDB URI format
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### NextAuth Errors
```bash
# Ensure NEXTAUTH_URL matches your domain
# For local dev: http://localhost:3000
# For production: https://yourdomain.com
```

### 3D Model Loading Issues
- Ensure GLTF files are in `public/models/`
- Check texture paths in model files
- Verify file permissions

## 📝 License

This project is private and proprietary.

## 👨‍💻 Developer

**Ekas** - [GitHub](https://github.com/ekas-7)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- GSAP for powerful animations
- Three.js community for 3D capabilities
- MongoDB for reliable database solutions

---

**Built with ❤️ by Kanda Markets**

