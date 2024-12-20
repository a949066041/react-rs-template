import type { IUserEntity, IUserList } from './user.type'
import { queryOptions } from '@tanstack/react-query'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const baseUrl = 'https://dummyjson.com/users'
/**
 * api
 */
export async function fetchUserList(): Promise<IUserList> {
  const res = await fetch(`${baseUrl}?limit=3`)
  await delay(2000)
  return res.json()
}

export async function fetchUser(id: IUserEntity['id']): Promise<IUserEntity> {
  const res = await fetch(`${baseUrl}/${id}`)
  await delay(100)
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
