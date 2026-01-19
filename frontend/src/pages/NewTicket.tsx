import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ticketService } from "../services/ticketService";
import { fileService } from "../services/fileService";
import "../styles/new-ticket.css";

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Najpierw utwórz zgłoszenie
      const ticket = await ticketService.createTicket({ title, description });

      // Jeśli jest załącznik, prześlij go
      if (file && ticket.id) {
        await fileService.uploadFile(ticket.id, file);
      }

      // Przekieruj do listy zgłoszeń użytkownika
      navigate("/user/tickets");
    } catch (err: any) {
      setError(err.message || "Błąd podczas tworzenia zgłoszenia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="new-ticket-wrapper">
        <h1>Nowe zgłoszenie</h1>

        {error && <div className="error-message">{error}</div>}

        <form className="new-ticket-card" onSubmit={handleSubmit}>
          <label>
            Tytuł
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <label>
            Opis
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <label>
            Załącznik
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={loading}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Tworzenie..." : "Dodaj zgłoszenie"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
