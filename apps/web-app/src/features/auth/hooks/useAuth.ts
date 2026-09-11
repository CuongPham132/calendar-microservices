import { useState } from 'react';
import { login, type LoginCredentials } from '../services/authService';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const signIn = async (credentials: LoginCredentials) => {
    const nextToken = await login(credentials);
    localStorage.setItem('token', nextToken);
    setToken(nextToken);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, signIn, signOut };
}