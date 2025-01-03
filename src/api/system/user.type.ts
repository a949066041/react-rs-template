import { z } from 'zod'

export interface IUserEntity {
  id: number
  firstName: string
  lastName: string
}

export interface IUserList {
  users: IUserEntity[]
  skip: number
  total: number
}

const commenTableSchema = z.object({
  createBy: z.string().max(255).nullable(),
  updateBy: z.string().max(255).nullable(),
  createTime: z.string().datetime().nullable(),
  updateTime: z.string().datetime().nullable(),
})

export const userSchema = z.object({
  userId: z.string().uuid().or(z.string()),
  username: z.string().max(180).nullable(),
  nickName: z.string().max(255).nullable(),
  gender: z.enum(['男', '女']).nullable(),
  phone: z.string().max(255).nullable(),
  email: z.string().email().max(180).nullable(),
  avatarName: z.string().max(255).nullable().optional(),
  avatarPath: z.string().max(255).nullable().optional(),
  password: z.string().max(255).nullable(),
  isAdmin: z.boolean().nullable(),
  enabled: z.boolean().nullable(),
  pwdResetTime: z.string().datetime().nullable(),
}).merge(commenTableSchema)

export const roleSchema = z.object({
  roleId: z.string().uuid().or(z.string()),
  name: z.string().max(100).describe('角色名称'),
  level: z.number().int().nullable().describe('角色等级'),
  description: z.string().max(255).nullable().describe('角色描述'),
  dataScope: z.string().max(255).nullable().describe('数据范围'),
}).merge(commenTableSchema)
