import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles.css";
import PrelineScript from "@/components/PrelineScript";
import { DATA } from "@/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(DATA.baseURL || "https://links.devtrung.tech"),
  title: "Trung's URL Shortener",
  description: "Trung's URL Shortener",
  openGraph: {
    title: "Vũ Thành Trung",
    description: "Trung's URL Shortener",
    images: ["/assets/meta/banner.webp"],
  },
  twitter: {
    title: "Vũ Thành Trung",
    card: "summary_large_image",
    description: "A website which displays my Spotify status.",
    images: ["/assets/meta/banner.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="footer-container">
          <div className="credit" id="credit">
            Made by <a href="https://discord.gg/TR8k3MtjNZ">Vũ Thành Trung</a> |{" "}
            <a href="https://github.com/vuthanhtrung2010/url-shortener">
              Github
            </a>
          </div>
          <div className="space-y-0">
            <p>&copy; 2024 Trung - All Rights Reserved.</p>
          </div>
        </div>
      </body>
      <SpeedInsights />
      <Analytics />
      <PrelineScript />
    </html>
  );
}
