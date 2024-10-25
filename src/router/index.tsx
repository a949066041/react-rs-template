import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

import App from '~/App.tsx'
import About from '~/pages/About'
import Home from '~/pages/Home'

export const rootRoute = createRootRoute({
  component: App,
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: Home,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/about',
      component: About,
    }),
  ]),
})
