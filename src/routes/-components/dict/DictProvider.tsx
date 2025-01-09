import type { RenderProviderProps, TransformType } from './interface'
import { useDict } from './useDict'

export function DictProvider<T extends TransformType, >({ children, transform = 'string', dict }: RenderProviderProps<T>) {
  const dictValue = useDict<T>({ dict, transform })
  return (
    <>
      { children(dictValue) }
    </>
  )
}
