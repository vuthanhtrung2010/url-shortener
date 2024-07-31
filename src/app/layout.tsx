import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trung's URL Shortener",
  description: "Trung's URL Shortener",
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
    </html>
  );
}
