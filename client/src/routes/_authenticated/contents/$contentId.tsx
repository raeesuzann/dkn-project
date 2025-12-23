import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/contents/$contentId')({
  component: ContentDetails,
})

function ContentDetails() {
  return <div>Hello "/_authenticated/contents/$contentId"!</div>
}
