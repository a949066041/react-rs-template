import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useAuthStore } from '~/store'

export const Route = createFileRoute('/_auth/page')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userInfo, logoutUser } = useAuthStore()
  const router = useRouter()

  async function logoutAction() {
    await logoutUser()

    await router.invalidate()
  }

  return (
    <div>
      Hello "/_auth/page"
      { JSON.stringify(userInfo) }
      <button type="button" onClick={logoutAction}>logout</button>
    </div>
  )
}
