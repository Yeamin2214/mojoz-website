import type { Metadata, Viewport } from "next";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransition from "@/components/fx/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mojoz.com"),
  title: {
    default: "Mojoz | This Ain't Your Grandma's Cone",
    template: "%s | Mojoz",
  },
  description:
    "Mojoz GummiCone — the world's 1st & only candy ice cream cone. Kosher, Halal, gluten-free, vegan, and made in the USA. Explore flavours and wholesale partnership.",
  keywords: [
    "Mojoz",
    "GummiCone",
    "candy ice cream cone",
    "gummy cone",
    "wholesale ice cream",
    "vegan candy",
  ],
  openGraph: {
    title: "Mojoz | This Ain't Your Grandma's Cone",
    description:
      "The world's 1st & only candy ice cream cone. Kosher, Halal, gluten-free, vegan, and made in the USA.",
    type: "website",
    locale: "en_US",
    siteName: "Mojoz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mojoz | This Ain't Your Grandma's Cone",
    description: "The world's 1st & only candy ice cream cone.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00d2ff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Baloo+2:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
