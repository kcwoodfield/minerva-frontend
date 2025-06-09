import type { Metadata } from "next";
import { Providers } from './providers'
import MenuBar from "@/components/menubar";
import './globals.css'
import { headers } from 'next/headers';
import { Box } from '@chakra-ui/react';
import { EB_Garamond } from 'next/font/google'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" suppressHydrationWarning className={ebGaramond.className}>
      <body suppressHydrationWarning>
        <Providers>
          {!isLoginPage && <MenuBar />}
          <Box minH="100vh" maxW="7xl" mx="auto" py={6} px={{ base: 4, sm: 6, lg: 8 }}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
