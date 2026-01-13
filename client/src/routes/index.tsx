import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      throw redirect({
        to: '/login',
      });
    } else {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: () => <Outlet />,
});
