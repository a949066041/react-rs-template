import { Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { type AuthLogin, authLoginSchema } from '~/api'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  component: RouteComponent,
  beforeLoad({ context: { auth }, search }) {
    if (auth) {
      throw redirect({ to: search.redirect || '/page' })
    }
  },
})

function initForm() {
  return {
    username: isDev ? 'admin' : '',
    password: isDev ? '123456' : '',
  }
}

function RouteComponent() {
  const auth = useAuthStore()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const form = useForm<AuthLogin>({
    initialValues: initForm(),
    validate: zodResolver(authLoginSchema),
  })

  const loginAction = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (value: AuthLogin) => auth.loginUser(value),
  })

  async function handleLoginSubmit() {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      await loginAction.mutateAsync(form.getValues())
      await navigate({ to: search.redirect || '/page' })
    }
  }
  return (
    <div>
      <form
        className=" mt-2  flex flex-col"
        onSubmit={form.onSubmit(handleLoginSubmit)}
      >
        <TextInput
          withAsterisk
          label="username"
          placeholder="username"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          withAsterisk
          label="password"
          placeholder="password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Box>
          <Button loading={loginAction.isPending} type="submit">
            Submit
          </Button>
          <Button type="button" onClick={form.reset} variant="default">
            reset
          </Button>
        </Box>
      </form>
    </div>
  )
}
