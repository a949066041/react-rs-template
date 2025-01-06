import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/system/role/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/system/role/"!</div>
}
