// Typy danych używane w aplikacji

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface TicketComment {
  id: number;
  content: string;
  authorEmail: string;
  createdAt: string;
}

export interface TicketAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  rating?: number;
  comments: TicketComment[];
  attachments: TicketAttachment[];
}

export interface CreateTicketRequest {
  title: string;
  description: string;
}

export interface AddCommentRequest {
  content: string;
}

export interface UpdateTicketStatusRequest {
  status: TicketStatus;
}

export interface TicketRatingRequest {
  rating: number;
}

export interface User {
  email: string;
  role: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface AccessToken {
  jwt: string;
  expirationInMs: number;
}

export interface FileUploadResponse {
  fileId: string;
  filename: string;
  contentType: string;
  size: number;
}
