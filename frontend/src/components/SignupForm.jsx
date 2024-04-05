import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

function SignupForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post("http://localhost:3310/api/users/signup", {
        email,
        password,
      });
      onSwitchToLogin();
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="signup-modal">
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
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Inscription</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p onClick={onSwitchToLogin} style={{ cursor: "pointer" }}>
        Vous avez déjà un compte ? Connectez-vous
      </p>
    </div>
  );
}

SignupForm.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignupForm;
