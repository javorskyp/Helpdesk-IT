import { Link } from "react-router-dom";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-wrapper">
      <header className="dashboard-navbar">
        <Link to="/user" className="logo logo-link">
          Helpdesk IT
        </Link>

        <nav className="nav">
          <Link to="/user/tickets">Moje zgłoszenia</Link>
          <Link to="/user/new">Nowe zgłoszenie</Link>
          <button className="link-btn">Wyloguj</button>
        </nav>
      </header>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
