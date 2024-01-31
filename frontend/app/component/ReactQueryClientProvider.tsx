'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

import { useState } from 'react'
// import { AuthProvider } from '@/app/utils/authProvider'
export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 5 * 1000,
          },
        },
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}