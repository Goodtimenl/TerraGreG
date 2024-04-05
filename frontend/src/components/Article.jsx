import PropTypes from "prop-types";
import "../styles/Article.css";

function Article({ image_url, title, description, content, category }) {
  return (
    <div className="container-article">
      <div className="article-img">{image_url && <img src={image_url} />}</div>

      <div className="article-content">
        <h2>{title}</h2>
        {category && <p className="category">{category}</p>}
        <p>{description}</p>
        {content && <p>{content}</p>}
      </div>
    </div>
  );
}

Article.propTypes = {
  image_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  content: PropTypes.string,
  category: PropTypes.string,
};

export default Article;
