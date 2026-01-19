import { fetchWithAuth } from './api';
import type {
  Ticket,
  CreateTicketRequest,
  AddCommentRequest,
  UpdateTicketStatusRequest,
  TicketRatingRequest,
} from '../types';

export const ticketService = {
  // Utwórz nowe zgłoszenie
  async createTicket(data: CreateTicketRequest): Promise<Ticket> {
    const response = await fetchWithAuth('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to create ticket');
    }

    return response.json();
  },

  // Pobierz wszystkie zgłoszenia (dla admina)
  async listAllTickets(): Promise<Ticket[]> {
    const response = await fetchWithAuth('/tickets');

    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }

    return response.json();
  },

  // Pobierz zgłoszenia aktualnego użytkownika
  async listCurrentUserTickets(): Promise<Ticket[]> {
    const response = await fetchWithAuth('/tickets/current');

    if (!response.ok) {
      throw new Error('Failed to fetch user tickets');
    }

    return response.json();
  },

  // Pobierz szczegóły zgłoszenia
  async getTicket(ticketId: number): Promise<Ticket> {
    const response = await fetchWithAuth(`/tickets/${ticketId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }

    return response.json();
  },

  // Dodaj komentarz do zgłoszenia
  async addComment(ticketId: number, data: AddCommentRequest): Promise<Ticket> {
    const response = await fetchWithAuth(`/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to add comment');
    }

    return response.json();
  },

  // Zaktualizuj status zgłoszenia
  async updateStatus(ticketId: number, data: UpdateTicketStatusRequest): Promise<Ticket> {
    const response = await fetchWithAuth(`/tickets/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to update status');
    }

    return response.json();
  },

  // Dodaj ocenę do zgłoszenia
  async addRating(ticketId: number, data: TicketRatingRequest): Promise<Ticket> {
    const response = await fetchWithAuth(`/tickets/${ticketId}/rating`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to add rating');
    }

    return response.json();
  },
};
