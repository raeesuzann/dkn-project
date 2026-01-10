import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
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
  ),
});
