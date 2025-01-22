import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getUserMe } from '~/api'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad({ context: { auth }, location }) {
    if (!auth) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  const { userInfo, setUser } = useAuthStore()
  const { auth } = Route.useRouteContext()
  const { isLoading } = useQuery({
    queryKey: ['userMe'],
    queryFn: async () => {
      const value = await getUserMe()
      setUser(value)
      return value
    },
    enabled: !userInfo?.id && !!auth,
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  return <Outlet />
}
