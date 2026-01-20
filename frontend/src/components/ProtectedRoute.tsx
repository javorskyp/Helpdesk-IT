import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../services/userService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!userService.isAuthenticated()) {
        setIsLoading(false);
        setError(true);
        return;
      }

      try {
        const currentUser = await userService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Ładowanie...</div>;
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli wymagany admin, a użytkownik nie jest adminem
  if (requireAdmin && user.role !== "ADMIN") {
    return <Navigate to="/user" replace />;
  }

  // Jeśli nie wymaga admina, ale użytkownik jest adminem i próbuje wejść na /user
  if (!requireAdmin && user.role === "ADMIN" && window.location.pathname.startsWith("/user")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
