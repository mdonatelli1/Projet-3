const AbstractManager = require("./AbstractManager");

class PaiementsManager extends AbstractManager {
  constructor() {
    super({ table: "paiements" });
  }

  async create(paiement, id) {
    const [result] = await this.database.query(
      `insert into ${this.table} (titulaire, numero, expiration, cvv, utilisateurs_id) values (?, ?, ?, ?, ?)`,
      [
        paiement.titulaire,
        paiement.numero,
        paiement.expiration,
        paiement.cvv,
        id,
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where utilisateurs_id = ?`,
      [id]
    );

    return rows[0];
  }

  // async update(id, paiement) {
  //   const [user] = await this.database.query(
  //     `select * from ${this.table} where utilisateurs_id = ?`,
  //     [id]
  //   );
  //   let titulaire = "";
  //   let numero = "";
  //   let expiration = "";
  //   let cvv;

  //   if (paiement.titulaire) {
  //     titulaire = paiement.titulaire;
  //   } else if (user[0]) {
  //     titulaire = user[0].titulaire;
  //   }
  //   if (paiement.numero) {
  //     numero = paiement.numero;
  //   } else if (user[0]) {
  //     numero = user[0].numero;
  //   }
  //   if (paiement.expiration) {
  //     expiration = paiement.expiration;
  //   } else if (user[0]) {
  //     expiration = user[0].expiration;
  //   }
  //   if (paiement.cvv) {
  //     cvv = paiement.cvv;
  //   } else if (user[0]) {
  //     cvv = user[0].cvv;
  //   }

  //   const [rows] = await this.database.query(
  //     `UPDATE ${this.table} SET titulaire = ?,
  //     numero = ?,
  //     expiration = ?,
  //     cvv = ?
  //     WHERE utilisateurs_id = ?`,
  //     [titulaire, numero, expiration, cvv, id]
  //   );

  //   return rows.affectedRows;
  // }

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateurs_id = ?`,
      [id]
    );

    return rows.affectedRows;
  }
}

module.exports = PaiementsManager;
