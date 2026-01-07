import { useState } from "react";
import UserLayout from "../components/UserLayout";
import TicketDetailsModal from "../components/TicketDetailsModal";
import "../styles/tickets.css";

const myTickets = [
  {
    id: 1,
    title: "Brak dostępu do VPN",
    description: "Nie mogę połączyć się z VPN.",
    status: "W trakcie",
    date: "2026-01-02",
    comments: [
      { author: "Technik", text: "Sprawdzamy konfigurację." },
    ],
  },
];

export default function MyTickets() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <UserLayout>
      <div className="tickets-header">
        <h1>Moje zgłoszenia</h1>
      </div>

      <div className="tickets-table">
        <div className="table-head">
          <span>ID</span>
          <span>Tytuł</span>
          <span>Status</span>
          <span>Data</span>
          <span></span>
        </div>

        {myTickets.map((t) => (
          <div
            key={t.id}
            className="table-row"
            onClick={() => setSelected(t)}
          >
            <span>#{t.id}</span>
            <span className="ticket-title">{t.title}</span>
            <span
              className={`status ${t.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {t.status}
            </span>
            <span>{t.date}</span>
            <span className="row-action">›</span>
          </div>
        ))}
      </div>

      {selected && (
        <TicketDetailsModal
          ticket={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </UserLayout>
  );
}