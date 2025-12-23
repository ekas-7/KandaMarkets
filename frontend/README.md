# Kanda Markets - Hero Section# Minimal Next.js AppThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



An elegant, artistic hero section built with Next.js, Tailwind CSS v4, and shadcn-inspired components.



## FeaturesA stripped-down Next.js application with a single button component.## Getting Started



### UI/UX Design Elements



- **Grain Texture Background**: Off-white (#F5F5F3) with subtle SVG noise for a paper/canvas feel## What's insideFirst, run the development server:

- **Typography**: 

  - Serif font (Playfair Display) for headlines - artistic and elegant

  - Sans-serif font (Inter) for body text and UI - clean and readable

- **Navigation Bar**: Brand logo, text links with icons, user profile buttons- **Button component** (`components/Button.tsx`) - A shadcn-style button that logs "hello" to the console when clicked```bash

- **Floating Badges**: Absolutely positioned animated pills (@coplin, @andrea) for depth

- **Fanned Card Deck**: 7 overlapping image cards with rotation transforms creating a deck effect- **Home page** (`app/page.tsx`) - Renders the buttonnpm run dev

- **CTA Buttons**: Primary (black pill) and secondary (transparent) buttons

- **Minimal styling** (`app/globals.css`) - Basic CSS for centering and button appearance# or

### Component Structure

yarn dev

```

components/## Run the app# or

├── ui/

│   └── Button.tsx          # shadcn-style button with variantspnpm dev

├── Navigation.tsx          # Top navigation bar

├── FloatingBadge.tsx       # Animated floating badge pills```bash# or

├── FannedCards.tsx         # Deck of overlapping rotated cards

└── HeroSection.tsx         # Main hero compositionnpm installbun dev

```

npm run dev```

## Tech Stack

```

- **Next.js 16** with App Router

- **Tailwind CSS v4** with PostCSSOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **TypeScript** for type safety

- **class-variance-authority** for component variantsOpen [http://localhost:3000](http://localhost:3000) and click the button. Check your browser console to see "hello" logged.

- **Google Fonts**: Playfair Display (serif) + Inter (sans-serif)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Getting Started

## Available scripts

```bash

# Install dependenciesThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

npm install

- `npm run dev` - Start development server

# Run development server

npm run dev- `npm run build` - Build for production## Learn More



# Build for production- `npm start` - Start production server

npm run build

To learn more about Next.js, take a look at the following resources:

# Start production server

npm start- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

```- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



Open [http://localhost:3000](http://localhost:3000) to see the hero section.You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



## Component Usage## Deploy on Vercel



### ButtonThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```tsx

import { Button } from "@/components/ui/Button";Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<Button variant="primary" size="lg">Join for $9.99/m</Button>
<Button variant="secondary" size="lg">Read more</Button>
```

### Fanned Cards
```tsx
import FannedCards from "@/components/FannedCards";

<FannedCards cards={customCards} />  // Or use default Unsplash images
```

### Floating Badge
```tsx
import FloatingBadge from "@/components/FloatingBadge";

<FloatingBadge text="@username" className="top-8 right-12" />
```

## Customization

- **Colors**: Edit `tailwind.config.js` theme
- **Fonts**: Update Google Fonts import in `app/globals.css`
- **Card Images**: Pass custom `cards` array to `FannedCards` component
- **Background**: Modify grain texture SVG in `app/globals.css`

## Design Philosophy

This hero section follows an artistic, editorial aesthetic with:
- High contrast between serif headlines and sans-serif UI
- Subtle depth through shadows, overlaps, and animations
- Minimalist color palette (black, white, grays)
- Organic feel from grain texture and rotated elements
