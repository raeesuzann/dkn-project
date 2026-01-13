import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_public')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }).parse,
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/dashboard' });
    }
  },
  component: () => (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  ),
});
