import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/contents/')({
  component: ContentList,
})

function ContentList() {
  return <div>All contents / Knowledge / Frameworks List</div>
}
