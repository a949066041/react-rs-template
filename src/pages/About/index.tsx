import { Button } from '~/components/ui/button.tsx'
import { useCountStore } from '~/store'

function About() {
  const { count, increment, decrement } = useCountStore()

  return (
    <div>
      <span className="mr-2 text-3xl text-red-300">
        this is count
        {count}
        <div className="icon-[tabler--alarm-average] h-1em w-1em"></div>
      </span>
      <Button onClick={() => increment(1)} className=" mx-2" type="button">click add</Button>
      <Button onClick={() => decrement(1)} type="button">click sub</Button>
    </div>
  )
}

export default About
