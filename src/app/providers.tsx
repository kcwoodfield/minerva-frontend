'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const theme = extendTheme({
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
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