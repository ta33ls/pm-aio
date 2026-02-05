import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PM All-in-One - 产品经理提效工具集",
  description: "为产品经理打造的智能工具集，让创意自如流动",
  keywords: ["产品经理", "PM", "效率工具", "AI", "工具集"],
  authors: [{ name: "PM AIO Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAF9F5]`}
      >
        <Header />

        <main className="relative min-h-screen pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
