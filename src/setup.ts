import { patchFetch } from './api/fetch/patch'
import { useAuthStore } from './store'
import { useCacheStore } from './store/cache.store'

function fetchAuthIntercept(req: RequestInit) {
  const { userToken } = useCacheStore.getState()

  if (userToken) {
    req.headers = {
      ...(req.headers || {}),
      Authorization: `Bearer ${userToken}`,
    }
  }

  return req
}

async function fetchResponseIntercepet(res: Response) {
  if (res.status === 401) {
    useAuthStore.getState().logoutUser()
    throw new Error('unauthorized')
  }

  if (res.status !== 200) {
    throw new Error('error request')
  }
  return res
}

function setupFetch() {
  patchFetch([fetchAuthIntercept], fetchResponseIntercepet, 'https://dummyjson.com')
}

setupFetch()
