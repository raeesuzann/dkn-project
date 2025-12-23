import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/leaderboard')({
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <div id="leaderboard">
      Leaderboard / Frequently Accessed Content List / Top Contributors
    </div>
  );
}
