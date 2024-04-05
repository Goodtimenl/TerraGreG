import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function AdminForm({ onSubmit, articleData, isSubmitting }) {
  const [article, setArticle] = useState({
    title: "",
    image_url: "",
    description: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (articleData) {
      setArticle({
        title: articleData.title || "",
        image_url: articleData.image_url || "",
        description: articleData.description || "",
        content: articleData.content || "",
        category: articleData.category || "",
      });
    }
  }, [articleData]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("description", article.description);
    formData.append("content", article.content);
    formData.append("category", article.category);
    if (image) {
      formData.append("image", image);
    }
    onSubmit(formData);

    setArticle({
      title: "",
      image_url: "",
      description: "",
      content: "",
      category: "",
    });
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={article.title}
        onChange={handleChange}
        placeholder="Titre"
        required
      />
      <input
        name="file"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <textarea
        name="description"
        value={article.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <textarea
        name="content"
        value={article.content}
        onChange={handleChange}
        placeholder="Contenu"
        required
      />
      <input
        name="category"
        value={article.category}
        onChange={handleChange}
        placeholder="Catégorie"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        Soumettre
      </button>
    </form>
  );
}

AdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  articleData: PropTypes.shape({
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
};

export default AdminForm;
