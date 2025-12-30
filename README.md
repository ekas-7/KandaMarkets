# 🎯 Kanda Markets

A modern, full-featured marketing landing page and lead management platform built with Next.js 16, featuring advanced analytics tracking, 3D animations, and a powerful admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-green?style=flat-square&logo=mongodb)

## 🌟 Overview

Kanda Markets is a sophisticated marketing platform designed to showcase services, collect leads, and provide comprehensive analytics. Built with modern web technologies, it offers a stunning visual experience with 3D elements, smooth animations, and a powerful backend for lead management.

## ✨ Key Features

- 🎨 **Beautiful Landing Page** - Modern design with GSAP animations and 3D elements
- 📊 **Advanced Analytics** - Track user behavior, sessions, and conversions
- 📝 **Lead Management** - Comprehensive form with admin dashboard
- 🔐 **Secure Authentication** - NextAuth.js integration for admin access
- 🎬 **3D Interactive Elements** - Three.js powered iPhone mockup and Holoboard
- 📱 **Fully Responsive** - Optimized for all devices
- 🚀 **Performance Optimized** - Built with Next.js 16 App Router

## 📁 Project Structure

```
KandaMarkets/
└── frontend/           # Next.js application
    ├── app/            # App Router pages and API routes
    ├── components/     # React components
    ├── hooks/          # Custom React hooks
    ├── lib/            # Utility libraries and models
    ├── public/         # Static assets (3D models, videos)
    └── types/          # TypeScript type definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ekas-7/KandaMarkets.git
cd KandaMarkets/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_generated_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations
- **Three.js** - 3D graphics

### Backend
- **MongoDB** - Database
- **NextAuth.js** - Authentication
- **Next.js API Routes** - Backend endpoints

### UI/UX
- **Lucide React** - Icons
- **React Three Fiber** - 3D rendering
- **Custom animations** - GSAP timelines

## 🎯 Main Features

### Landing Page
- Hero section with 3D iPhone mockup
- Curated content showcase
- Feature highlights
- Client testimonials
- Problems we solve section
- Video trailers
- Footer with links

### Interest Form
- Comprehensive business information collection
- Service selection
- Budget and goals input
- Real-time validation
- Success confirmation page

### Admin Dashboard
- Secure login at `/theauthadminkanda`
- Lead management interface
- Status tracking (new, contacted, qualified, converted, lost)
- Search and filter functionality
- Enhanced analytics and statistics
- Lead export capabilities

### Analytics System
- Session tracking
- Page view tracking
- Button click tracking
- Device detection
- Geolocation tracking
- Referrer tracking
- Returning visitor detection

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy automatically

### Environment Variables for Production
- `MONGODB_URI` - Production MongoDB connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain

## 📚 Documentation

For detailed documentation, see the [Frontend README](./frontend/README.md).

## 🔐 Security

- Environment variables are not committed to version control
- Admin routes are protected with NextAuth.js
- Passwords are hashed with bcryptjs
- Input validation on all forms
- Secure MongoDB connections

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify your `MONGODB_URI` is correct
- Check network connectivity
- Ensure IP whitelist in MongoDB Atlas

**NextAuth Error**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

**3D Models Not Loading**
- Check files exist in `public/models/`
- Verify file permissions
- Check browser console for errors

## 📝 License

This project is private and proprietary.

## 👨‍💻 Developer

**Ekas** - [@ekas-7](https://github.com/ekas-7)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- GSAP for animation capabilities
- Three.js community
- MongoDB team
- All open-source contributors

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ by Kanda Markets** | © 2025 All Rights Reserved
