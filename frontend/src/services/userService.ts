import { fetchWithAuth } from './api';
import type { 
  User, 
  LoginUserRequest, 
  RegisterUserRequest, 
  AccessToken 
} from '../types';
import { API_BASE_URL } from '../config/api';

export const userService = {
  // Rejestracja użytkownika
  async register(data: RegisterUserRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }
  },

  // Logowanie użytkownika
  async login(data: LoginUserRequest): Promise<AccessToken> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ważne dla ciasteczek
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }

    const accessToken: AccessToken = await response.json();
    localStorage.setItem('accessToken', accessToken.jwt);
    return accessToken;
  },

  // Wylogowanie użytkownika
  async logout(): Promise<void> {
    const response = await fetchWithAuth('/users/token/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    localStorage.removeItem('accessToken');
  },

  // Pobierz dane aktualnego użytkownika
  async getCurrentUser(): Promise<User> {
    const response = await fetchWithAuth('/users/current');

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  },

  // Sprawdź czy użytkownik jest zalogowany
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};
