import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing-wrapper">
      <header className="landing-navbar">
        <Link to="/" className="logo logo-link">
          Helpdesk IT
        </Link>

        <nav className="nav">
          <Link to="/login" className="nav-link">
            Zaloguj
          </Link>
          <Link to="/register" className="primary-btn nav-cta">
            Zarejestruj
          </Link>
        </nav>
      </header>

      {children}
    </div>
  );
}

