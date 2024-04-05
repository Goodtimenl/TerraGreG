import { useState, useEffect } from "react";
import axios from "axios";
import ArticlesFilter from "./components/ArticlesFilter";
import ArticlesList from "./components/ArticlesList";
import Navbar from "./components/Navbar";
// Assure-toi d'importer les composants depuis les bons chemins

function App() {
  const [filter, setFilter] = useState({ type: "all" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend and set them
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3310/article/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Navbar />
      <ArticlesFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <ArticlesList filter={filter} />
    </div>
  );
}

export default App;
