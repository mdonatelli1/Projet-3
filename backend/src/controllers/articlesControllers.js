const models = require("../modelsProviders");

const browse = async (req, res) => {
  try {
    const articles = await models.articles.readAll(req.query);
    if (articles.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json(articles);
    }
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res) => {
  try {
    const article = await models.articles.read(req.params.id);

    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  const article = req.body;

  try {
    const insertId = await models.articles.create(article);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

const edit = async (req, res) => {
  try {
    const affectedRows = await models.articles.update(req.params.id, req.body);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.articles.delete(req.params.id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
