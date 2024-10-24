import { NavLink } from 'react-router-dom'
import { Button } from '~/components/ui/button'

function Home() {
  return (
    <div>
      <NavLink to="/about" className="mr-2">about</NavLink>
      <Button variant="outline">Button</Button>
    </div>
  )
}

export default Home
