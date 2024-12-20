import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App'
import { queryClient } from './store'
import './style/index.css'

function bootstrap() {
  const rootEl = document.getElementById('root')
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    )
  }
}

bootstrap()
