import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { userQueryListOptions } from '~/api'
import { queryClient } from '~/store'

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
  loader() {
    return queryClient.ensureQueryData(userQueryListOptions)
  },
})

function RouteComponent() {
  const { data, isLoading } = useSuspenseQuery(userQueryListOptions)

  if (isLoading) {
    return (
      <span>
        loading...
      </span>
    )
  }

  return (
    <div className=" space-x-3 ">
      <ul className=" w-1/3 bg-green-300 px-2 rounded-lg">
        {
          data.users.map(item => (
            <li key={item.id}>
              <Link to="/posts/$id" className=" flex items-center" params={{ id: item.id }}>
                { `${item.firstName} ${item.lastName}` }
                <span className="icon-[maki--arrow] ml-2"></span>
              </Link>
            </li>
          ))
        }
      </ul>
      <Outlet />
    </div>
  )
}
