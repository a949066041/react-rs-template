import { createFileRoute } from '@tanstack/react-router'
import clx from 'classix'
import svgjson from '~~/assets/svg.json'

const iconList = Object.keys(svgjson.icons)

export const Route = createFileRoute('/_auth/nested/menu2')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className=" grid grid-cols-12">
      {iconList.map(item => (
        <div
          key={item}
          className=" w-full h-10 flex justify-center items-center"
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
  )
}
