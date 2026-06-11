import type { Metadata, Viewport } from "next";
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
  title: "Aditya Thakur | Full Stack Developer & AI/ML Engineer",
  description: "Portfolio of Aditya Thakur, a B.Tech Artificial Intelligence student, Full Stack Developer, and Machine Learning Engineer specializing in intelligent digital products and scalable systems.",
  keywords: ["Aditya Thakur", "AI Engineer", "ML Engineer", "Full Stack Developer", "Next.js Portfolio", "Shoolini University", "Machine Learning Portfolio"],
  authors: [{ name: "Aditya Thakur" }],
  openGraph: {
    title: "Aditya Thakur | Full Stack Developer & AI/ML Engineer",
    description: "Portfolio of Aditya Thakur, specializing in scalable web systems, data architectures, and AI models.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Thakur | Full Stack Developer & AI/ML Engineer",
    description: "Portfolio of Aditya Thakur, specializing in scalable web systems, data architectures, and AI models.",
  }
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

import MascotWrapper from "@/components/MascotWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-dark text-white`}
      >
        {children}
        <MascotWrapper />
      </body>
    </html>
  );
}
