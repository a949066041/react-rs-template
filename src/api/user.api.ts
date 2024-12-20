import type { IUserEntity, IUserList } from './user.type'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const baseUrl = 'https://dummyjson.com/users'
/**
 * api
 */
export async function fetchUserList(): Promise<IUserList> {
  const res = await fetch(`${baseUrl}?limit=3`)
  return res.json()
}

export async function fetchUser(id: IUserEntity['id']): Promise<IUserEntity> {
  const res = await fetch(`${baseUrl}/${id}`)
  await delay(100)
  return res.json()
}

const USER_PAGER_LIMIT = 100
export async function fetchUserPager({ pageParam: offset }: { pageParam: number }): Promise<IUserList> {
  const res = await fetch(`${baseUrl}?limit=${USER_PAGER_LIMIT}&skip=${offset}`)
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

export const userQueryPagerOptions = infiniteQueryOptions({
  queryKey: ['user-pager'],
  queryFn: fetchUserPager,
  initialPageParam: 0,
  getNextPageParam: (res, list) => res.total > list.map(item => item.users).flat().length
    ? (res.skip + USER_PAGER_LIMIT)
    : undefined,
})
