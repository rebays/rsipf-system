import type { Metadata, Viewport } from "next";
import { Public_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

import { BrandBar, GovBanner } from "@/components/brand";
import { SiteNav } from "@/components/nav";
import { Footer } from "@/components/layout";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Royal Solomon Islands Police Force",
    template: "%s · Royal Solomon Islands Police Force",
  },
  description:
    "Serving and protecting the communities of Solomon Islands with integrity, professionalism, and respect.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a1f3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${geistMono.variable}`}>
      <body>
        <GovBanner />
        <BrandBar />
        <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
