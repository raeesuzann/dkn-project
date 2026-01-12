import { Table } from '@/components/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/contents/')({
  component: ContentList,
});

function ContentList() {
  return (
    <div id="contents">
      <h3 className="mb-8 text-3xl font-light">Contents</h3>
      <Table
        searchPlaceholder="Search Contents, Knowledge or Artifacts"
        actions={<button>Add</button>}
        data={[]}
        columns={[]}
      />
    </div>
  );
}
