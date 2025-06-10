'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { fonts } from './fonts'

const theme = extendTheme({
  fonts: {
    body: fonts.lora.style.fontFamily,
    heading: fonts.lora.style.fontFamily,
    mono: fonts.lora.style.fontFamily,
  },
  components: {
    Text: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Button: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Input: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    FormLabel: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Table: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Th: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
      },
    },
    Td: {
      baseStyle: {
        fontFamily: fonts.lora.style.fontFamily,
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
        fontFamily: fonts.lora.style.fontFamily,
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