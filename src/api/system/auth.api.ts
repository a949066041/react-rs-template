import type { AuthLogin, AuthLoginRes, AuthUserRes } from './auth.type'
import { queryOptions } from '@tanstack/react-query'

import { authLoginResSchema, authUserSchema, fetchClient } from '~/api'

export async function authLogin(data: AuthLogin) {
  return await fetchClient.post<AuthLoginRes>(
    '/api/auth/login',
    data,
    authLoginResSchema,
  )
}

export async function authLogout() {
  return await fetchClient.delete<AuthLoginRes>(
    '/api/auth/logout',
  )
}

export async function authInfo() {
  return await fetchClient.get<AuthUserRes>(
    '/api/auth/info',
    authUserSchema,
  )
}

export const authInfoQueryOption = queryOptions({
  queryKey: ['auth', 'info'],
  queryFn: authInfo,
  refetchOnMount: false,
})
