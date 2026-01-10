import Loading from '@/components/ui/loading';
import { useNavigate } from '@tanstack/react-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Validate token with your API
      fetch('/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData.valid) {
            setUser(userData.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('auth-token');
          }
        })
        .catch(() => {
          localStorage.removeItem('auth-token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  }, []);

  // Show loading state while checking auth
  if (isLoading) return <Loading />;

  const login = async (username: string, password: string) => {
    // const response = await api.post('/login', { username, password });

    setIsAuthenticated(true);
    navigate({ to: '/dashboard' });
    // if (response.data) {
    //   setUser(response.data);
    //   setIsAuthenticated(true);
    //   // Store token for persistence
    //   localStorage.setItem('auth-token', response.data.token);
    // } else {
    //   throw new Error('Authentication failed');
    // }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth-token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
