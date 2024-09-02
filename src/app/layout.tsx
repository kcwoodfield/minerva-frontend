import type { Metadata } from "next";
import { Providers } from './providers'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import MenuBar from "@/components/menubar";

import "./globals.css";


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
      <body className={GeistMono.className}>
        <Providers>
          <MenuBar />

              {children}
        </Providers>
      </body>
    </html>
  );
}
