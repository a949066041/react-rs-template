import { NavLink } from 'react-router-dom'
import { useCountStore } from '~/store'

function About() {
  const { count, increment, decrement } = useCountStore()

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <NavLink to="/">home</NavLink>
      <div className="flex items-center">
        <span className="mr-2 text-3xl text-red-300">
          hello template
          { count }
        </span>
        <div className="icon-[tabler--alarm-average] h-1em w-1em"></div>
        <button onClick={() => increment(1)} type="button">click me</button>
        <button onClick={() => decrement(1)} type="button">click me2</button>
      </div>
    </div>
  )
}

export default About
