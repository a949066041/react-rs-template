import type { DictMap, KeyLabelList } from '~/api'
import type { transFormUtils } from '~/utils'

export type TransformType = string | boolean | number

export interface IUseDictOptions {
  dict: string
  transform?: keyof typeof transFormUtils
}

export interface TransFormKeyLabel<T extends TransformType> {
  value: T
  label: string
}

export interface IRenderDict<T extends TransformType> {
  isLoading: boolean
  data: TransFormKeyLabel<T>[]
  mapData: DictMap<T>
  originData: KeyLabelList
}

export type RenderProviderProps<T extends TransformType> = {
  children: ((context: IRenderDict<T>) => React.ReactNode)
} & IUseDictOptions
