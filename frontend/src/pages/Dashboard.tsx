import AppLayout from "../components/AppLayout";
import "../styles/dashboard.css";
import "../styles/tickets.css"; // 🔴 KLUCZOWE – kolory statusów

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="dashboard-header">
        <h1>Witaj 👋</h1>
        <p>Oto podsumowanie Twoich zgłoszeń</p>
      </div>

      {/* statystyki */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Wszystkie zgłoszenia</h3>
          <span>14</span>
        </div>
        <div className="stat-card">
          <h3>Otwarte</h3>
          <span>6</span>
        </div>
        <div className="stat-card">
          <h3>W trakcie</h3>
          <span>6</span>
        </div>
        <div className="stat-card">
          <h3>Zamknięte</h3>
          <span>2</span>
        </div>
      </div>

      {/* ostatnie zgłoszenia */}
      <h2 className="section-title">Ostatnie zgłoszenia</h2>

      <div className="ticket-list">
        <div className="ticket-item">
          <span>Brak dostępu do VPN</span>
          <span className="status w-trakcie">W trakcie</span>
        </div>

        <div className="ticket-item">
          <span>Problem z drukarką</span>
          <span className="status otwarte">Otwarte</span>
        </div>

        <div className="ticket-item">
          <span>Reset hasła</span>
          <span className="status zamknięte">Zamknięte</span>
        </div>
      </div>
    </AppLayout>
  );
}
