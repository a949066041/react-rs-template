import { MultiSelect } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useDict } from '~/routes/-components/RenderDict'

export const Route = createFileRoute('/_auth/system/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data = [], isLoading } = useDict<string>('user_status', { transform: 'string' })

  if (isLoading) {
    return 'loading...'
  }

  return (
    <div>
      Hello "/_auth/system/user/"!
      <MultiSelect
        maxValues={1}
        pointer={false}
        placeholder="please choose value"
        data={data}
      />
      { JSON.stringify(data) }
    </div>
  )
}
