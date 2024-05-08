const models = require("../modelsProviders");

const add = async (req, res) => {
  try {
    const result = await models.panier_article.create(req.auth.id, req.body);

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res) => {
  try {
    const cart = await models.panier_article.read(
      req.auth.id,
      req.query.articleId
    );

    if (cart == null) {
      if (req.auth.id && req.query.articleId) {
        res.json(0);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.json({ quantité: cart.quantité });
    }
  } catch (err) {
    console.error(err);
  }
};

const browse = async (req, res) => {
  try {
    const cart = await models.panier_article.readAll(req.auth.id);

    if (cart == null) {
      res.sendStatus(404);
    } else {
      res.json(cart);
    }
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.panier_article.delete(req.auth.id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
};

const edit = async (req, res) => {
  try {
    const cart = await models.panier_article.update(
      req.auth.id,
      req.query.articleId,
      req.body.quantité
    );
    if (cart.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

// const validate = async (req, res) => {
//   try {
//     const utilisateurId = req.auth.id;
//     await models.panier_article.validatePanier(utilisateurId);
//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };

module.exports = {
  add,
  read,
  browse,
  destroy,
  edit,
  // validate,
};
