import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>
      <section className="hero">
        <h1>Nowoczesny system zgłoszeń IT</h1>
        <p>
          Zarządzaj zgłoszeniami serwisowymi, komunikacją z użytkownikami
          i statusem zadań w jednym, prostym systemie.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="primary-btn">
            Rozpocznij za darmo
          </Link>

          <Link to="/login" className="secondary-btn">
            Mam już konto
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>📋 Zarządzanie zgłoszeniami</h3>
          <p>Twórz, edytuj i śledź zgłoszenia w czasie rzeczywistym.</p>
        </div>
        <div className="feature">
          <h3>⚡ Szybka reakcja</h3>
          <p>Automatyczne statusy i jasna komunikacja z użytkownikami.</p>
        </div>
        <div className="feature">
          <h3>🔐 Bezpieczeństwo</h3>
          <p>Dostęp oparty o role i bezpieczne logowanie.</p>
        </div>
      </section>
    </AuthLayout>
  );
}
