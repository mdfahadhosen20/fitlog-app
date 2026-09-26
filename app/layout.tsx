import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald", display: "swap" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink font-sans text-white antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </PlanProvider>
      </body>
    </html>
  );
}
