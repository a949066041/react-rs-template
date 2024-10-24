import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <NavLink to="/about" className="mr-2">about</NavLink>
      this is Home page
    </div>
  )
}

export default Home
