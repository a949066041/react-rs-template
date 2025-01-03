import type { AuthLogin } from '~/api'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
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

function RouteComponent() {
  const auth = useAuthStore()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const loginAction = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (value: AuthLogin) => auth.loginUser(value),
  })

  const form = useForm<AuthLogin>({
    defaultValues: {
      username: 'admin',
      password: '123456',
    },
    async onSubmit({ value }) {
      await loginAction.mutateAsync(value)
      await router.invalidate()
      await navigate({ to: search.redirect || '/page' })
    },
  })

  return (
    <div>
      <form
        className=" mt-2 border-t flex flex-col"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="username"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>username:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  className=" border border-solid"
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </>
            )
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>password:</label>
                <input
                  className=" border border-solid"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </>
            )
          }}
        />

        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button type="reset" onClick={() => form.reset()}>
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  )
}
