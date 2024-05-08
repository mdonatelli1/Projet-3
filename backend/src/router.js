const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const articlesControllers = require("./controllers/articlesControllers");
const commandeArticleControllers = require("./controllers/commandeArticleControllers");
const commandesControllers = require("./controllers/commandesControllers");
const isFav = require("./controllers/favControllers");
const fesitvalsControllers = require("./controllers/festivalsControllers");
const paiementControllers = require("./controllers/paiementControllers");
const panier = require("./controllers/panierControllers");
const utilisateursControllers = require("./controllers/utilisateursControllers");

const isAdmin = require("./middlewares/isAdmin");
const userIdToken = require("./middlewares/userIdToken");
const validateUser = require("./middlewares/validateUser");

/* ************************************************************************* */

// PUBLIC
// routes utilisateurs

router.post("/utilisateurs", validateUser, utilisateursControllers.add);
router.post("/auth/login", utilisateursControllers.login);

// toutes festivals
router.get("/festivals", fesitvalsControllers.browse);
router.get("/festivals/:id", fesitvalsControllers.read);

// routes articles
router.get("/articles", articlesControllers.browse);
router.get("/articles/:id", articlesControllers.read);

// ----- UTILISATEUR -----
router.use(userIdToken);

// routes utilisateurs
router.get("/utilisateurs/:id", utilisateursControllers.read);
router.put("/utilisateurs/:id", utilisateursControllers.edit);
router.post("/utilisateurs/delete", utilisateursControllers.destroy);
router.put("/change-password", utilisateursControllers.changePassword);

// routes fav
router.get("/isFav", isFav.read);
router.get("/isFav/:id", isFav.browse);
router.post("/isFav", isFav.add);
router.delete("/isFav", isFav.destroy);

// routes panier
router.get("/panier", panier.read);
router.get("/panier/:id", panier.browse);
router.post("/panier", panier.add);
router.delete("/panier", panier.destroy);
router.put("/panier", panier.edit);
// router.post("/validerPanier", panier.validate);

// routes paiements
router.get("/paiements/:id", paiementControllers.read);
router.post("/paiements", paiementControllers.add);
router.delete("/paiements/:id", paiementControllers.destroy);

// route commandes
router.post("/commandes", commandesControllers.add);
router.post("/commandeArticle", commandeArticleControllers.add);
router.get("/commandesHistory", commandesControllers.browseByUser);

// ----- ADMIN -----
router.use(isAdmin);

// route utilisateurs
router.get("/utilisateurs", utilisateursControllers.browse);
router.get("/clients", utilisateursControllers.browseClientsOrders);

// routes articles
router.post("/articles", articlesControllers.add);
router.put("/articles/:id", articlesControllers.edit);
router.delete("/articles/:id", articlesControllers.destroy);

// route festivals
router.post("/festivals", fesitvalsControllers.add);
router.put("/festivals/:id", fesitvalsControllers.edit);
router.delete("/festivals/:id", fesitvalsControllers.destroy);

// route paiements
router.get("/paiements", paiementControllers.browse);

// route commandes
router.get("/commandes/details", commandesControllers.browse);
router.get("/commandes/details/:id", commandesControllers.readDetails);

module.exports = router;
