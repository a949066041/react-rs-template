import type { DictMap, KeyLabelList } from '~/api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { dictQueryOptions } from '~/api'
import { transFormUtils } from '~/utils'

export interface IUseDictOptions {
  transform?: keyof typeof transFormUtils
}

export interface TransFormKeyLabel<T extends string | boolean | number> {
  value: T
  label: string
}

export interface IRenderDict<T extends string | boolean | number> {
  isLoading: boolean
  data: TransFormKeyLabel<T>[]
  mapData: DictMap<T>
  originData: KeyLabelList
}

export function useDict<T extends string | number | boolean>(dict: string, options: IUseDictOptions = {}) {
  const _options = {
    transform: 'string' as T,
    ...options,
  } as Required<IUseDictOptions>
  const { data = [], isLoading } = useQuery(dictQueryOptions(dict))

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
