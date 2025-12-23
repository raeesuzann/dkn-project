import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user-management/')({
  component: UserManagement,
})

function UserManagement() {
  return <div>Hello "/_authenticated/user-management/"!</div>
}
