import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State { cookie?: string }

interface Actions {
  setCookie: (cookie?: string) => void
}

export const useCacheStore = create<State & Actions>()(
  persist(
    set => ({
      cookie: '',
      setCookie(cookie) {
        set({ cookie })
      },
    }),
    { name: 'position-storage' },
  ),
)
