import "./globals.css";
import { Poppins, EB_Garamond } from 'next/font/google';
import AutoClickTracker from "@/components/AutoClickTracker";

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${poppins.variable} ${ebGaramond.variable}`}>
      <head />
      <body className={`${poppins.className} bg-black text-white`} suppressHydrationWarning>
        <AutoClickTracker />
        {children}
      </body>
    </html>
  );
}
