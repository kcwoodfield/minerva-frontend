'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { EB_Garamond } from 'next/font/google'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const theme = extendTheme({
  fonts: {
    body: ebGaramond.style.fontFamily,
    heading: ebGaramond.style.fontFamily,
    mono: ebGaramond.style.fontFamily,
  },
  components: {
    Text: {
      baseStyle: {
        fontFamily: ebGaramond.style.fontFamily,
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: ebGaramond.style.fontFamily,
      },
    },
    Button: {
      baseStyle: {
        fontFamily: ebGaramond.style.fontFamily,
      },
    },
    Input: {
      baseStyle: {
        fontFamily: ebGaramond.style.fontFamily,
      },
    },
    FormLabel: {
      baseStyle: {
        fontFamily: ebGaramond.style.fontFamily,
      },
    },
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#171717' : '#fefffa',
        fontFamily: ebGaramond.style.fontFamily,
      },
      '.search-wrapper': {
        bg: props.colorMode === 'dark' ? 'gray.800' : '#ffffff',
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