import { z } from 'zod'

const commenTableSchema = z.object({
  createBy: z.string().max(255).nullable().describe('创建人'),
  updateBy: z.string().max(255).nullable().describe('更新人'),
  createTime: z.date().nullable().describe('创建时间'),
  updateTime: z.date().nullable().describe('更新时间'),
})

export const menuSchema = z.object({
  menuId: z.string().uuid().describe('菜单ID，唯一标识符'),
  pid: z.string().nullable().describe('父菜单ID，如果为null则表示顶级菜单'),
  type: z.number().int().nullable().describe('菜单类型，例如：0-目录，1-菜单，2-按钮'),
  title: z.string().max(100).nullable().describe('菜单标题，显示在界面上'),
  name: z.string().max(100).nullable().describe('菜单名称，用于内部标识'),
  component: z.string().max(255).nullable().describe('组件路径，指向对应的React组件'),
  menuSort: z.number().int().nullable().describe('菜单排序，用于控制菜单的显示顺序'),
  icon: z.string().max(255).nullable().describe('菜单图标，例如：antd icon的名称'),
  path: z.string().max(255).nullable().describe('菜单路径，用于路由跳转'),
  iFrame: z.boolean().nullable().describe('是否是iframe，如果是则通过iframe加载'),
  cache: z.boolean().default(false).describe('是否缓存，用于控制是否缓存页面'),
  hidden: z.boolean().default(false).describe('是否隐藏，用于控制菜单是否在界面上显示'),
  permission: z.string().max(255).nullable().describe('权限标识，用于控制菜单的访问权限'),
}).merge(commenTableSchema)

type IMenuTree = z.infer<typeof menuSchema>

export interface IBuildMenu {
  menu: MenuTree[]
  btn: string[]
}

export interface TreeNode<T> {
  id: string
  pid: string
  data: T
  children: TreeNode<T>[]
}

export type MenuTree = TreeNode<IMenuTree>
