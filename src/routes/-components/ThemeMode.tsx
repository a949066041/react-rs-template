import { useMantineColorScheme } from '@mantine/core'

function ThemeMode() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  return (
    <i
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      className=" dark:icon-[circum--light] icon-[circum--dark] border cursor-pointer text-4xl"
    />
  )
}

export default ThemeMode
