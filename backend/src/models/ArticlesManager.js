const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "articles" });
  }

  async create(article) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, image, prix, ajout_date, nb_ventes, vendeuse) values (?, ?, ?, NOW(), 0, ?)`,
      [article.nom, article.image, article.prix, article.vendeuse]
    );

    // TYPES
    if (
      article.bijoux ||
      article.deco ||
      article.illustration ||
      article.vetement ||
      article.accessoire
    ) {
      let sql =
        "INSERT INTO types_has_articles (types_id, articles_id) VALUES ";
      const sqlValues = [];
      let isNext = false;

      if (article.bijoux) {
        sql += "(?, ?)";
        sqlValues.push(1, result.insertId);
        isNext = true;
      }
      if (article.deco) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(2, result.insertId);
        isNext = true;
      }
      if (article.illustration) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(3, result.insertId);
        isNext = true;
      }
      if (article.vetement) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(4, result.insertId);
        isNext = true;
      }
      if (article.accessoire) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(5, result.insertId);
      }

      await this.database.query(sql, sqlValues);
    }

    // THEMATIQUE
    if (article.thematique) {
      let thematiqueId;

      if (article.thematique === "STEAMPUNK") {
        thematiqueId = 1;
      } else if (article.thematique === "FANTASY") {
        thematiqueId = 2;
      } else if (article.thematique === "MEDIEVAL") {
        thematiqueId = 3;
      } else if (article.thematique === "MAGIE") {
        thematiqueId = 4;
      } else if (article.thematique === "FEERIE") {
        thematiqueId = 5;
      } else if (article.thematique === "COTTAGE CORE") {
        thematiqueId = 6;
      }

      await this.database.query(
        "INSERT INTO thematiques_has_articles (thematiques_id, articles_id) VALUES (?, ?)",
        [thematiqueId, result.insertId]
      );
    }

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT articles.id, nom, image, prix, ajout_date, nb_ventes, vendeuse, couleur, GROUP_CONCAT(type) AS types, thematique FROM ${this.table}
      LEFT JOIN couleurs_has_articles ON couleurs_has_articles.articles_id = articles.id
      LEFT JOIN couleurs ON couleurs.id = couleurs_has_articles.couleurs_id
      LEFT JOIN thematiques_has_articles ON thematiques_has_articles.articles_id = articles.id
      LEFT JOIN thematiques ON thematiques.id = thematiques_has_articles.thematiques_id
      LEFT JOIN types_has_articles ON types_has_articles.articles_id = articles.id
      LEFT JOIN types ON types.id = types_has_articles.types_id where articles.id = ?
      GROUP BY articles.id, nom, image, prix, ajout_date, nb_ventes, vendeuse, couleur, thematique`,
      [id]
    );

    return rows[0];
  }

  async readAll(filtres) {
    let sql = `SELECT articles.id, nom, image, prix, ajout_date, nb_ventes, vendeuse, couleur, GROUP_CONCAT(type) AS types, thematique FROM ${this.table}
    LEFT JOIN couleurs_has_articles ON couleurs_has_articles.articles_id = articles.id
    LEFT JOIN couleurs ON couleurs.id = couleurs_has_articles.couleurs_id
    LEFT JOIN thematiques_has_articles ON thematiques_has_articles.articles_id = articles.id
    LEFT JOIN thematiques ON thematiques.id = thematiques_has_articles.thematiques_id
    LEFT JOIN types_has_articles ON types_has_articles.articles_id = articles.id
    LEFT JOIN types ON types.id = types_has_articles.types_id`;
    const select = sql;
    const sqlValues = [];

    // Filtrer par 'nom'
    if (filtres.nom) {
      sql += " WHERE nom LIKE ? ";
      sqlValues.push(filtres.nom);
    } else {
      sql += " WHERE nom LIKE ? ";
      sqlValues.push("%");
    }

    // Filtrer par 'prix'
    if (filtres.minPrix) {
      sql += "AND prix >= ?";
      sqlValues.push(parseInt(filtres.minPrix, 10));

      // MINPRIX +
      if (filtres.maxPrix) {
        sql += "AND prix <= ?";
        sqlValues.push(parseInt(filtres.maxPrix, 10));
      }
    } else if (filtres.maxPrix) {
      sql += "AND prix <= ?";
      sqlValues.push(parseInt(filtres.maxPrix, 10));
    }

    // Filtrer par...
    if (filtres.couleurs) {
      if (filtres.couleurs[1].length > 1) {
        for (let i = 0; i < filtres.couleurs.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE couleurs.couleur = ?`;
          sqlValues.push(filtres.couleurs[i]);
        }
      } else {
        sql += "AND couleurs.couleur = ?";
        sqlValues.push(filtres.couleurs);
      }

      // COULEURS +
      if (filtres.thematiques) {
        if (filtres.thematiques[1].length > 1) {
          for (let i = 0; i < filtres.thematiques.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE thematiques.thematique = ?`;
            sqlValues.push(filtres.thematiques[i]);
          }
        } else {
          sql += "AND thematiques.thematique = ?";
          sqlValues.push(filtres.thematiques);
        }

        // COULEURS + THEMATIQUES +
        if (filtres.types) {
          if (filtres.types[1].length > 1) {
            for (let i = 0; i < filtres.types.length; i += 1) {
              sql += ` INTERSECT ${select}WHERE types.type = ?`;
              sqlValues.push(filtres.types[i]);
            }
          } else {
            sql += "AND types.type = ?";
            sqlValues.push(filtres.types);
          }
        }
      } else if (filtres.types) {
        if (filtres.types[1].length > 1) {
          for (let i = 0; i < filtres.types.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE types.type = ?`;
            sqlValues.push(filtres.types[i]);
          }
        } else {
          sql += "AND types.type = ?";
          sqlValues.push(filtres.types);
        }
      }
    } else if (filtres.thematiques) {
      if (filtres.thematiques[1].length > 1) {
        for (let i = 0; i < filtres.thematiques.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE thematiques.thematique = ?`;
          sqlValues.push(filtres.thematiques[i]);
        }
      } else {
        sql += "AND thematiques.thematique = ?";
        sqlValues.push(filtres.thematiques);
      }

      // THEMATIQUES +
      if (filtres.types) {
        if (filtres.types[1].length > 1) {
          for (let i = 0; i < filtres.types.length; i += 1) {
            sql += ` INTERSECT ${select}WHERE types.type = ?`;
            sqlValues.push(filtres.types[i]);
          }
        } else {
          sql += "AND types.type = ?";
          sqlValues.push(filtres.types);
        }
      }
    } else if (filtres.types) {
      if (filtres.types[1].length > 1) {
        for (let i = 0; i < filtres.types.length; i += 1) {
          sql += ` INTERSECT ${select}WHERE types.type = ?`;
          sqlValues.push(filtres.types[i]);
        }
      } else {
        sql += "AND types.type = ?";
        sqlValues.push(filtres.types);
      }
    }

    // "GROUP BY" complémentaire au "GROUP_CONCAT(type) AS types" et OBLIGATOIRE
    sql +=
      "GROUP BY articles.id, nom, image, prix, ajout_date, nb_ventes, vendeuse, couleur, thematique ";

    // Trier par...
    if (parseInt(filtres.nouveautes, 10) === 1) {
      sql += "ORDER BY ajout_date DESC";
    } else if (filtres.phares) {
      // NB_VENTES
      if (filtres.phares === "desc") {
        sql += "ORDER BY nb_ventes DESC";
      } else if (filtres.phares === "asc") {
        sql += "ORDER BY nb_ventes ASC";
      }
    } else if (filtres.price) {
      // PRIX
      if (filtres.price === "desc") {
        sql += "ORDER BY prix DESC";
      } else if (filtres.price === "asc") {
        sql += "ORDER BY prix ASC";
      }
    }

    // LIMIT
    if (filtres.limit) {
      sql += " LIMIT ?";
      sqlValues.push(parseInt(filtres.limit, 10));
    }

    const [rows] = await this.database.query(sql, sqlValues);
    return rows;
  }

  async update(id, article) {
    const [product] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Initialisation des variables
    let nom = "";
    let image = "";
    let prix;
    let ajoutDate = "";
    let nbVentes;
    let vendeuse = "";

    // Si le FRONT envoie un nouveau nom pour l'article au BACK
    if (article.nom) {
      // alors on attribue le nouveau nom à la variable initialisée
      nom = article.nom;
      // Sinon, et si l'article avait déjà un nom
    } else if (product[0]) {
      // alors on attribue l'ancien nom à la variable initialisée
      nom = product[0].nom;
    }
    if (article.image) {
      image = article.image;
    } else if (product[0]) {
      image = product[0].image;
    }
    if (article.prix) {
      prix = article.prix;
    } else if (product[0]) {
      prix = product[0].prix;
    }
    if (article.ajoutDate) {
      ajoutDate = article.ajoutDate;
    } else if (product[0]) {
      ajoutDate = product[0].ajout_date;
    }
    if (article.nbVentes) {
      nbVentes = article.nbVentes;
    } else if (product[0]) {
      nbVentes = product[0].nb_ventes;
    }
    if (article.vendeuse) {
      vendeuse = article.vendeuse;
    } else if (product[0]) {
      vendeuse = product[0].vendeuse;
    }

    // Attribution des variables initialisées à la base de donnée
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET nom = ?,
      image = ?,
      prix = ?,
      ajout_date = ?,
      nb_ventes = ?,
      vendeuse = ?
      WHERE id = ?`,
      [nom, image, prix, ajoutDate, nbVentes, vendeuse, id]
    );

    // TYPES
    await this.database.query(
      `DELETE FROM types_has_articles WHERE articles_id = ?`,
      [id]
    );

    if (
      article.bijoux ||
      article.deco ||
      article.illustration ||
      article.vetement ||
      article.accessoire
    ) {
      let sql =
        "INSERT INTO types_has_articles (types_id, articles_id) VALUES ";
      const sqlValues = [];
      let isNext = false;

      if (article.bijoux) {
        sql += "(?, ?)";
        sqlValues.push(1, id);
        isNext = true;
      }
      if (article.deco) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(2, id);
        isNext = true;
      }
      if (article.illustration) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(3, id);
        isNext = true;
      }
      if (article.vetement) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(4, id);
        isNext = true;
      }
      if (article.accessoire) {
        if (isNext) {
          sql += ", (?, ?)";
        } else {
          sql += "(?, ?)";
        }
        sqlValues.push(5, id);
      }

      await this.database.query(sql, sqlValues);
    }

    // THEMATIQUE
    if (article.thematique) {
      let thematiqueId;

      if (article.thematique === "STEAMPUNK") {
        thematiqueId = 1;
      } else if (article.thematique === "FANTASY") {
        thematiqueId = 2;
      } else if (article.thematique === "MEDIEVAL") {
        thematiqueId = 3;
      } else if (article.thematique === "MAGIE") {
        thematiqueId = 4;
      } else if (article.thematique === "FEERIE") {
        thematiqueId = 5;
      } else if (article.thematique === "COTTAGE CORE") {
        thematiqueId = 6;
      }

      await this.database.query(
        "UPDATE thematiques_has_articles SET thematiques_id = ? WHERE articles_id = ?",
        [thematiqueId, id]
      );
    }

    return rows.affectedRows;
  }

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table}
      WHERE id = ?`,
      [id]
    );

    return rows.affectedRows;
  }
}

module.exports = ArticlesManager;
