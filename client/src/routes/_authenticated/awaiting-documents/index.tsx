import { Table } from '@/components/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/awaiting-documents/')({
  component: AwaitingDocuments,
});

function AwaitingDocuments() {
  return (
    <div id="awaiting-documents">
      <h3 className="mb-8 text-3xl font-light">
        Approval Awaiting Documents
      </h3>
      <Table
        searchPlaceholder="Search new or Updated Contents, Knowledge or Artifacts"
        data={[]}
        columns={[]}
      />
    </div>
  );
}
