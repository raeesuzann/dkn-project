import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/dashboard',
  }),
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: () => <Outlet />,
});
