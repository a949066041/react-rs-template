import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '~/api'
import { queryClient } from '~/store'

export const Route = createFileRoute('/posts/$id')({
  component: RouteComponent,
  loader({ params: { id } }) {
    return queryClient.ensureQueryData(userQueryOptions(+id))
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(userQueryOptions(+id))
  return (
    <div>
      data：
      {' '}
      { JSON.stringify(data) }
    </div>
  )
}
