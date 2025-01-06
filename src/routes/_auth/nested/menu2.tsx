import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/nested/menu2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/nested/menu2"!</div>
}
