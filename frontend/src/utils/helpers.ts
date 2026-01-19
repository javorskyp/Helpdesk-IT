import type { TicketStatus } from '../types';

// Mapowanie statusów z backendu na przyjazne nazwy
export const statusLabels: Record<TicketStatus, string> = {
  OPEN: 'Otwarte',
  IN_PROGRESS: 'W trakcie',
  CLOSED: 'Zamknięte',
};

// Mapowanie statusów na klasy CSS
export const statusClassNames: Record<TicketStatus, string> = {
  OPEN: 'otwarte',
  IN_PROGRESS: 'w-trakcie',
  CLOSED: 'zamknięte',
};

// Formatowanie daty
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL');
}

// Formatowanie rozmiaru pliku
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Mapowanie priorytetów (jeśli backend będzie je wspierał w przyszłości)
export const priorityLabels = {
  HIGH: 'Wysoki',
  MEDIUM: 'Średni',
  LOW: 'Niski',
};
