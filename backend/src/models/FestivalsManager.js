const AbstractManager = require("./AbstractManager");

class FestivalsManager extends AbstractManager {
  constructor() {
    super({ table: "festivals" });
  }

  async create(festivals) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom,lieu,date) values (?,?,?)`,
      [festivals.nom, festivals.lieu, festivals.date]
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

  async update(festival, id) {
    const [evenement] = await this.database.query(
      `select * from ${this.table}`,
      [id]
    );
    let nom = "";
    let lieu = "";
    let date = "";

    if (festival.nom) {
      nom = festival.nom;
    } else if (evenement[0]) {
      nom = evenement[0].nom;
    }
    if (festival.lieu) {
      lieu = festival.lieu;
    } else if (evenement[0]) {
      lieu = evenement[0].lieu;
    }
    if (festival.date) {
      date = festival.date;
    } else if (evenement[0]) {
      date = evenement[0].date;
    }

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET nom = ?, lieu = ?, date = ? WHERE id = ?`,
      [nom, lieu, date, id]
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
}

module.exports = FestivalsManager;
