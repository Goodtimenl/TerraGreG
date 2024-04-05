const Article = require("../models/Article");
exports.createArticle = async (req, res, next) => {
  const { title, description, content, category } = req.body;
  let image_url = "";

  if (req.file) {
    image_url = `/static/${req.file.filename}`;
  }

  try {
    const articleId = await Article.create({
      title,
      image_url,
      description,
      content,
      category,
    });
    res
      .status(201)
      .json({ message: "Article créé avec succès", articleId, image_url });
  } catch (error) {
    next(error);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

exports.getArticleById = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      res.status(404).json({ message: "Article non trouvé" });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const { title, image_url, description } = req.body;
  try {
    const updated = await Article.update(articleId, {
      title,
      image_url,
      description,
    });
    if (updated) {
      res.status(200).json({ message: "Article mis à jour avec succès" });
    } else {
      res.status(404).json({ message: "Article non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const deleted = await Article.delete(articleId);
    if (deleted) {
      res.status(200).json({ message: "Article supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Article non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Article.findDistinctCategories();
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des catégories" });
  }
};

//---Filtres---
exports.getArticlesByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const articles = await Article.findByCategory(category);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

exports.getRandomArticles = async (req, res, next) => {
  try {
    const articles = await Article.findRandom();
    console.log(articles);
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchArticles = async (req, res, next) => {
  const { term } = req.query;
  try {
    const articles = await Article.search(term);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

exports.getDistinctCategories = async (req, res, next) => {
  try {
    const categories = await Article.findDistinctCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getRecentArticles = async (req, res, next) => {
  try {
    const articles = await Article.findRecent();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};
