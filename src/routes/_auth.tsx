import type { MenuTree } from '~/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { menuQueryTreeOptions } from '~/api'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  async beforeLoad({ context: { auth }, location }) {
    if (!auth) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    const { refreshUser, userInfo } = useAuthStore.getState()

    if (userInfo) {
      return true
    }
    await refreshUser()
  },
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(menuQueryTreeOptions)
  },
})

function Menu({ data }: { data: MenuTree }) {
  if (data.children && data.children.length !== 0) {
    return (
      <li>
        <span>{ data.id }</span>
        <ul className=" flex space-x-2">
          { data.children.map(item => <Menu key={item.id} data={item} />) }
        </ul>
      </li>

    )
  }

  return (
    <li>{ data.data.title }</li>
  )
}

function RouteComponent() {
  const { data } = useSuspenseQuery(menuQueryTreeOptions)
  return (
    <ul>
      { data.map(item => (<Menu data={item} key={item.id} />)) }
    </ul>
  )
  return <Outlet />
}
