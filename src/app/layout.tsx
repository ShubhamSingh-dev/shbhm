import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/common/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/common/navbar";
import { SiteFooter } from "@/components/common/site-footer";
import NoiseCursor from "@/components/common/cursor-noise";
import GridOverlay from "@/components/common/grid-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shbhm — Portfolio",
  description: "Personal portfolio of Shubham Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <GridOverlay />
              <div
                className="pointer-events-none fixed inset-0 z-10 opacity-[0.025] bg-noise"
                aria-hidden="true"
              />
              <NoiseCursor />
              <div className="relative z-20 flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
