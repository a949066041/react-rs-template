import { MultiSelect } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { DictProvider, useDict } from '~/routes/-components/dict'

export const Route = createFileRoute('/_auth/system/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data = [] } = useDict<boolean>({ transform: 'boolean', dict: 'user_status' })

  return (
    <div>
      <DictProvider<string> dict="sex_status">
        {
          ({ data }) => (
            <>
              <MultiSelect
                maxValues={1}
                pointer={false}
                placeholder="please choose value"
                data={data}
              />
              { JSON.stringify(data) }
            </>
          )
        }
      </DictProvider>
      { JSON.stringify(data) }
    </div>
  )
}
