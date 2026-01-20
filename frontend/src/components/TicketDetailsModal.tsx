import { useState } from "react";
import { statusLabels, statusClassNames, formatFileSize } from "../utils/helpers";
import { fileService } from "../services/fileService";
import { ticketService } from "../services/ticketService";
import type { Ticket } from "../types";
import "../styles/ticket-modal.css";

type Props = {
  ticket: Ticket;
  onClose: () => void;
  onUpdate?: () => void;
};

export default function TicketDetailsModal({ ticket, onClose, onUpdate }: Props) {
  const [rating, setRating] = useState<number>(ticket.rating || 0);
  const [submittingRating, setSubmittingRating] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === 0 || ticket.status !== "CLOSED") return;

    setSubmittingRating(true);
    try {
      await ticketService.addRating(ticket.id, { rating });
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setSubmittingRating(false);
    }
  };

  const canRate = ticket.status === "CLOSED" && !ticket.rating;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>#{ticket.id} – {ticket.title}</h2>

        <p className="modal-desc">{ticket.description}</p>

        <div className="modal-section">
          <span className={`status ${statusClassNames[ticket.status]}`}>
            {statusLabels[ticket.status]}
          </span>
        </div>

        {/* Załączniki */}
        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="modal-section">
            <h3>Załączniki</h3>
            <div className="attachments-list">
              {ticket.attachments.map((attachment) => {
                const fileId = attachment.fileId;
                const fileName = attachment.filename;
                return (
                  <button
                    key={attachment.fileId}
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log('Clicking attachment:', fileId, fileName);
                      await fileService.downloadFile(fileId, fileName);
                    }}
                    className="attachment-item"
                    type="button"
                  >
                    {attachment.filename}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Komentarze */}
        <div className="modal-section">
          <h3>Komentarze</h3>

          {!ticket.comments || ticket.comments.length === 0 ? (
            <p className="muted">Brak komentarzy</p>
          ) : (
            <div className="comments-list">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.authorEmail}</strong>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ocena */}
        {canRate && (
          <div className="modal-section">
            <h3>Oceń rozwiązanie</h3>
            <div className="rating-section">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-btn ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ⭐
                </button>
              ))}
            </div>
            <button
              className="primary-btn"
              disabled={rating === 0 || submittingRating}
              onClick={handleRatingSubmit}
            >
              {submittingRating ? "Wysyłanie..." : "Wyślij ocenę"}
            </button>
          </div>
        )}

        {ticket.rating && (
          <div className="modal-section">
            <p>Twoja ocena: ⭐ {ticket.rating}/5</p>
          </div>
        )}

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
