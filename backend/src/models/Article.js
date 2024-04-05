const db = require("../../database/db");

class Article {
  static async create({ title, image_url, description, content, category }) {
    const [result] = await db.query(
      `INSERT INTO articles (title, image_url, description, content, category) VALUES (?, ?, ?, ?, ?)`,
      [title, image_url, description, content, category]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query(`SELECT * FROM articles`);
    return rows;
  }

  static async findById(articleId) {
    const [rows] = await db.query(
      `SELECT * FROM articles WHERE article_id = ?`,
      [articleId]
    );
    return rows[0];
  }

  static async update(articleId, { title, image_url, description }) {
    const [result] = await db.query(
      `UPDATE articles SET title = ?, image_url = ?, description = ? WHERE article_id = ?`,
      [title, image_url, description, articleId]
    );
    return result.affectedRows > 0;
  }

  static async delete(articleId) {
    const [result] = await db.query(
      `DELETE FROM articles WHERE article_id = ?`,
      [articleId]
    );
    return result.affectedRows > 0;
  }

  //---Filtres---

  static async findByCategory(category) {
    const [rows] = await db.query(`SELECT * FROM articles WHERE category = ?`, [
      category,
    ]);
    return rows;
  }

  static async findRandom() {
    const [rows] = await db.query(
      `SELECT * FROM articles ORDER BY RAND() LIMIT 10`
    );
    return rows;
  }
  static async search(term) {
    const [rows] = await db.query(
      `SELECT * FROM articles WHERE title LIKE ? OR description LIKE ?`,
      [`%${term}%`, `%${term}%`]
    );
    return rows;
  }

  static async findDistinctCategories() {
    const [rows] = await db.query(`SELECT DISTINCT category FROM articles`);
    return rows.map((row) => row.category);
  }

  static async findRecent() {
    const [rows] = await db.query(
      `SELECT * FROM articles ORDER BY created_at DESC`
    );
    return rows;
  }
}

module.exports = Article;
