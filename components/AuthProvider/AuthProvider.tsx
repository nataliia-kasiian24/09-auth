'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';
import { Loader } from '@/components/Loader/Loader'; 

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChecking, setIsChecking] = useState(true);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await clientApi.checkSession();
        setAuth(user);
      } catch (error: unknown) {
  setAuth(null);
  console.error('Session check failed:', error); 
} finally {
        setIsChecking(false);
      }
    };
    initAuth();
  }, [setAuth]);

  if (isChecking) return <Loader />;

  return <>{children}</>;
};