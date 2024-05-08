const AbstractManager = require("./AbstractManager");

class CommandeArticleManager extends AbstractManager {
  constructor() {
    super({ table: "commande_article" });
  }

  async create(commandeArticle) {
    const [result] = await this.database.query(
      `insert into ${this.table} (quantité, commandes_id, articles_id) values (?, ?, ?)`,
      [
        commandeArticle.quantité,
        commandeArticle.commandeId,
        commandeArticle.articleId,
      ]
    );

    return result;
  }
}

module.exports = CommandeArticleManager;
