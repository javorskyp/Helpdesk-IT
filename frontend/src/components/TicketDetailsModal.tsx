import "../styles/ticket-modal.css";

export default function TicketDetailsModal({ ticket, onClose }: any) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{ticket.title}</h2>

        <p className="modal-desc">{ticket.description}</p>

        <span
          className={`status ${ticket.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {ticket.status}
        </span>

        <h3>Komentarze</h3>

        {ticket.comments.length === 0 && (
          <p className="muted">Brak komentarzy</p>
        )}

        {ticket.comments.map((c: any, i: number) => (
          <p key={i}>
            <strong>{c.author}:</strong> {c.text}
          </p>
        ))}

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
