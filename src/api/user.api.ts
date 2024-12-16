import type { IUserEntity, IUserList } from './user.type'
import { queryOptions } from '@tanstack/react-query'

/**
 * api
 */
export async function fetchUserList(): Promise<IUserList> {
  const res = await fetch('https://dummyjson.com/users/?limit=3')
  return res.json()
}

export async function fetchUser(id: IUserEntity['id']): Promise<IUserEntity> {
  const res = await fetch(`https://dummyjson.com/users/${id}`)
  return res.json()
}

/**
 * react query client
 */
export const userQueryListOptions = queryOptions({
  queryKey: ['user-list'],
  queryFn: fetchUserList,
})

export function userQueryOptions(id: IUserEntity['id']) {
  return queryOptions({
    queryKey: ['user-list', { id }],
    queryFn: () => fetchUser(id),
  })
}
