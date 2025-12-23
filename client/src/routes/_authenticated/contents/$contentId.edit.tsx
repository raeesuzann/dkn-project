import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/contents/$contentId/edit',
)({
  component: ContentEdit,
})

function ContentEdit() {
  return <div>Hello "/_authenticated/contents/$contentId/edit"!</div>
}
