/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const ArticlesManager = require("./models/ArticlesManager");

const UtilisateursManager = require("./models/UtilisateursManager");

const FestivalsManager = require("./models/FestivalsManager");

const FavManager = require("./models/FavManager");

const PaiementsManager = require("./models/PaiementsManager");

const PanierManager = require("./models/PanierManager");

const CommandesManager = require("./models/CommandesManager");

const CommandeArticleManager = require("./models/CommandeArticleManager");

const managers = [
  ArticlesManager,
  UtilisateursManager,
  FestivalsManager,
  FavManager,
  PaiementsManager,
  PanierManager,
  CommandesManager,
  CommandeArticleManager,
];

// Create an empty object to hold data managers for different tables
const models = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  models[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(models, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
