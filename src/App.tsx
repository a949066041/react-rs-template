import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '~/components/ui/button'
import { router } from '~/router'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Button variant="link" asChild>
        <Link to="/">react query</Link>
      </Button>
      <Button asChild variant="link">
        <Link to="/about">
          zus state
        </Link>
      </Button>
      <Outlet />
      <TanStackRouterDevtools router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
