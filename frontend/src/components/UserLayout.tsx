import { Link, useNavigate, useLocation } from "react-router-dom";
import { userService } from "../services/userService";
import "../styles/dashboard.css";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div className="app-wrapper">
      <header className="dashboard-navbar">
        <Link to="/user" className="logo logo-link">
          Helpdesk IT
        </Link>

        <nav className="nav">
          <Link 
            to="/user" 
            className={`nav-btn ${location.pathname === "/user" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/user/tickets" 
            className={`nav-btn ${isActive("/user/tickets") ? "active" : ""}`}
          >
            Moje zgłoszenia
          </Link>
          <Link 
            to="/user/new" 
            className={`nav-btn ${isActive("/user/new") ? "active" : ""}`}
          >
            Nowe zgłoszenie
          </Link>
          <button onClick={logout} className="link-btn">Wyloguj</button>
        </nav>
      </header>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
