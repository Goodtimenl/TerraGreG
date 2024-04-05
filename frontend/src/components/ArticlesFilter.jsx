import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ArticlesFilter.css";

function ArticlesFilter({ onFilterChange, categories }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="filter-article-cont">
      <button
        className="art-filt-btn"
        onClick={() => onFilterChange({ type: "all" })}
      >
        Voir tous les articles
      </button>

      <div className="select-container">
        <select
          onChange={(e) =>
            onFilterChange({ type: "category", value: e.target.value })
          }
          defaultValue=""
        >
          <option value="" disabled>
            Catégories
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        className="art-filt-btn"
        onClick={() => onFilterChange({ type: "inspirations" })}
      >
        Inspirations
      </button>

      <button
        className="art-filt-btn"
        onClick={() => onFilterChange({ type: "recent" })}
      >
        Les Plus Récents
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilterChange({ type: "search", value: searchTerm });
        }}
        style={{ position: "relative" }}
      >
        <section className="art-srch-inpt">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            style={{ paddingRight: "40px" }}
          />
          <button
            className="art-srch-btn"
            type="submit"
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <div className="art-loupe-srch">🔍</div>
          </button>
        </section>
      </form>
    </div>
  );
}

ArticlesFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticlesFilter;
