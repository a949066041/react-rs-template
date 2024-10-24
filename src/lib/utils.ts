import type { ClassName } from 'classix'
import classix from 'classix'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassName[]) {
  return twMerge(classix(...inputs))
}
