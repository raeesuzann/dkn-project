import { HorizontalBarChart } from '@/components/chart/horizontal.barchart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-6">
      <h3 className="mb-8 text-3xl font-semibold">Dashboard</h3>

      <div id="content-summary" className="bg-white p-3 rounded-lg shadow">
        <HorizontalBarChart />
      </div>
    </div>
  );
}
