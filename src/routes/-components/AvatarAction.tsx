import { Avatar, Menu } from '@mantine/core'
import { useAuthStore } from '~/store'

function AvatarAction() {
  const { userInfo, logoutUser } = useAuthStore()

  if (!userInfo) {
    return null
  }

  return (
    <Menu shadow="md" width={120}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl" className=" cursor-pointer">
          { userInfo.nickName?.slice(0, 1) }
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>用户</Menu.Label>
        <Menu.Item
          leftSection={<i className="icon-[uil--setting]" />}
        >
          系统设置
        </Menu.Item>
        <Menu.Item
          leftSection={<i className="icon-[mage--message-dots]" />}
        >
          系统消息
        </Menu.Item>
        <Menu.Item leftSection={<i className="icon-[charm--person]" />}>
          个人信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>操作</Menu.Label>
        <Menu.Item leftSection={<i className="icon-[majesticons--share-line]" />}>
          功能反馈
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={logoutUser}
          leftSection={<i className="icon-[material-symbols--logout]" />}
        >
          退出登录
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default AvatarAction
