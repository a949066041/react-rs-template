import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '~/api'

export const Route = createFileRoute('/user/$id')({
  component: RouteComponent,
  loader({ params: { id }, context: { queryClient } }) {
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
