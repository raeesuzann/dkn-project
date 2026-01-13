import { Table } from '@/components/table';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/reports/')({
  component: Reports,
});

function Reports() {
  const navigate = useNavigate();
  return (
    <div id="reports">
      <h3 className="mb-8 text-3xl font-light">Reports</h3>
      <Table
        searchPlaceholder="Search Reports"
        data={[]}
        columns={[]}
        actions={
          <button
            className="bg-gray-700 text-white"
            onClick={() => navigate({ to: '/reports/generate' })}
          >
            Generate
          </button>
        }
      />
    </div>
  );
}
