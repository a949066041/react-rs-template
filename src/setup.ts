import { patchFetch } from './api/fetch/patch'
import { useCacheStore } from './store/cache.store'

function fetchAuthIntercept(req: RequestInit) {
  const { cookie } = useCacheStore.getState()

  if (cookie) {
    req.headers = {
      ...(req.headers || {}),
      Authorization: cookie,
    }
  }

  return req
}

async function fetchResponseIntercepet(res: Response) {
  if (res.status !== 200) {
    console.error(await res.json())
    throw new Error('error request')
  }
  return res
}

function setupFetch() {
  patchFetch([fetchAuthIntercept], fetchResponseIntercepet)
}

setupFetch()
