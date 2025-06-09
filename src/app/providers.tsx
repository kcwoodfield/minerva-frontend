'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const theme = extendTheme({
  fonts: {
    body: 'Space Grotesk, sans-serif',
    heading: 'Space Grotesk, sans-serif',
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'rgb(26 32 44)' : '#fefffa',
      },
    }),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}