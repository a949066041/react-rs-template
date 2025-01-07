import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { useMemo } from 'react'

import { useAuthStore } from '~/store'
import { useCacheStore } from '~/store/cache.store'
import { findParentFn } from '~/utils'
import AvatarAction from './-components/AvatarAction'
import MenuItem from './-components/MenuItem'
import ThemeMode from './-components/ThemeMode'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  async beforeLoad({ location }) {
    const { cookie } = useCacheStore.getState()

    if (!cookie) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    const { refreshUser, userInfo, setUserPremissions } = useAuthStore.getState()

    if (userInfo) {
      return true
    }

    await setUserPremissions()
    await refreshUser()
  },
})

function RouteComponent() {
  const router = useLocation()
  const { menuList } = Route.useRouteContext()
  const concatIds = useMemo(
    () => findParentFn(menuList, router.href, { findKey: 'component' }),
    [menuList, router.href],
  )

  return (
    <div className=" flex h-screen ">
      <ul className=" w-[200px] flex-none border-r-2 border-dashed border-blue-300 h-full whitespace-nowrap">
        { menuList.map(item => (<MenuItem key={item.id} data={item} activeIds={concatIds} />)) }
      </ul>
      <div className="  flex-1 py-2 px-3 overflow-hidden">
        <header className=" text-right">
          <span className=" justify-end flex space-x-2">
            <ThemeMode />
            <AvatarAction />
          </span>
        </header>
        <Outlet />
      </div>
    </div>
  )
}
