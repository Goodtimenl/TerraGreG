import { useEffect, useState } from "react";
import axios from "axios";
import Article from "./Article";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/ArticlesList.css";

function ArticlesList({ filter }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let url = "http://localhost:3310/article";

    switch (filter.type) {
      case "all":
        break;
      case "category":
        url += `/category/${filter.value}`;
        break;
      case "inspirations":
        url += "/inspirations";
        break;
      case "search":
        url += `/search?term=${filter.value}`;
        break;
      case "recent":
        url += "/recent";
        break;
      default:
        console.error("Type de filtre non reconnu:", filter.type);
        return;
    }

    const fetchArticles = async () => {
      try {
        const response = await axios.get(url);
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        navigate("/");
      }
    };

    fetchArticles();
  }, [filter, navigate]);

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <Article key={article.article_id} {...article} />
      ))}
    </div>
  );
}
ArticlesList.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

export default ArticlesList;
