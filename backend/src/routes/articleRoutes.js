const express = require("express");
const multer = require("multer");
const authenticate = require("../middlewares/authenticate");

//-----------

const router = express.Router();
const articleController = require("../controllers/articleController"); // Assure-toi que le chemin est correct
const { storage } = require("../../index");
const upload = multer({ storage: storage });

//Users --------

router.get("/categories", articleController.getCategories);

router.get("/category/:category", articleController.getArticlesByCategory);

router.get("/inspirations", articleController.getRandomArticles);

router.get("/search", articleController.searchArticles);

router.get("/recent", articleController.getRecentArticles);

router.get("/", articleController.getAllArticles);

// Admin --------

router.use(authenticate);

router.delete("/:articleId", articleController.deleteArticle);

router.put("/:articleId", articleController.updateArticle);

router.get("/:articleId", articleController.getArticleById);

router.post("/", upload.single("image"), articleController.createArticle);

module.exports = router;
