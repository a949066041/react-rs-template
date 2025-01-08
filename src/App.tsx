import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useEffect } from 'react'
import { routeTree } from './routeTree.gen'
import { queryClient, useAuthStore } from './store'

const router = createRouter({ routeTree, context: { queryClient, auth: null, permission: [], menuList: [] } })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const authStore = useAuthStore()
  useEffect(() => {
    return useAuthStore.subscribe((state, prevState) => {
      if (state.userInfo !== prevState.userInfo) {
        router.invalidate()
      }
    })
  }, [])
  return (
    <RouterProvider
      router={router}
      context={{
        auth: authStore.userInfo,
        queryClient,
        permission: authStore.premissions,
        menuList: authStore.userMenu,
      }}
    />
  )
}
