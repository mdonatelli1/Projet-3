// Import access to database tables
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../modelsProviders");

const browse = (req, res) => {
  models.utilisateurs
    .findAll()
    .then((utilisateurs) => res.json(utilisateurs))
    .catch((err) => console.error(err));
};

// Affiche les clients et le nombre de commandes pour chacun d'entre eux//
const browseClientsOrders = async (req, res) => {
  try {
    const clients = await models.utilisateurs.findByClientOrders(req.query);
    if (clients.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json(clients);
    }
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res) => {
  try {
    const utilisateur = await models.utilisateurs.read(req.auth.id);

    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    console.error(err);
  }
};

const add = async (req, res) => {
  const { email, password } = req.body; // Récupère l'email et le mot de passe de la requête

  try {
    const salt = await bcrypt.genSalt(10); // Génère un salage
    const hashedPassword = await bcrypt.hash(password, salt); // Hache le mot de passe avec le salage

    // Insère l'utilisateur avec le mot de passe haché dans la base de données
    const utilisateur = await models.utilisateurs.create({
      email,
      password: hashedPassword, // Utilise le mot de passe haché
    });

    res.status(201).json(utilisateur); // Répond avec l'utilisateur créé
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const edit = async (req, res) => {
  try {
    const affectedRows = await models.utilisateurs.update(
      req.auth.id,
      req.body
    );

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
  const { actualPassword } = req.body;
  const userId = req.auth.id;

  try {
    if (!userId) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = await models.utilisateurs.read(userId);
    const isActualPasswordCorrect = await bcrypt.compare(
      actualPassword,
      user.password
    );

    if (!isActualPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Le mot de passe actuel est incorrect." });
    }

    const affectedRows = await models.utilisateurs.delete(userId);

    if (affectedRows === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du compte." });
  }
};

function login(req, res) {
  const { email, password } = req.body;

  try {
    // on recherche l'utilisateur par l'email dans la base de données
    models.utilisateurs.findByEmail(email).then((utilisateur) => {
      if (!utilisateur) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }
      // on compare le mot de passe fourni avec le mot de passe hashé dans la bdd
      bcrypt.compare(password, utilisateur.password).then((passwordMatch) => {
        // Si les mots de passe correspondent on crée un token qui va contenir l'id et l'email de l'utilisateur
        if (passwordMatch) {
          // Création du token avec une expiration d'une heure (vous pouvez ajuster cela selon vos besoins)
          const token = jwt.sign(
            { id: utilisateur.id, isAdmin: utilisateur.seelie },
            process.env.APP_SECRET, // replace with your own secret key
            { expiresIn: "1h" }
          );

          // là on envoie le token au client avec un message de connexion réussie
          res
            .status(200)
            .json({ message: "Connexion réussie", token, utilisateur });
        } else {
          // Si y'a une couille dans le paté bah on renvoie un message d'erreur
          res.status(401).json({ message: "Identifiants incorrects" });
        }
      });
      return null;
    });
  } catch (error) {
    console.error("Server-side error", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.auth.id; // j'ai recup ca de l'edit

  try {
    if (!userId) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const user = await models.utilisateurs.read(userId);

    // On vérifie que l'ancien mot de passe est correct
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "L'ancien mot de passe est incorrect." });
    }

    // là on va voir si le nouveau mot de passe est différent de l'ancien
    if (newPassword === oldPassword) {
      return res.status(400).json({
        message: "Le nouveau mot de passe doit être différent de l'ancien.",
      });
    }

    // et la on hache et on met à jour du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await models.utilisateurs.update(userId, { password: hashedPassword });

    return res.json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    return res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du mot de passe.",
    });
  }
};

module.exports = {
  browseClientsOrders,
  changePassword,
  browse,
  read,
  edit,
  add,
  destroy,
  login,
};
