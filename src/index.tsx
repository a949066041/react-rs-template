import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { queryClient, useAuthStore } from './store'

import './style/index.css'

const router = createRouter({ routeTree, context: { queryClient, auth: undefined } })

function InnerApp() {
  const { userInfo } = useAuthStore()
  return <RouterProvider router={router} context={{ auth: userInfo, queryClient }} />
}

function bootstrap() {
  const rootEl = document.getElementById('root')
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>,
    )
  }
}

bootstrap()
