import { z } from 'zod'

export const commenTableSchema = z.object({
  createBy: z.string().max(255).nullable(),
  updateBy: z.string().max(255).nullable(),
  createTime: z.string().datetime().nullable(),
  updateTime: z.string().datetime().nullable(),
})

export const errorMsgSchema = z.object({
  statusCode: z.number(),
  message: z.string().nullable(),
})

export type ErrorMsg = z.infer<typeof errorMsgSchema>

export const baseTreeNode = z.object({
  id: z.string(),
  pid: z.string().nullable(),
})

export interface TreeNode<T> {
  id: string
  pid: string
  data: T
  children: TreeNode<T>[]
}
