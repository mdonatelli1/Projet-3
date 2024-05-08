const AbstractManager = require("./AbstractManager");

class PanierManager extends AbstractManager {
  constructor() {
    super({ table: "panier_article" });
  }

  async create(utilisateurId, cart) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantité, articles_id, utilisateurs_id) VALUES (?, ?, ?)`,
      [cart.quantité, cart.articleId, utilisateurId]
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
      `SELECT panier_article.quantité, articles_id, articles.nom, articles.prix, articles.image, articles.vendeuse FROM ${this.table}
      LEFT JOIN articles ON articles_id = articles.id
      WHERE utilisateurs_id = ?`,
      [id]
    );

    return rows;
  }

  async delete(utilisateurId) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateurs_id = ?`,
      [utilisateurId]
    );

    return rows.affectedRows;
  }

  async update(utilisateurId, articleId, quantity) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET quantité = ? WHERE utilisateurs_id = ? AND articles_id = ?`,
      [quantity, utilisateurId, articleId]
    );

    return rows;
  }

  // async validatePanier(utilisateurId) {
  //   const articlesDansLePanier = await this.readAll(utilisateurId);
  //   const updatePromises = articlesDansLePanier.map((article) =>
  //     this.database.query(
  //       `UPDATE articles SET nb_ventes = nb_ventes + ? WHERE id = ?`,
  //       [article.quantité, article.articles_id]
  //     )
  //   );
  //   await Promise.all(updatePromises);
  // }
}

module.exports = PanierManager;
