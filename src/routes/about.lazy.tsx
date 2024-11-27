import { createLazyFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { useCountStore } from '~/store'

export const Route = createLazyFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  const { count, increment, decrement } = useCountStore()

  return (
    <div>
      <span className="mr-2 text-3xl text-red-300">
        this is count
        {count}
        <div className="icon-[unjs--nitro] h-1em w-1em"></div>
      </span>
      <button onClick={() => increment(1)} className=" mx-2" type="button">click add</button>
      <button onClick={() => decrement(1)} type="button">click sub</button>
    </div>
  )
}
