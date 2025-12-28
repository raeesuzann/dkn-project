import { Table } from '@/components/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/reports')({
  component: Reports,
});

function Reports() {
  return (
    <div id="reports">
      <h3 className="mb-8 text-3xl font-semibold">Reports</h3>
      <Table searchPlaceholder="Search Reports" data={[]} columns={[]} />
    </div>
  );
}
