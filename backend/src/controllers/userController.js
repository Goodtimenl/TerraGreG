const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      isAdmin: 0,
    });
    if (user) {
      res.status(201).json({ message: "Utilisateur créé avec succès" });
    } else {
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Authentification échouée" });
  }
}

module.exports = {
  signup,
  login,
};
