import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminForm from "../components/AdminForm";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/PiedsPlats.css";

function PiedsPlats() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token récupéré de localStorage:", token);
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3310/article");
      setArticles(response.data);
      console.log("Réponse de l'API:", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  const addArticle = async (article) => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3310/article", article);
      fetchArticles();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateArticle = async (articleId, article) => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:3310/article/${articleId}`, article);
      fetchArticles();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article:", error);
    } finally {
      setSelectedArticle(null);
      setIsSubmitting(false);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      await axios.delete(`http://localhost:3310/article/${articleId}`);
      fetchArticles();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error);
    }
  };

  const handleSubmit = (article) => {
    if (selectedArticle) {
      updateArticle(selectedArticle.article_id, article);
    } else {
      addArticle(article);
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
  };

  const handleDelete = (articleId) => {
    deleteArticle(articleId);
  };

  return (
    <div>
      <Navbar />
      <div className="container-admin">
        <h1>--Page Admin--</h1>
        <div className="space">
          <button onClick={() => setSelectedArticle(null)}>
            Ajouter un article
          </button>
        </div>
        <AdminForm
          onSubmit={handleSubmit}
          articleData={selectedArticle}
          isSubmitting={isSubmitting}
        />
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.article_id}>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>{article.category}</td>
                <td>
                  <button onClick={() => handleEdit(article)}>Modifier</button>
                  <button onClick={() => handleDelete(article.article_id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PiedsPlats;
