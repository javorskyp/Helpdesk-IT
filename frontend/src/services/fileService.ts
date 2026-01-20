import { fetchWithAuth } from './api';
import type { FileUploadResponse } from '../types';
import { API_BASE_URL } from '../config/api';

export const fileService = {
  // Prześlij plik do zgłoszenia
  async uploadFile(ticketId: number, file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('ticketId', ticketId.toString());
    formData.append('file', file);

    const response = await fetchWithAuth('/files', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to upload file');
    }

    return response.json();
  },

  // Otwórz plik w przeglądarce
  async downloadFile(fileId: string, filename: string): Promise<void> {
    try {
      console.log('Opening file:', fileId, filename);
      const response = await fetchWithAuth(`/files/${fileId}`);

      if (!response.ok) {
        throw new Error('Failed to load file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Otwórz w nowej karcie
      const newWindow = window.open(url, '_blank');
      
      // Zwolnij URL po krótkim opóźnieniu (daj czas przeglądarce na załadowanie)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
      
      if (!newWindow) {
        alert('Zablokowano wyskakujące okno. Sprawdź ustawienia przeglądarki.');
      }
      
      console.log('File opened successfully');
    } catch (error) {
      console.error('Error opening file:', error);
      alert('Nie udało się otworzyć pliku');
    }
  },
};
