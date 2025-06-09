import type { Metadata } from "next";
import { Providers } from './providers'
import MenuBar from "@/components/menubar";
import './globals.css'
import { headers } from 'next/headers';
import { Box } from '@chakra-ui/react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

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
      <body className={spaceGrotesk.className} suppressHydrationWarning>
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
