import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://originpuretea.com"),
  title: "Origin Pure – Citrus Vitality Moringa Lemongrass Green Tea",
  description:
    "Origin Pure Citrus Vitality blends moringa, lemongrass, and green tea for a bright, uplifting ritual that supports daily wellness and sustained calm energy.",
  openGraph: {
    title: "Origin Pure – Citrus Vitality Moringa Lemongrass Green Tea",
    description:
      "A citrus-forward wellness tea with moringa, lemongrass, and green tea for a fresh, uplifting daily ritual.",
    url: "https://originpuretea.com",
    images: [
      {
        url: "/images/1.png",
        width: 640,
        height: 800,
        alt: "Origin Pure Citrus Vitality Moringa Lemongrass Green Tea",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/prdimg/logo.jpeg",
    shortcut: "/prdimg/logo.jpeg",
    apple: "/prdimg/logo.jpeg",
  },
  other: {
    "robots": "index,follow",
    "og:type": "product",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-[#FFF8E7] text-[#1B4332] antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
