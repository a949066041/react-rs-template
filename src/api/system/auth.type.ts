import { z } from 'zod'
import { roleSchema, userSchema } from './user.type'

export const authLoginSchema = z.object({
  username: z.string().min(3, { message: '请输入最小3位' }).max(20),
  password: z.string().min(3, { message: '请输入最小3位' }).max(20),
})
export type AuthLogin = z.infer<typeof authLoginSchema>

export const authLoginResSchema = z.object({
  token: z.string().startsWith('Bearer'),
})
export type AuthLoginRes = z.infer<typeof authLoginResSchema>

export const authUserSchema = userSchema.extend(
  {
    sysUsersRoles: z.array(z.object({ role: roleSchema })),
  },
)
export type AuthUserRes = z.infer<typeof authUserSchema>
