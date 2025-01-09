import { z } from 'zod'

export const keyLabelVoSchema = z.array(z.object({
  value: z.string().describe('主键'),
  label: z.string().describe('内容'),
}))

export type KeyLabelList = z.infer<typeof keyLabelVoSchema>

export type DictMap<T extends string | boolean | number = string> = Map<T, string>
