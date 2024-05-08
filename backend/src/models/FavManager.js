const AbstractManager = require("./AbstractManager");

class FavManager extends AbstractManager {
  constructor() {
    super({ table: "isFav" });
  }

  async create(utilisateurId, articleId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (utilisateurs_id, articles_id) VALUES (?, ?)`,
      [utilisateurId, articleId]
    );

    return result;
  }

  async read(utilisateurId, articleId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [utilisateurId, articleId]
    );

    return rows[0];
  }

  async readAll(id) {
    const [rows] = await this.database.query(
      `SELECT articles_id, articles.nom, articles.prix FROM ${this.table} 
      LEFT JOIN articles ON articles_id = articles.id
      WHERE utilisateurs_id = ?`,
      [id]
    );

    return rows;
  }

  async delete(utilisateurId, articleId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateurs_id = ? AND articles_id = ?`,
      [utilisateurId, articleId]
    );

    return rows.affectedRows;
  }
}

module.exports = FavManager;
