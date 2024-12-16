import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/layout-test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/layout/ test"!</div>
}
