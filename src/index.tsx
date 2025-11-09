import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import App from './App'
import { queryClient } from './store'
import './setup'
import './style/index.css'

if (typeof window !== 'undefined') {
  scan({
    enabled: import.meta.env.DEV,
    log: false, // logs render info to console (default: false)
  })
}

if (import.meta.env.PUBLIC_CONSOLE === '1') {
  // @ts-expect-error error VConsole is not a constructor
  // eslint-disable-next-line no-new
  new VConsole()
}

function bootstrap() {
  const rootEl = document.getElementById('root')
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StrictMode>,
    )
  }
}

bootstrap()
