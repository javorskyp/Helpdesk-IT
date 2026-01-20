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
              {ticket.attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={fileService.getDownloadUrl(attachment.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-item"
                >
                  {attachment.filename} ({formatFileSize(attachment.size)})
                </a>
              ))}
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
            <h3>Oce\u0144 rozwi\u0105zanie</h3>
            <div className="rating-section">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-btn ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  \u2b50
                </button>
              ))}
            </div>
            <button
              className="primary-btn"
              disabled={rating === 0 || submittingRating}
              onClick={handleRatingSubmit}
            >
              {submittingRating ? "Wysy\u0142anie..." : "Wy\u015blij ocen\u0119"}
            </button>
          </div>
        )}

        {ticket.rating && (
          <div className="modal-section">
            <p>Twoja ocena: \u2b50 {ticket.rating}/5</p>
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
