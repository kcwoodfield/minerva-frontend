import type { Metadata } from "next";
import { Providers } from './providers'
import MenuBar from "@/components/menubar";
import './globals.css'
import { EB_Garamond } from 'next/font/google'
import LogoutButton from '@/components/LogoutButton';
import { headers } from 'next/headers';

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
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ebGaramond.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {!isLoginPage && <MenuBar />}
          <div className="min-h-screen">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
