import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/system/menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/system/menu/"!</div>
}
