import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Viral Shorts Architect",
  description: "Generate data-driven concepts, scripts, and hooks for viral YouTube Shorts.",
  keywords: [
    "YouTube Shorts",
    "content strategy",
    "viral video ideas",
    "hook generator",
    "script generator",
  ],
  openGraph: {
    title: "Viral Shorts Architect",
    description: "Generate data-driven concepts, scripts, and hooks for viral YouTube Shorts.",
    url: "https://agentic-a1ceea0f.vercel.app",
    siteName: "Viral Shorts Architect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Shorts Architect",
    description: "Generate viral YouTube Shorts ideas in minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
