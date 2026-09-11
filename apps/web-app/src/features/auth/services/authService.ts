import { api } from '../../../api/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<string> {
  const response = await api.post('/auth/login', credentials);
  return response.data.token;
}