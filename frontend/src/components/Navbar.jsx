import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Effect triggered");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      console.log("isAdmin value from token:", decoded.isAdmin);
      setIsAdmin(decoded.isAdmin === 1);
      console.log("isAdmin:", isAdmin);
      setIsAuthenticated(true);
    }
  }, [isAdmin]);

  const handleSwitchToSignup = () => setIsLoginView(false);
  const handleSwitchToLogin = () => setIsLoginView(true);

  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TerraGreG</Link>
      </div>
      <div className="navbar-links">
        <Link to="/about">À propos</Link>
        {isAdmin && <Link to="/piedsplats">Admin</Link>}
        {isAuthenticated ? (
          <button className="deco" onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <button className="co" onClick={() => setShowModal(true)}>
            Connexion
          </button>
        )}
        {showModal && (
          <div className="modal">
            {isLoginView ? (
              <LoginForm
                onClose={handleCloseModal}
                onSwitchToSignup={handleSwitchToSignup}
              />
            ) : (
              <SignupForm onSwitchToLogin={handleSwitchToLogin} />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
