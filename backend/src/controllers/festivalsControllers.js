const models = require("../modelsProviders");

const browse = (req, res) => {
  models.festivals
    .findAll()
    .then((festivals) => res.json(festivals))
    .catch((err) => console.error(err));
};

const read = async (req, res) => {
  try {
    const festival = await models.festivals.read(req.params.id);

    if (festival == null) {
      res.sendStatus(404);
    } else {
      res.json(festival);
    }
  } catch (err) {
    console.error(err);
  }
};

const edit = async (req, res) => {
  const festival = req.body;

  try {
    const affectedRows = await models.festivals.update(festival, req.params.id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  const festival = req.body;

  try {
    const insertId = await models.festivals.create(festival);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
  }
};

const destroy = async (req, res) => {
  try {
    const affectedRows = await models.festivals.delete(req.params.id);

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
  edit,
  add,
  destroy,
};
