import type { ILoginUserParams, LoginRes } from '~/api'
import { omit } from 'lodash-es'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { loginUser } from '~/api'
import { useCacheStore } from './cache.store'

interface States {
  userInfo?: Omit<LoginRes, 'accessToken'>
}

interface Actions {
  loginUser: (params: ILoginUserParams) => Promise<void>
  logoutUser: () => void
  setUser: (info: Required<States>['userInfo']) => void
}

function initAuthStore() {
  return {
    userInfo: undefined,
  } as States
}

export const useAuthStore = create<States & Actions>()(
  immer(set => ({
    ...initAuthStore(),
    loginUser: async (params: ILoginUserParams) => {
      const res = await loginUser(params)
      const cacheStore = useCacheStore.getState()
      set((state) => {
        state.userInfo = omit(res, ['accessToken'])
        cacheStore.setToken(res.accessToken)
      })
    },
    logoutUser: () => {
      const cacheStore = useCacheStore.getState()
      set((state) => {
        const initStore = initAuthStore()
        state.userInfo = initStore.userInfo
        cacheStore.removeToken()
      })
    },
    setUser: async (info: Required<States>['userInfo']) => {
      set((state) => {
        state.userInfo = info
      })
    },
  })),
)
