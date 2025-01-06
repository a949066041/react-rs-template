import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/nested/menu1/menu1-2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/nested/menu1/menu1-2"!</div>
}
