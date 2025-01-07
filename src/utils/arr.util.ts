import type { TreeNode } from '~/api'

export interface IFindParentKeyOptions<T> {
  findKey: keyof T
}

export function findParentFn<T>(
  list: TreeNode<T>[],
  key: string,
  options: IFindParentKeyOptions<T>,
): string[] {
  const _options = {
    ...options,
  } as Required<IFindParentKeyOptions<T>>

  for (const item of list) {
    const { children = [], data } = item
    if (data[_options.findKey] === key) {
      return [item.id]
    }
    const hasArr = findParentFn(children, key, _options)
    if (hasArr.length) {
      return [item.id, ...hasArr]
    }
  }

  return []
}
