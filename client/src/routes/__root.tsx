import type { AuthState } from '@/providers/auth.provider';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ToastContainer } from 'react-toastify';

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <ToastContainer />
        <TanStackRouterDevtools />
      </>
    );
  },
});
