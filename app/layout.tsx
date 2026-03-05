import type { Metadata } from "next";
import { Ovo, Battambang } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/lib/config";

const legan = localFont({
  src: "./fonts/Legan.woff",
  variable: "--font-legan",
  weight: "100 900",
});

const thesignature = localFont({
  src: "./fonts/Thesignature.ttf",
  variable: "--font-thesignature",
  weight: "100 900",
});

const wonder = localFont({
  src: "./fonts/Wonder.woff",
  variable: "--font-wonder",
  weight: "100 900",
});

const ovo = Ovo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ovo",
});

const battambang = Battambang({
  weight: ["400", "700"],
  subsets: ["khmer", "latin"],
  variable: "--font-battambang",
});

export const metadata: Metadata = {
  title: `The Wedding of ${config.coupleNames}`,
  description: `សូមគោរពអញ្ជើញចូលរួមពិធីអាពាហ៍ពិពាហ៍របស់ ${config.coupleNamesKhmer}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <body
        className={`bg-[#0a0a0a] ${ovo.variable} ${thesignature.variable} ${wonder.variable} ${legan.variable} ${battambang.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
