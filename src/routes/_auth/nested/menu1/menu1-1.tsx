import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/nested/menu1/menu1-1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/nested/menu1/menu1-1"!</div>
}
