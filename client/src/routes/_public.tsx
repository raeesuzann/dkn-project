import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  validateSearch: (search) => ({
    redirect:
      typeof search.redirect === 'string' ? search.redirect : '/dashboard',
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: () => (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  ),
});
