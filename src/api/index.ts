import { patchFetch } from './patch'

export * from './user.api'
export * from './user.type'

patchFetch([(config) => {
  const cookie = '123123'

  if (cookie) {
    config.headers = {
      ...config.headers,
      Authorization: cookie,
    }
  }

  return config
}])
