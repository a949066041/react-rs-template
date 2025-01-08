import { Box, LoadingOverlay } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { createFileRoute } from '@tanstack/react-router'
import clx from 'classix'
import svgjson from '~~/assets/svg.json'

const iconList = Object.keys(svgjson.icons)

export const Route = createFileRoute('/_auth/nested/menu2')({
  component: RouteComponent,
})

function RouteComponent() {
  const { copy, copied } = useClipboard({ timeout: 200 })

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={copied}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <div className=" grid grid-cols-12">
        {iconList.map(item => (
          <div
            key={item}
            className=" w-full h-10 flex justify-center items-center"
            onClick={() => copy(item)}
          >
            <i
              className={clx(
                `icon-[custom--${item}]`,
                ' text-xl hover:text-blue-500 hover:scale-150 transition-all cursor-pointer',
              )}
            />
          </div>
        ))}
      </div>
    </Box>
  )
}
