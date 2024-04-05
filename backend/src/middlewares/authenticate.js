const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    if (!user.is_admin) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    return res.status(500).json({ message: "Erreur d'authentification" });
  }
};

module.exports = authenticate;
