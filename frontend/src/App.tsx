import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import UserDashboard from "./pages/UserDashboard";
import MyTickets from "./pages/MyTickets";
import UserNewTicket from "./pages/UserNewTicket";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Trasy dla admina */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tickets" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <Tickets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tickets/new" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <NewTicket />
          </ProtectedRoute>
        } 
      />

      {/* Trasy dla użytkownika */}
      <Route 
        path="/user" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/tickets" 
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/new" 
        element={
          <ProtectedRoute>
            <UserNewTicket />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}