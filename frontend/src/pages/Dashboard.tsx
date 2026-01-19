import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { ticketService } from "../services/ticketService";
import { statusLabels, statusClassNames } from "../utils/helpers";
import type { Ticket } from "../types";
import "../styles/dashboard.css";
import "../styles/tickets.css";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await ticketService.listAllTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Oblicz statystyki
  const allCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressCount = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const closedCount = tickets.filter((t) => t.status === "CLOSED").length;

  // Pobierz ostatnie 5 zgłoszeń
  const recentTickets = tickets.slice(0, 5);

  return (
    <AppLayout>
      <div className="dashboard-header">
        <h1>Witaj 👋</h1>
        <p>Oto podsumowanie zgłoszeń w systemie</p>
      </div>

      {/* statystyki */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Wszystkie zgłoszenia</h3>
          <span>{loading ? "..." : allCount}</span>
        </div>
        <div className="stat-card">
          <h3>Otwarte</h3>
          <span>{loading ? "..." : openCount}</span>
        </div>
        <div className="stat-card">
          <h3>W trakcie</h3>
          <span>{loading ? "..." : inProgressCount}</span>
        </div>
        <div className="stat-card">
          <h3>Zamknięte</h3>
          <span>{loading ? "..." : closedCount}</span>
        </div>
      </div>

      {/* ostatnie zgłoszenia */}
      <h2 className="section-title">Ostatnie zgłoszenia</h2>

      {loading ? (
        <div className="loading-message">Ładowanie...</div>
      ) : recentTickets.length === 0 ? (
        <div className="empty-message">Brak zgłoszeń</div>
      ) : (
        <div className="ticket-list">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <span>{ticket.title}</span>
              <span className={`status ${statusClassNames[ticket.status]}`}>
                {statusLabels[ticket.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
