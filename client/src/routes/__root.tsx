import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            <div className="px-3 py-2 grow">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
