import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>123home page</div>
}
