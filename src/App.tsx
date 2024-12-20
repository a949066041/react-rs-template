import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { queryClient, useAuthStore } from './store'

const router = createRouter({ routeTree, context: { queryClient, auth: undefined } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const { userInfo } = useAuthStore()

  return <RouterProvider router={router} context={{ auth: userInfo, queryClient }} />
}
