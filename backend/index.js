const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const authenticate = require("../backend/src/middlewares/authenticate");
const userRoutes = require("../backend/src/routes/userRoutes");
const articleRoutes = require("../backend/src/routes/articleRoutes");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/static/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//On cree le dossier si jamais il existe pas
const uploadsDir = "./public/static";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
  console.log("Requête reçue : ", req.body);
  next();
});

app.use(bodyParser.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/users", authenticate);
app.use("/api/users", userRoutes);

// Servir les fichiers statiques du dossier "public/images"
app.use(express.static("public"));

// Utiliser les routes pour les articles
app.use("/article", articleRoutes);

// Route pour l'upload d'images
app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/static/${
      req.file.filename
    }`;
    res.status(201).json({ message: "Fichier uploadé avec succès", imageUrl });
  } else {
    res.status(400).json({ message: "Aucun fichier uploadé" });
  }
});

// Middleware de gestion des erreurs
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message });
});

// Mise en route du serveur greg (j'avais oublié)
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
