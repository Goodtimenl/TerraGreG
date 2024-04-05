import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Token décodé:", decoded);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/PiedsPlats" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
