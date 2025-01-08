import { z } from 'zod'
import { baseTreeNode, commenTableSchema } from '../common'

export const menuSchema = z.object({
  menuId: z.string().or(z.string().uuid()),
  pid: z.string().nullable(),
  type: z.number().int().nullable(),
  title: z.string().max(100).nullable(),
  name: z.string().max(100).nullable(),
  component: z.string().max(255).nullable(),
  menuSort: z.number().int().nullable(),
  icon: z.string().max(255).nullable(),
  path: z.string().max(255).nullable(),
  iFrame: z.boolean().nullable(),
  cache: z.boolean().nullable(),
  hidden: z.boolean().nullable(),
  permission: z.string().max(255).nullable(),
}).merge(commenTableSchema)

export const menuItemSchema: z.ZodType<MenuChildren> = z.object({
  data: menuSchema,
  children: z.lazy(() => z.array(menuItemSchema)).optional(),
}).merge(baseTreeNode)

export const buildMenuSchema = z.object({
  btn: z.string().array(),
  menu: z.array(menuItemSchema),
})

export type MenuEntity = z.infer<typeof menuSchema>

export type IBuildMenu = z.infer<typeof buildMenuSchema>

type MenuChildren = z.infer<typeof baseTreeNode> & {
  data: MenuEntity
  children?: MenuChildren[]
}

export type MenuTree = z.infer<typeof menuItemSchema>
