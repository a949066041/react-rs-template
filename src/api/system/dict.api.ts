import type { KeyLabelList } from './dict.type'

import { queryOptions } from '@tanstack/react-query'
import { fetchClient } from '~/api'
import { keyLabelVoSchema } from './dict.type'

export async function dictMap(key: string) {
  return await fetchClient.get<KeyLabelList>(
    `/api/api/dictDetail/map/${key}`,
    keyLabelVoSchema,
  )
}

export function dictQueryOptions(key: string) {
  return queryOptions({
    queryKey: ['dict', 'map', key],
    queryFn: () => dictMap(key),
    staleTime: 60 * 1000,
  })
}
