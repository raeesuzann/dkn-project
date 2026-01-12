import { FrequentlyAccessedContents } from '@/components/chart/frequently_accessed_contents';
import { TopContributors } from '@/components/chart/top_contributors.chart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/leaderboard')({
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <div id="leaderboard" className="w-full h-full">
      <h3 className="mb-8 text-3xl font-light">Leaderboard</h3>
      <div className="flex gap-10 w-full">
        <div
          id="frequentlyAccessedContents"
          className="bg-white p-3 rounded-lg shadow w-1/2"
        >
          <FrequentlyAccessedContents />
        </div>
        <div
          id="top-contributors"
          className="bg-white p-3 rounded-lg shadow w-1/2"
        >
          <TopContributors />
        </div>
      </div>
    </div>
  );
}
