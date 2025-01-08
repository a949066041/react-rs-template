import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'

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
