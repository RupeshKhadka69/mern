// authProvider.tsx
"use client"
// authProvider.tsx
// authProvider.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, getUserProfile, logoutUser } from '@/app/api/api';
import Cookies from 'js-cookie';
import { useQueryClient } from 'react-query';
export interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
//  const queryClient  = useQueryClient()
  useEffect(() => {
    const token = Cookies.get('jwtauth');
    if (token) {
      getUserProfile()
        .then((res) => setUser(res.data.user))
        .catch(() => {
          setUser(null);
          router.push('/user/register');
        });
    }
  }, [router]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await loginUser(credentials);
      setUser(res.data.user);
      router.push('/user/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow error to handle in components
    }
  };

  const logout = async () => {
    await logoutUser();
    console.log('Logout successful'); // Log logout success
    setUser(null);
    router.push('/');
    // queryClient.invalidateQueries();
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
