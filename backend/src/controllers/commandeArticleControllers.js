const models = require("../modelsProviders");

const add = async (req, res) => {
  try {
    await models.commande_article.create(req.body);

    res.status(201);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  add,
};
