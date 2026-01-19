import { useState, useEffect } from "react";
import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";
import { ticketService } from "../services/ticketService";
import { statusLabels, statusClassNames } from "../utils/helpers";
import type { Ticket } from "../types";
import "../styles/dashboard.css";
import "../styles/tickets.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await ticketService.listCurrentUserTickets();
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

  // Pobierz ostatnie 3 zgłoszenia
  const recentTickets = tickets.slice(0, 3);

  return (
    <UserLayout>
      <div className="dashboard-header">
        <h1>Moje zgłoszenia</h1>
        <p>Dodawaj nowe zgłoszenia i sprawdzaj ich status</p>
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
      {recentTickets.length > 0 && (
        <>
          <h2 className="section-title">Ostatnie zgłoszenia</h2>
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
        </>
      )}

      <button
        className="primary-btn"
        onClick={() => navigate("/user/new")}
        style={{ marginTop: "2rem" }}
      >
        + Nowe zgłoszenie
      </button>
    </UserLayout>
  );
}
