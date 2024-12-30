export type FetchRequestIntercept = (config: RequestInit) => RequestInit
export type FetchResponseIntercept = (config: Response) => Response

export function patchFetch(requestIntercept: FetchRequestIntercept[] = [], responseIntercept: FetchResponseIntercept[] = []) {
  const { fetch: originFetch } = window

  window.fetch = async (...args) => {
    const [resource, config = {}] = args

    requestIntercept.forEach(req => req(config))

    const response = await originFetch(resource, config)

    responseIntercept.forEach(res => res(response))

    const json = () =>
      response
        .clone()
        .json()
        .then(data => ({ ...data }))

    response.json = json
    return response
  }
}
