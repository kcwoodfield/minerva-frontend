import type { Metadata } from "next";
import { Providers } from './providers'
import MenuBar from "@/components/menubar";
import './globals.css'
import { headers } from 'next/headers';
import { Box, Container } from '@chakra-ui/react';

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
      <body suppressHydrationWarning>
        <Providers>
          {!isLoginPage && <MenuBar />}
          <Box minH="100vh">
            <Container maxW="7xl" py={6} px={{ base: 4, sm: 6, lg: 8 }}>
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
