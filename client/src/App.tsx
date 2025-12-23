import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './providers/auth.provider';
import { routeTree } from './routeTree.gen';
import { GlobalProvider } from './providers/global.provider';

const router = createRouter({
  routeTree,
  context: {
    // auth will be passed down from App component
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <InnerApp />
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
