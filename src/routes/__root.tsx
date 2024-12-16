import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import classix from 'classix'
import { useDarkMode } from 'usehooks-ts'

const routes = [
  { path: '/', title: '首页', icon: 'icon-[line-md--home]' },
  { path: '/store', title: 'zustand 缓存', icon: 'icon-[octicon--cache-24]' },
  { path: '/posts', title: 'react query', icon: 'icon-[logos--react-query]' },
  { path: '/layout-test', title: '嵌套路由', icon: 'icon-[ant-design--layout-outlined]' },
  { path: '/about', title: '关于', icon: 'icon-[ix--about]' },
]

function ThemeMode() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode()
  return (
    <>
      <p>
        Current theme:
        {isDarkMode ? 'dark' : 'light'}
      </p>
      <button onClick={toggle} type="button">Toggle</button>
      <button onClick={enable} type="button">Enable</button>
      <button onClick={disable} type="button">Disable</button>
    </>
  )
}

export const Route = createRootRoute({
  component: () => (
    <div className=" flex h-screen">
      <ul className=" w-[200px] border-r-2 border-dashed border-blue-300 h-full">
        {
          routes.map(item => (
            <li key={item.path} className=" h-10  leading-10 p-2 ">
              <Link to={item.path} className=" flex items-center" activeProps={{ className: ' font-bold text-red-400' }}>
                <i className={classix(item.icon, ' mr-2')} />
                { item.title }
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="  flex-1 py-2 px-3">
        <header className=" text-right">
          <span className=" justify-end">
            <ThemeMode />
          </span>
        </header>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
})
