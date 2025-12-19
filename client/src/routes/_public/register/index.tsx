import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/register/')({
  component: Register,
})

function Register() {
  return <div>Hello "/register/"!</div>
}
