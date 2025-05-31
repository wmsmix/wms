"use client";

import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  username: string;
  role: string;
  loginTime: number;
}

interface StoredAuthData {
  id: string;
  username: string;
  role: string;
  loginTime: number;
}

function isValidAuthData(data: unknown): data is StoredAuthData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as StoredAuthData).id === 'string' &&
    typeof (data as StoredAuthData).username === 'string' &&
    typeof (data as StoredAuthData).role === 'string' &&
    typeof (data as StoredAuthData).loginTime === 'number'
  );
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('cms_auth');
      if (authData) {
        const userData: unknown = JSON.parse(authData);

        if (isValidAuthData(userData)) {
          // Check if login is still valid (24 hours)
          const loginAge = Date.now() - userData.loginTime;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          if (loginAge < maxAge) {
            setUser(userData);
          } else {
            // Login expired, clear it
            localStorage.removeItem('cms_auth');
            setUser(null);
          }
        } else {
          // Invalid data format, clear it
          localStorage.removeItem('cms_auth');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('cms_auth');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cms_auth');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    checkAuth
  };
}
