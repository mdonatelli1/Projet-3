const AbstractManager = require("./AbstractManager");

class UtilisateursManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "utilisateurs" as configuration
    super({ table: "utilisateurs" });
  }

  async create(utilisateur) {
    const [result] = await this.database.query(
      `insert into ${this.table} (email,password) values (?,?)`,
      [utilisateur.email, utilisateur.password]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(id, utilisateur) {
    const [user] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Initialisation des variables
    let nom = "";
    let prénom = "";
    let dateDeNaissance = "";
    let telephone;
    let email = "";
    let password = "";
    let adresse1 = "";
    let adresse2 = "";
    let CP;
    let ville = "";
    let pays = "";

    // Si le FRONT envoie une nouvelle adresse email pour l'utilisateur au BACK
    if (utilisateur.email) {
      // alors on attribue la nouvelle adresse email à la variable initialisée
      email = utilisateur.email;
      // Sinon, et si l'utilisateur avait déjà une adresse email
    } else if (user[0]) {
      // alors on attribue l'ancienne adresse email à la variable initialisée
      email = user[0].email;
    }
    if (utilisateur.password) {
      password = utilisateur.password;
    } else if (user[0]) {
      password = user[0].password;
    }
    if (utilisateur.nom) {
      nom = utilisateur.nom;
    } else if (user[0]) {
      nom = user[0].nom;
    }
    if (utilisateur.prénom) {
      prénom = utilisateur.prénom;
    } else if (user[0]) {
      prénom = user[0].prénom;
    }
    if (utilisateur.date_de_naissance) {
      dateDeNaissance = utilisateur.date_de_naissance;
    } else if (user[0]) {
      dateDeNaissance = user[0].date_de_naissance;
    }
    if (utilisateur.telephone) {
      telephone = utilisateur.telephone;
    } else if (user[0]) {
      telephone = user[0].telephone;
    }
    if (utilisateur.adresse1) {
      adresse1 = utilisateur.adresse1;
    } else if (user[0]) {
      adresse1 = user[0].adresse1;
    }
    if (utilisateur.adresse2) {
      adresse2 = utilisateur.adresse2;
    } else if (user[0]) {
      adresse2 = user[0].adresse2;
    }
    if (utilisateur.CP) {
      CP = utilisateur.CP;
    } else if (user[0]) {
      CP = user[0].CP;
    }
    if (utilisateur.ville) {
      ville = utilisateur.ville;
    } else if (user[0]) {
      ville = user[0].ville;
    }
    if (utilisateur.pays) {
      pays = utilisateur.pays;
    } else if (user[0]) {
      pays = user[0].pays;
    }

    // Attribution des variables initialisées à la base de donnée
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET nom = ?,
      prénom = ?,
      date_de_naissance = ?,
      telephone = ?,
      email = ?,
      password = ?,
      adresse1 = ?,
      adresse2 = ?,
      CP = ?,
      ville = ?,
      pays = ?
      WHERE id = ?`,
      [
        nom,
        prénom,
        dateDeNaissance,
        telephone,
        email,
        password,
        adresse1,
        adresse2,
        CP,
        ville,
        pays,
        id,
      ]
    );

    return rows.affectedRows;
  }

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows.affectedRows;
  }

  async findByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return rows[0];
  }

  // Affiche les utilisateurs et le nombre de commandes pour chacun d'entre eux//
  async findByClientOrders() {
    const [rows] = await this.database
      .query(`SELECT ${this.table}.id, nom, prénom, date_inscription, COUNT(c.id) AS nombre_de_commandes
    FROM ${this.table}
    LEFT JOIN commandes c ON ${this.table}.id = c.utilisateurs_id
    WHERE seelie = 0
    GROUP BY ${this.table}.id
    ;`);

    return rows;
  }
}

module.exports = UtilisateursManager;
