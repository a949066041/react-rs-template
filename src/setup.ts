import { notifications } from '@mantine/notifications'
import { type ErrorMsg, errorMsgSchema } from './api/common'
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
    const errorMsg: ErrorMsg = await res.json()

    if (isDev && errorMsgSchema.safeParse(errorMsg).success) {
      notifications.show({
        position: 'top-right',
        title: `status: ${res.status}`,
        message: `error dev fetch ${JSON.stringify(res)}`,
      })
      return
    }

    notifications.show({
      position: 'top-right',
      title: `status: ${res.status}`,
      message: errorMsg.message,
    })
    throw new Error('error request')
  }
  return res
}

function setupFetch() {
  patchFetch([fetchAuthIntercept], fetchResponseIntercepet)
}

setupFetch()
