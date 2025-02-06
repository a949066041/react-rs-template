import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/icon')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/icon"!
    </div>
  )
}
