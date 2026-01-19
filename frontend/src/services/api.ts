import { API_BASE_URL } from '../config/api';

// Funkcja pomocnicza do wykonywania requestów z automatycznym dodawaniem tokena
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Dodaj token jeśli istnieje
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Dodaj Content-Type jeśli body nie jest FormData
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include', // Ważne dla ciasteczek (refresh token)
  });

  // Jeśli 401 (Unauthorized), możemy spróbować odświeżyć token
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Spróbuj ponownie z nowym tokenem
      const newToken = localStorage.getItem('accessToken');
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
      }
      return fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      // Przekieruj do logowania
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
  }

  return response;
}

// Odświeżanie tokena dostępu
async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/token/refreshToken`, {
      method: 'POST',
      credentials: 'include', // Ważne dla ciasteczek z refresh tokenem
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.jwt);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
}

export { fetchWithAuth, refreshAccessToken };
