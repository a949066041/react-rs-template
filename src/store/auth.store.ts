import type { AuthLogin, AuthUserRes, IBuildMenu } from '~/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { authInfoQueryOption, authLogin, authLogout, menuQueryTreeOptions } from '~/api'
import { queryClient } from '.'
import { useCacheStore } from './cache.store'

interface State {
  userMenu: IBuildMenu['menu']
  premissions: IBuildMenu['btn']
  userInfo?: AuthUserRes
}

interface Actions {
  loginUser: (form: AuthLogin) => Promise<void>
  setUserPremissions: () => Promise<void>
  refreshUser: () => Promise<void>
  logoutUser: () => void
}

export const useAuthStore = create<State & Actions>()(
  immer(set => ({
    userInfo: undefined,
    premissions: [],
    userMenu: [],
    async setUserPremissions() {
      const userPremission = await queryClient.ensureQueryData(menuQueryTreeOptions)
      set((state) => {
        state.userMenu = userPremission.menu
        state.premissions = userPremission.btn
      })
    },
    async refreshUser() {
      const userInfo = await queryClient.ensureQueryData(authInfoQueryOption)
      set((state) => {
        state.userInfo = userInfo
      })
    },
    async loginUser(form) {
      const res = await authLogin(form)
      const { setCookie } = useCacheStore.getState()
      setCookie(res.token)
    },
    async logoutUser() {
      const { setCookie } = useCacheStore.getState()
      await authLogout()
      setCookie(undefined)
      set((state) => {
        state.premissions = []
        state.userInfo = undefined
      })
    },
  })),
)
