import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/common/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/common/navbar";
import { SiteFooter } from "@/components/common/site-footer";
import NoiseCursor from "@/components/common/cursor-noise";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
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
          className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} font-mono antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {/*
               * ── Structural Column Rails ──────────────────────────────────
               * Two fixed vertical lines flanking the content column,
               * extending the full page height (like kantrishi.com).
               */}
              <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
                <div className="relative h-full w-full max-w-3xl">
                  {/* Left rail */}
                  <div className="absolute inset-y-0 left-0 w-px bg-border" />
                  {/* Right rail */}
                  <div className="absolute inset-y-0 right-0 w-px bg-border" />
                </div>
              </div>

              <NoiseCursor />
              <div className="relative z-10"><Navbar /></div>
              <div className="relative z-10">{children}</div>
              <div className="relative z-10"><SiteFooter /></div>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
