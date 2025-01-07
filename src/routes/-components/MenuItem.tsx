import type { MenuTree } from '~/api'
import { NavLink } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'

interface IMenuItemProps {
  data: MenuTree
  activeIds: string[]
}

function MenuItem({
  data,
  activeIds,
}: IMenuItemProps) {
  const navigate = useNavigate()
  return (
    <NavLink
      key={data.id}
      label={data.data.title}
      leftSection={data.data.icon && <i className={data.data.icon} />}
      defaultOpened={activeIds.includes(data.id)}
      active={activeIds.includes(data.id)}
      onClick={() => !data.children && navigate({ to: data.data.component! })}
    >
      {data.children?.map(item => (
        <MenuItem key={item.id} data={item} activeIds={activeIds} />
      ))}
    </NavLink>
  )
}

export default MenuItem
