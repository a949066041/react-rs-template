import type { QueryClient } from '@tanstack/react-query'
import type { AuthUserRes, IBuildMenu } from '~/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '~/components'

export interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthUserRes | null
  menuList: IBuildMenu['menu']
  permission: IBuildMenu['btn']
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  ),
})
