import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PSG TECH AI4Dev '26 - National-Level Hackathon | AI-Enabled Transformative Technologies",
  description: "Join the National-Level Hackathon 'AI-Enabled Transformative Technologies for Global Development' (AI4Dev '26). Develop innovative AI solutions addressing real-world challenges. Register now!",
  keywords: ["AI4Dev", "hackathon", "AI", "artificial intelligence", "national hackathon", "innovation", "technology", "development", "coding", "competition"],
  authors: [{ name: "Coding Club" }],
  creator: "Coding Club",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai4dev-hackathon.vercel.app",
    title: "PSG TECH AI4Dev'26 - National-Level Hackathon",
    description: "AI-Enabled Transformative Technologies for Global Development. Join India's premier AI hackathon event.",
    siteName: "AI4Dev '26",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI4Dev'26 Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI4Dev '26 - National-Level Hackathon",
    description: "AI-Enabled Transformative Technologies for Global Development. Register now!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

