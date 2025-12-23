import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports')({
  component: Reports,
})

function Reports() {
  return <div>Hello "/_authenticated/reports"!</div>
}
