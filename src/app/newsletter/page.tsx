'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Spinner,
  Badge,
} from '@chakra-ui/react'

interface Subscriber {
  id: number
  email: string
  created_at: string
  is_active: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/newsletter/subscribers`)
        if (!response.ok) {
          throw new Error('Failed to fetch subscribers')
        }
        const data = await response.json()
        setSubscribers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    )
  }

  return (
    <Box p={4}>
      <Heading mb={6}>Newsletter Subscribers</Heading>
      <Text mb={4}>Total subscribers: {subscribers.length}</Text>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Date Subscribed</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subscribers.map((subscriber) => (
            <Tr key={subscriber.id}>
              <Td>{subscriber.email}</Td>
              <Td>{new Date(subscriber.created_at).toLocaleDateString()}</Td>
              <Td>
                <Badge colorScheme={subscriber.is_active ? 'green' : 'red'}>
                  {subscriber.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}