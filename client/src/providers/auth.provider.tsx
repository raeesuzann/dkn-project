import Loading from '@/components/ui/loading';
import { api } from '@/lib/axios/config';
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const results = await api.get('/auth/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (results.data.data) {
          setUser(results.data.data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  // Show loading state while checking auth
  if (isLoading) return <Loading />;

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });

    if (response.data) {
      setIsAuthenticated(true);
      // Store token for persistence
      localStorage.setItem('token', response.data.data);
    } else {
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
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
