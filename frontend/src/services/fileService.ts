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

  // Pobierz URL do pobrania pliku
  getDownloadUrl(fileId: string): string {
    const token = localStorage.getItem('accessToken');
    return `${API_BASE_URL}/files/${fileId}${token ? `?token=${token}` : ''}`;
  },

  // Pobierz plik
  async downloadFile(fileId: string): Promise<Blob> {
    const response = await fetchWithAuth(`/files/${fileId}`);

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    return response.blob();
  },
};
