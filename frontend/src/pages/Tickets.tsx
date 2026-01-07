import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import TicketModal from "../components/TicketModal";
import "../styles/tickets.css";

type Status = "Otwarte" | "W trakcie" | "Zamknięte";
type Priority = "Wysoki" | "Średni" | "Niski";

type Ticket = {
  id: number;
  title: string;
  description: string;
  user: string;
  status: Status;
  priority: Priority;
  date: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "Brak dostępu do VPN",
    description: "Użytkownik nie może połączyć się z VPN spoza biura.",
    user: "Jan Kowalski",
    status: "W trakcie",
    priority: "Wysoki",
    date: "2026-01-02",
  },
  {
    id: 2,
    title: "Problem z drukarką HP",
    description: "Drukarka nie reaguje na polecenia wydruku.",
    user: "Anna Nowak",
    status: "Otwarte",
    priority: "Średni",
    date: "2026-01-01",
  },
  {
    id: 3,
    title: "Reset hasła do poczty",
    description: "Użytkownik zapomniał hasła do skrzynki e-mail.",
    user: "Piotr Zieliński",
    status: "Zamknięte",
    priority: "Niski",
    date: "2025-12-30",
  },
  {
    id: 4,
    title: "Nie działa Outlook",
    description: "Outlook nie uruchamia się po aktualizacji.",
    user: "Katarzyna Wiśniewska",
    status: "W trakcie",
    priority: "Wysoki",
    date: "2025-12-29",
  },
   {
  id: 5,
  title: "Nie działa dostęp do SharePoint",
  description: "Użytkownik otrzymuje błąd 403 przy próbie wejścia na SharePoint.",
  user: "Michał Lewandowski",
  status: "Otwarte",
  priority: "Wysoki",
  date: "2025-12-28",
},
{
  id: 6,
  title: "Zrywa połączenie Wi-Fi",
  description: "Połączenie Wi-Fi rozłącza się co kilka minut.",
  user: "Agnieszka Dąbrowska",
  status: "W trakcie",
  priority: "Średni",
  date: "2025-12-27",
},
{
  id: 7,
  title: "Nie działa kamera w Teams",
  description: "Kamera nie jest wykrywana podczas spotkań Teams.",
  user: "Tomasz Kamiński",
  status: "Zamknięte",
  priority: "Niski",
  date: "2025-12-26",
},
{
  id: 8,
  title: "Błąd aplikacji CRM",
  description: "Aplikacja CRM zamyka się przy próbie zapisu klienta.",
  user: "Natalia Kaczmarek",
  status: "W trakcie",
  priority: "Wysoki",
  date: "2025-12-25",
},
{
  id: 9,
  title: "Problem z drukowaniem PDF",
  description: "Dokumenty PDF drukują się bez treści.",
  user: "Paweł Piotrowski",
  status: "Otwarte",
  priority: "Średni",
  date: "2025-12-24",
},
{
  id: 10,
  title: "Brak dostępu do folderu sieciowego",
  description: "Folder sieciowy \\FINANSE jest niedostępny.",
  user: "Karolina Grabowska",
  status: "Otwarte",
  priority: "Średni",
  date: "2025-12-23",
},
{
  id: 11,
  title: "Aktualizacja Windows zawiesza się",
  description: "Aktualizacja zatrzymuje się na 35%.",
  user: "Łukasz Pawlak",
  status: "W trakcie",
  priority: "Średni",
  date: "2025-12-22",
},
{
  id: 12,
  title: "Nie działa mikrofon",
  description: "Mikrofon nie jest wykrywany w systemie.",
  user: "Magdalena Król",
  status: "Otwarte",
  priority: "Niski",
  date: "2025-12-21",
},
{
  id: 13,
  title: "Problem z synchronizacją OneDrive",
  description: "Pliki nie synchronizują się z chmurą.",
  user: "Rafał Wieczorek",
  status: "W trakcie",
  priority: "Średni",
  date: "2025-12-20",
},
{
  id: 14,
  title: "Nie działa logowanie do Jira",
  description: "Użytkownik nie może zalogować się do Jira.",
  user: "Dominika Wójcik",
  status: "Otwarte",
  priority: "Wysoki",
  date: "2025-12-19",
}

];

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

      {/* TABLE */}
      <div className="tickets-table">
        <div className="table-head">
          <span>ID</span>
          <span>Tytuł</span>
          <span>Użytkownik</span>
          <span>Priorytet</span>
          <span>Status</span>
          <span>Data</span>
          <span></span>
        </div>

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="table-row"
            onClick={() => setSelectedTicket(ticket)}
          >
            <span>#{ticket.id}</span>
            <span className="ticket-title">{ticket.title}</span>
            <span className="ticket-user">{ticket.user}</span>

            <span className={`priority ${ticket.priority.toLowerCase()}`}>
              {ticket.priority}
            </span>

            <span
              className={`status ${ticket.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {ticket.status}
            </span>

            <span>{ticket.date}</span>
            <span className="row-action">›</span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={({ status, priority, note }) => {
            setTickets((prev) =>
              prev.map((t) =>
                t.id === selectedTicket.id
                  ? { ...t, status, priority }
                  : t
              )
            );
            console.log("Komentarz:", note);
            setSelectedTicket(null);
          }}
          onDelete={() => {
            if (confirm("Czy na pewno chcesz usunąć to zgłoszenie?")) {
              setTickets((prev) =>
                prev.filter((t) => t.id !== selectedTicket.id)
              );
              setSelectedTicket(null);
            }
          }}
        />
      )}
    </AppLayout>
  );
}


