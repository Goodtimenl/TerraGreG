const db = require("../../database/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    return rows[0];
  }

  static async findById(userId) {
    const [rows] = await db.query(`SELECT * FROM users WHERE user_id = ?`, [
      userId,
    ]);
    return rows[0];
  }

  static async create({ email, password, firstName, lastName, isAdmin = 0 }) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const [result] = await db.query(
        `INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES (?, ?, ?, ?, ?)`,
        [email, hashedPassword, firstName, lastName, isAdmin]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(
        "Erreur lors de la création de l'utilisateur: " + error.message
      );
    }
  }
}

module.exports = User;
