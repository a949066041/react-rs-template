import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { queryClient } from './store'
import { useCacheStore } from './store/cache.store'

const router = createRouter({ routeTree, context: { queryClient, auth: undefined } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const { userToken } = useCacheStore()

  return <RouterProvider router={router} context={{ auth: userToken, queryClient }} />
}
