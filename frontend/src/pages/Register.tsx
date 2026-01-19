import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { userService } from "../services/userService";
import "../styles/auth-form.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await userService.register({ email, password });
      // Po udanej rejestracji przekieruj do logowania
      navigate("/login", { 
        state: { message: "Rejestracja udana! Możesz się teraz zalogować." } 
      });
    } catch (err: any) {
      setError(err.message || "Błąd rejestracji. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Utwórz konto</h2>
          <p>Załóż konto w systemie Helpdesk IT</p>

          {error && <div className="error-message">{error}</div>}

          <input 
            type="email" 
            placeholder="Adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Rejestracja..." : "Zarejestruj się"}
          </button>

          <div className="auth-footer">
            Masz już konto?{" "}
            <Link to="/login" className="auth-link">
              Zaloguj się
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
