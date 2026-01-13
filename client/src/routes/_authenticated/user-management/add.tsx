import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user-management/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/user-management/add"!</div>
}
