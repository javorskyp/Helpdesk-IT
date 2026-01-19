import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/userService";

export default function UserLayout({ children }: { children: React.ReactNode }) {
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
        <Link to="/user" className="logo logo-link">
          Helpdesk IT
        </Link>

        <nav className="nav">
          <Link to="/user/tickets">Moje zgłoszenia</Link>
          <Link to="/user/new">Nowe zgłoszenie</Link>
          <button onClick={logout} className="link-btn">Wyloguj</button>
        </nav>
      </header>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
