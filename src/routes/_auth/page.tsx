import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/page"!</div>
}
