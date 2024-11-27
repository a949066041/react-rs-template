import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Link to="/" className=" mr-2">home</Link>
      <Link to="/about">about</Link>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
})
