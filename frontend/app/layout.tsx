import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-family-sans',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-family-serif',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
