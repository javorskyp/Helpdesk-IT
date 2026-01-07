import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <h1>Moje zgłoszenia</h1>
      <p>Dodawaj nowe zgłoszenia i sprawdzaj ich status</p>

      <button
        className="primary-btn"
        onClick={() => navigate("/user/new")}
      >
        + Nowe zgłoszenie
      </button>
    </UserLayout>
  );
}
