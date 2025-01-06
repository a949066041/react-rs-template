import type { MenuTree } from '~/api'
import { NavLink } from '@mantine/core'
import { createFileRoute, Outlet, redirect, useLocation } from '@tanstack/react-router'
import clx from 'classix'
import { useMemo } from 'react'
import svgjson from '~~/assets/svg.json'
import { Themes, useTheme } from '~/components'
import { useAuthStore } from '~/store'
import { useCacheStore } from '~/store/cache.store'

function ThemeMode() {
  const { themeName, set } = useTheme()
  return (
    <i
      onClick={() => set(themeName !== Themes.DARK)}
      className=" dark:icon-[circum--light] icon-[circum--dark] border cursor-pointer text-4xl"
    />
  )
}

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
    await refreshUser()
    await setUserPremissions()
  },
})

const iconList = Object.keys(svgjson.icons)

function findParentFn(data: MenuTree[], key: string) {
  const arr: string[] = []

  data.forEach(({ id, children = [], data }) => {
    if (data.component !== key) {
      const hasArr = findParentFn(children, key)
      hasArr.length && arr.push(...[id, ...hasArr])
      return
    }
    arr.push(id)
  })

  return arr
}

function MenuItem({ data, activeIds }: { data: MenuTree, activeIds: string[] }) {
  const navigate = Route.useNavigate()
  return (
    <NavLink
      key={data.id}
      label={data.data.title}
      leftSection={data.data.icon && <i className={data.data.icon} />}
      defaultOpened={activeIds.includes(data.id)}
      active={activeIds.includes(data.id)}
      onClick={() => !data.children && navigate({ to: data.data.component! })}
    >
      {
        data.children?.map(item => <MenuItem key={item.id} data={item} activeIds={activeIds} />)
      }
    </NavLink>
  )
}

function RouteComponent() {
  const router = useLocation()
  const { userMenu } = useAuthStore()
  const concatIds = useMemo(() => findParentFn(userMenu, router.href), [userMenu, router.href])

  if (!userMenu.length) {
    return 'loading user'
  }

  return (
    <div className=" flex h-screen dark:bg-black/75 bg-white/85 dark:text-white">
      <ul className=" w-[200px] flex-none border-r-2 border-dashed border-blue-300 h-full whitespace-nowrap">
        { userMenu.map(item => <MenuItem key={item.id} data={item} activeIds={concatIds} />) }
      </ul>
      <div className="  flex-1 py-2 px-3 overflow-hidden">
        <header className=" text-right">
          <span className=" justify-end">
            <ThemeMode />
          </span>
        </header>
        <div className=" grid grid-cols-12">
          { iconList.map(item => (
            <div key={item} className=" w-full h-10 flex justify-center items-center">
              <i className={clx(`icon-[custom--${item}]`, ' text-xl hover:text-blue-500 hover:scale-150 transition-all cursor-pointer')} />
            </div>
          )) }
        </div>
        <Outlet />
      </div>
    </div>
  )
}
