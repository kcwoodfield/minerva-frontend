import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuBar from "@/components/ui/menubar"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minerva, organize your books.",
  description: "A simple inventory system for a home library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
