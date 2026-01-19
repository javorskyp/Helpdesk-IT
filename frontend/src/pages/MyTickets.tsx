import { useState, useEffect } from "react";
import UserLayout from "../components/UserLayout";
import TicketDetailsModal from "../components/TicketDetailsModal";
import { ticketService } from "../services/ticketService";
import { statusLabels, statusClassNames } from "../utils/helpers";
import type { Ticket } from "../types";
import "../styles/tickets.css";

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await ticketService.listCurrentUserTickets();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Błąd podczas ładowania zgłoszeń");
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = async (ticket: Ticket) => {
    try {
      // Pobierz pełne szczegóły zgłoszenia
      const fullTicket = await ticketService.getTicket(ticket.id);
      setSelected(fullTicket);
    } catch (err: any) {
      setError(err.message || "Błąd podczas ładowania szczegółów zgłoszenia");
    }
  };

  return (
    <UserLayout>
      <div className="tickets-header">
        <h1>Moje zgłoszenia</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Ładowanie zgłoszeń...</div>
      ) : tickets.length === 0 ? (
        <div className="empty-message">Nie masz jeszcze żadnych zgłoszeń</div>
      ) : (
        <div className="tickets-table">
          <div className="table-head">
            <span>ID</span>
            <span>Tytuł</span>
            <span>Status</span>
            <span>Ocena</span>
            <span></span>
          </div>

          {tickets.map((t) => (
            <div
              key={t.id}
              className="table-row"
              onClick={() => handleTicketClick(t)}
            >
              <span>#{t.id}</span>
              <span className="ticket-title">{t.title}</span>
              <span className={`status ${statusClassNames[t.status]}`}>
                {statusLabels[t.status]}
              </span>
              <span>{t.rating ? `⭐ ${t.rating}/5` : "-"}</span>
              <span className="row-action">›</span>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <TicketDetailsModal
          ticket={selected}
          onClose={() => setSelected(null)}
          onUpdate={loadTickets}
        />
      )}
    </UserLayout>
  );
}