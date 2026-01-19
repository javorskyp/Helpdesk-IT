import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import "../styles/dashboard.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="app-wrapper">
      <header className="dashboard-navbar">
        <Link to="/dashboard" className="logo logo-link">
          Helpdesk IT
        </Link>

        <nav className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tickets">Zgłoszenia</Link>
          <button onClick={logout} className="link-btn">Wyloguj</button>
        </nav>
      </header>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
