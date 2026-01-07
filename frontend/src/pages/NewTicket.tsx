import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import "../styles/new-ticket.css";

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ title, description, file });
    navigate("/user");
  };

  return (
    <AppLayout>
      <div className="new-ticket-wrapper">
        <h1>Nowe zgłoszenie</h1>

        <form className="new-ticket-card" onSubmit={handleSubmit}>
          <label>
            Tytuł
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Opis
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Załącznik
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Dodaj zgłoszenie
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
