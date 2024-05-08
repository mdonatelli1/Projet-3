const models = require("../modelsProviders");

const browse = async (req, res) => {
  try {
    const commandes = await models.commandes.readAll();
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message:
        "Erreur serveur lors de la récupération des détails des commandes.",
    });
  }
};

const add = async (req, res) => {
  try {
    const result = await models.commandes.create(req.auth.id, req.body);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const browseByUser = async (req, res) => {
  try {
    const commandes = await models.commandes.readAllByUser(req.auth.id);
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message:
        "Erreur serveur lors de la récupération des détails des commandes.",
    });
  }
};

const readDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await models.commandes.readDetailsById(id);

    if (details.length > 0) {
      res.json(details);
    } else {
      res.status(404).send("Commande non trouvée.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad Request.");
  }
};

module.exports = {
  browse,
  add,
  browseByUser,
  readDetails,
};
