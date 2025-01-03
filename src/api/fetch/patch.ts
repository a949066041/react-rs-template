export type FetchRequestIntercept = (config: RequestInit) => RequestInit
export type FetchResponseIntercept = (config: Response) => void

export function patchFetch(
  requestIntercept: (FetchRequestIntercept | FetchRequestIntercept[]) = [],
  responseIntercept: (FetchResponseIntercept | FetchResponseIntercept[]) = [],
) {
  const { fetch: originFetch } = window

  window.fetch = async (...args) => {
    const [resource, config = {}] = args

    requestIntercept = Array.isArray(requestIntercept) ? requestIntercept : [requestIntercept]
    requestIntercept.forEach(req => req(config))

    const response = await originFetch(resource, config)

    responseIntercept = Array.isArray(responseIntercept) ? responseIntercept : [responseIntercept]
    responseIntercept.map(res => res(response))

    const json = () =>
      response
        .clone()
        .json()
        .then(data => data)

    response.json = json
    return response
  }
}
