import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IUserInfo {
  username: string
}

interface State {
  userInfo?: IUserInfo
}

interface Actions {
  loginUser: (username: IUserInfo['username']) => Promise<void>
  logoutUser: () => void
}

export const useAuthStore = create<State & Actions>()(
  immer(set => ({
    userInfo: undefined,
    loginUser: async (username) => {
      await new Promise(r => setTimeout(r, 200))
      set((state) => {
        state.userInfo = { username }
      })
    },
    logoutUser: () =>
      set((state) => {
        state.userInfo = undefined
      }),
  })),
)
