import { createTheme, MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import App from './App'
import { queryClient } from './store'
import './setup'
import './style/index.css'

const theme = createTheme({
  colors: {
    myColor: [
      '#e1f8ff',
      '#cbedff',
      '#9ad7ff',
      '#64c1ff',
      '#3aaefe',
      '#20a2fe',
      '#099cff',
      '#0088e4',
      '#0079cd',
      '#0068b6',
    ],
  },
})

if (typeof window !== 'undefined') {
  scan({
    enabled: false,
    log: false, // logs render info to console (default: false)
  })
}

function bootstrap() {
  const rootEl = document.getElementById('root')
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MantineProvider>,
    )
  }
}

bootstrap()
