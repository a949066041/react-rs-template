import type { IBuildMenu } from './menu.type'
import { queryOptions } from '@tanstack/react-query'
import { fetchClient } from '~/api'

export async function getMenuBuild() {
  return await fetchClient.get<IBuildMenu>('/api/api/menus/build')
}

export const menuQueryTreeOptions = queryOptions({
  queryKey: ['menu-tree'],
  queryFn: getMenuBuild,
  staleTime: 10 * 200,
})
