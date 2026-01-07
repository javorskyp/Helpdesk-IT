import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import UserDashboard from "./pages/UserDashboard";
import MyTickets from "./pages/MyTickets";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/tickets/new" element={<NewTicket />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/user/tickets" element={<MyTickets />} />
      <Route path="/user/new" element={<NewTicket />} />

    </Routes>
  );
}