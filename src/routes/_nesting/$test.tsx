import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nesting/$test')({
  component: RouteComponent,
})

function RouteComponent() {
  const { test } = Route.useParams()

  return (
    <div>
      Hello "/_nesting/ 参数：
      {test}
      "!
    </div>
  )
}
