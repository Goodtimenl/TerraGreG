import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types"; // Assurez-vous d'importer PropTypes
import "../styles/LoginForm.css";

function LoginForm({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3310/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      onClose(); // Fermer la modal après la connexion
      window.location.reload();
    } catch (error) {
      setErrorMessage("Échec de la connexion, vérifiez vos identifiants");
    }
  };

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Connexion</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p onClick={onSwitchToSignup} style={{ cursor: "pointer" }}>
        Créer un compte
      </p>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose est une fonction et est requise
  onSwitchToSignup: PropTypes.func.isRequired, // onSwitchToSignup est une fonction et est requise
};

export default LoginForm;
