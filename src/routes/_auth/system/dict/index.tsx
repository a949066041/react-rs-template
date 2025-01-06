import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/system/dict/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/system/dict/"!</div>
}
