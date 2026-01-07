import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../styles/auth-form.css";

export default function Login() {
  return (
    <AuthLayout>
      <div className="auth-container">
        <form className="auth-card">
          <h2>Zaloguj się</h2>
          <p>Uzyskaj dostęp do systemu zgłoszeń</p>

          <div className="sso-buttons">
            <button type="button" className="sso-btn google">
              <GoogleIcon />
              Zaloguj się przez Google
            </button>

            <button type="button" className="sso-btn github">
              <GitHubIcon />
              Zaloguj się przez GitHub
            </button>
          </div>

          <div className="separator">lub</div>

          <input type="email" placeholder="Adres e-mail" />
          <input type="password" placeholder="Hasło" />

          <button type="submit">Zaloguj </button>

          <div className="auth-footer">
            Nie masz konta?{" "}
            <Link to="/register" className="auth-link">
              Zarejestruj się
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg className="sso-icon" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.23 9.2 3.65l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.44 5.38 2.56 13.22l7.98 6.19C12.44 13.5 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.67-.15-3.29-.43-4.85H24v9.18h12.4c-.53 2.85-2.13 5.27-4.54 6.9l7.03 5.45C43.87 37.13 46.1 31.3 46.1 24.5z"/>
      <path fill="#FBBC05" d="M10.54 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.6l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.82l-7.03-5.45c-1.95 1.32-4.44 2.09-8.87 2.09-6.26 0-11.56-4-13.46-9.41l-7.98 6.19C6.44 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="sso-icon" viewBox="0 0 24 24" fill="white">
      <path d="M12 .5C5.73.5.5 5.74.5 12.04c0 5.12 3.29 9.46 7.86 11 .57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.55-3.87-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19.93-.26 1.92-.39 2.91-.39.99 0 1.98.13 2.91.39 2.22-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.11 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.79.55 4.56-1.54 7.85-5.88 7.85-11C23.5 5.74 18.27.5 12 .5z"/>
    </svg>
  );
}