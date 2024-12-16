import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import classix from 'classix'

const routes = [
  { path: '/', title: '首页', icon: 'icon-[line-md--home]' },
  { path: '/store', title: 'zustand 缓存', icon: 'icon-[octicon--cache-24]' },
  { path: '/posts', title: 'react query', icon: 'icon-[logos--react-query]' },
  { path: '/layout-test', title: '嵌套路由', icon: 'icon-[ant-design--layout-outlined]' },
  { path: '/about', title: '关于', icon: 'icon-[ix--about]' },
]

export const Route = createRootRoute({
  component: () => (
    <div className=" grid grid-flow-row-dense grid-cols-3">
      <ul className="col-span-1">
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
      <div className=" col-span-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  ),
})
