import type { Metadata } from "next";
import { Providers } from './providers'
import MenuBar from "@/components/menubar";
import './globals.css'
import { EB_Garamond } from 'next/font/google'

const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
})

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
    <html lang="en" className={ebGaramond.variable}>
      <body className={`${ebGaramond.className} antialiased`}>
        <Providers>
          <MenuBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
