import { HorizontalBarChart } from '@/components/chart/horizontal.barchart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div id="dashboard">
      <h3 className="mb-8 text-3xl font-light">Dashboard</h3>

      <div id="content-summary" className="bg-gray-200 p-3 rounded-lg shadow">
        <HorizontalBarChart />
      </div>
    </div>
  );
}
