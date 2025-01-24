import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import classix from 'classix'
import { ThemeProvider, Themes, useTheme } from '~/components'

const routes = [
  { path: '/', title: '首页', icon: 'icon-[line-md--home]' },
  { path: '/table', title: 'react table', icon: 'icon-[hugeicons--table]' },
  { path: '/store', title: 'zustand 缓存', icon: 'icon-[octicon--cache-24]' },
  { path: '/user', title: 'react query', icon: 'icon-[logos--react-query]' },
  { path: '/layout-test', title: '嵌套路由', icon: 'icon-[ant-design--layout-outlined]' },
  { path: '/group2', title: '分组', icon: 'icon-[icons8--group]' },
  { path: '/page', title: '用户鉴权', icon: 'icon-[arcticons--microsoft-authenticator]' },
  { path: '/404', title: 'not found page', icon: 'icon-[tabler--error-404]' },
  { path: '/about', title: '关于', icon: 'icon-[ix--about]' },
]

function ThemeMode() {
  const { themeName, set } = useTheme()
  return (
    <i
      onClick={() => set(themeName !== Themes.DARK)}
      className=" dark:icon-[circum--light] icon-[circum--dark] border cursor-pointer text-4xl"
    />
  )
}

interface MyRouterContext {
  queryClient: QueryClient
  auth?: string
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const state = useRouterState()

  return (
    <ThemeProvider>
      <div className=" flex h-screen dark:bg-black/75 bg-white/85 dark:text-white">
        <ul className=" w-[200px] flex-none border-r-2 border-dashed border-blue-300 h-full">
          {
            routes.map(item => (
              <li key={item.path} className=" h-10 leading-10 p-2 ">
                <Link to={item.path} className=" flex items-center" activeProps={{ className: ' font-bold text-red-400' }}>
                  <i className={classix(item.icon, ' mr-2')} />
                  { item.title }
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="  flex-1 py-2 px-3 overflow-hidden">
          <header className=" text-right">
            <span className=" justify-end">
              <ThemeMode />
            </span>
          </header>
          { state.isLoading && 'loading...' }
          <Outlet />
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </div>
    </ThemeProvider>
  )
}
