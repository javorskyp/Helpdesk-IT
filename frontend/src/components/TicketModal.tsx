import { useState } from "react";
import "../styles/ticket-modal.css";


type Status = "Otwarte" | "W trakcie" | "Zamknięte";
type Priority = "Wysoki" | "Średni" | "Niski";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  date: string;
};

type Props = {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (data: { status: Status; priority: Priority; note: string }) => void;
  onDelete: () => void;
};

export default function TicketModal({
  ticket,
  onClose,
  onUpdate,
  onDelete,
}: Props) {
  const [status, setStatus] = useState<Status>(ticket.status);
  const [priority, setPriority] = useState<Priority>(ticket.priority);
  const [note, setNote] = useState("");

  const hasChanges =
    status !== ticket.status || priority !== ticket.priority || note.length > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>
          #{ticket.id} – {ticket.title}
        </h2>

        <p className="modal-desc">{ticket.description}</p>

        {/* status/priority */}
        <div className="modal-selects">
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              <option>Otwarte</option>
              <option>W trakcie</option>
              <option>Zamknięte</option>
            </select>
          </div>

          <div>
            <label>Priorytet</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option>Wysoki</option>
              <option>Średni</option>
              <option>Niski</option>
            </select>
          </div>
        </div>

        {/* note */}
        <textarea
          className="modal-textarea"
          placeholder="Dodaj komentarz / notatkę serwisową..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* actions */}
        <div className="modal-actions space-between">
          <button className="danger-btn" onClick={onDelete}>
            Usuń zgłoszenie
          </button>

          <div>
            <button className="secondary-btn" onClick={onClose}>
              Anuluj
            </button>
            <button
              className="primary-btn"
              disabled={!hasChanges}
              onClick={() => onUpdate({ status, priority, note })}
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}