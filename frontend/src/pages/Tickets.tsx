import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import TicketModal from "../components/TicketModal";
import { ticketService } from "../services/ticketService";
import { statusLabels, statusClassNames } from "../utils/helpers";
import type { Ticket } from "../types";
import "../styles/tickets.css";

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pobierz listę zgłoszeń przy pierwszym załadowaniu
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await ticketService.listAllTickets();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Błąd podczas ładowania zgłoszeń");
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = async (ticket: Ticket) => {
    try {
      // Pobierz pełne szczegóły zgłoszenia (z komentarzami i załącznikami)
      const fullTicket = await ticketService.getTicket(ticket.id);
      setSelectedTicket(fullTicket);
    } catch (err: any) {
      setError(err.message || "Błąd podczas ładowania szczegółów zgłoszenia");
    }
  };

  return (
    <AppLayout>
      {/* HEADER */}
      <div className="tickets-header">
        <div>
          <h1>Zgłoszenia</h1>
          <p>Lista zgłoszeń serwisowych</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/tickets/new")}
        >
          + Nowe zgłoszenie
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Ładowanie zgłoszeń...</div>
      ) : tickets.length === 0 ? (
        <div className="empty-message">Brak zgłoszeń</div>
      ) : (
        <>
          {/* TABLE */}
          <div className="tickets-table">
            <div className="table-head">
              <span>ID</span>
              <span>Tytuł</span>
              <span>Status</span>
              <span>Ocena</span>
              <span></span>
            </div>

            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="table-row"
                onClick={() => handleTicketClick(ticket)}
              >
                <span>#{ticket.id}</span>
                <span className="ticket-title">{ticket.title}</span>

                <span className={`status ${statusClassNames[ticket.status]}`}>
                  {statusLabels[ticket.status]}
                </span>

                <span>{ticket.rating ? `⭐ ${ticket.rating}/5` : "-"}</span>
                <span className="row-action">›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={async (updateData) => {
            try {
              // Zaktualizuj status zgłoszenia
              await ticketService.updateStatus(selectedTicket.id, {
                status: updateData.status,
              });

              // Dodaj komentarz jeśli został podany
              if (updateData.note) {
                await ticketService.addComment(selectedTicket.id, {
                  content: updateData.note,
                });
              }

              // Odśwież listę zgłoszeń
              await loadTickets();
              setSelectedTicket(null);
            } catch (err: any) {
              setError(err.message || "Błąd podczas aktualizacji zgłoszenia");
            }
          }}
          onDelete={undefined} // Admin nie może usuwać zgłoszeń
        />
      )}
    </AppLayout>
  );
}


