import { useState } from "react";
import { statusLabels } from "../utils/helpers";
import { fileService } from "../services/fileService";
import type { Ticket, TicketStatus } from "../types";
import "../styles/ticket-modal.css";

type Props = {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (data: { status: TicketStatus; note: string }) => void;
  onDelete?: () => void;
};

export default function TicketModal({
  ticket,
  onClose,
  onUpdate,
  onDelete,
}: Props) {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [note, setNote] = useState("");

  const hasChanges = status !== ticket.status || note.length > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>
          #{ticket.id} – {ticket.title}
        </h2>

        <p className="modal-desc">{ticket.description}</p>

        {/* Załączniki */}
        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="modal-section">
            <label>Załączniki</label>
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
        {ticket.comments && ticket.comments.length > 0 && (
          <div className="modal-section">
            <label>Komentarze</label>
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
          </div>
        )}

        {/* Status */}
        <div className="modal-selects">
          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus)}
            >
              <option value="OPEN">{statusLabels.OPEN}</option>
              <option value="IN_PROGRESS">{statusLabels.IN_PROGRESS}</option>
              <option value="CLOSED">{statusLabels.CLOSED}</option>
            </select>
          </div>
        </div>

        {/* Nowy komentarz */}
        <textarea
          className="modal-textarea"
          placeholder="Dodaj komentarz / notatkę serwisową..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Actions */}
        <div className="modal-actions space-between">
          {onDelete && (
            <button className="danger-btn" onClick={onDelete}>
              Usuń zgłoszenie
            </button>
          )}

          <div style={{ marginLeft: "auto" }}>
            <button className="secondary-btn" onClick={onClose}>
              Anuluj
            </button>
            <button
              className="primary-btn"
              disabled={!hasChanges}
              onClick={() => onUpdate({ status, note })}
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}