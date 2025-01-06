import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/system/user/')({
  component: RouteComponent,
  beforeLoad({ context }) {
    console.log(context)
  },
})

function RouteComponent() {
  return (
    <div>
      Hello "/_auth/system/user/"!
      { isDev }
    </div>
  )
}
