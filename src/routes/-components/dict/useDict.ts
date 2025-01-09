import type { IRenderDict, IUseDictOptions, TransformType } from './interface'
import type { DictMap } from '~/api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { dictQueryOptions } from '~/api'
import { transFormUtils } from '~/utils'

export function useDict<T extends TransformType>(options: IUseDictOptions) {
  const _options = {
    transform: 'string' as T,
    ...options,
  } as Required<IUseDictOptions>
  const { data = [], isLoading } = useQuery(dictQueryOptions(_options.dict))

  const transformData = useMemo(() => {
    if (!data) {
      return []
    }
    return data.map(item => ({
      ...item,
      value: transFormUtils[_options.transform](item.value) as T,
    }))
  }, [data, _options.transform])

  const mapData = useMemo(() => {
    return transformData.reduce((base, { value, label }) => {
      base.set(value, label)
      return base
    }, new Map() as DictMap<T>)
  }, [transformData])

  return {
    isLoading,
    data: transformData,
    mapData,
    originData: data,
  } as IRenderDict<T>
}
