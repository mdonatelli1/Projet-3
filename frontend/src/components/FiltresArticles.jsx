import axios from "axios";
import { useEffect, useState } from "react";

import Article from "./Article";
import SellerCard from "./SellerCard";
import sellersData from "../../sellerData.json";

import line from "../assets/line.svg";

import "../styles/FiltresArticles.scss";

function FiltresArticles() {
  const [seelies, setSeelies] = useState(null);
  const [search, setSearch] = useState(""); /// / Valeur de la barre de recherche ////
  const [prixValue, setPrixValue] = useState(200); /// / Valeur de la range prix ////
  const [thematiqueValue, setThematiqueValue] = useState(null); /// / Valeur inputs thématique ////
  const [typeValue, setTypeValue] = useState([]);
  const [CouleurValue, setCouleurValue] = useState(null); /// / Valeur inputs couleur ////
  const [articles, setArticles] = useState([]); /// / Tableau contenant les articles de la BDD ////
  const [showfilters, setShowFilters] = useState(false);

  const thematiques = [
    "STEAMPUNK",
    "FANTASY",
    "MEDIEVAL",
    "MAGIE",
    "FEERIE",
    "COTTAGE CORE",
  ];

  const types = [
    "BIJOUX",
    "DECORATION",
    "ILLUSTRATION",
    "VETEMENT",
    "ACCESSOIRE",
  ];

  const couleurs = [
    { nom: "vert", couleur: "#4E5C2C" },
    { nom: "noir", couleur: "#000000" },
    { nom: "marron", couleur: "#82583E" },
    { nom: "jaune", couleur: "#E2B95B" },
    { nom: "orange", couleur: "#DF824D" },
    { nom: "rouge", couleur: "#720F0F" },
    { nom: "bleu", couleur: "#3E7282" },
    { nom: "rose", couleur: "#8D214C" },
    { nom: "violet", couleur: "#5A38A3" },
  ];

  /// / Récuperer les articles de la BDD ////
  const getArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3310/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  /// / Fonction permettant de filter les articles////
  const articlesFiltrees = articles.filter((item) => {
    const filtreParSeelies = !seelies || item.vendeuse === seelies;
    const searchLower = search ? search.toLowerCase() : "";
    const itemNomLower = item.nom.toLowerCase();
    const filtreParNom = !searchLower || itemNomLower.includes(searchLower);
    const filtreParThematique =
      !thematiqueValue || item.thematique === thematiqueValue;
    const filtreParPrix = prixValue >= item.prix;
    const filtreParType =
      typeValue.length === 0 || item.types.includes(typeValue);
    const filtreParCouleur = !CouleurValue || item.couleur === CouleurValue;

    return (
      filtreParSeelies &&
      filtreParNom &&
      filtreParPrix &&
      filtreParThematique &&
      filtreParType &&
      filtreParCouleur
    );
  });

  // Fonction permettant d'annuler les filtres //
  function removeFilters() {
    setSeelies(null);
    setSearch("");
    setPrixValue(200);
    setThematiqueValue(null);
    setTypeValue([]);
    setCouleurValue(null);
  }

  // Affiche ou enleve le menu des filtres en format mobile //
  const toggleFiltersMenu = () => {
    setShowFilters(!showfilters);
  };
  return (
    <main>
      <section id="cards_seelies">
        <p>
          Découvrez nos créations enchantées
          <span> en filtrant par Seelies</span>. Trouvez les trésors uniques de
          <span> chaque artisane</span>, guidés par leur propre essence magique.
        </p>
        <div className="seelies_cards">
          {sellersData.map((seller) => {
            const isSelected = seller.name === seelies;
            return (
              <SellerCard
                key={seller.name}
                seller={seller}
                value={seller.name}
                onSelect={() => setSeelies(seller.name)}
                isSelected={isSelected}
                alternate
              />
            );
          })}
        </div>
      </section>
      <div className="filter-button-container">
        <h1 className="articles-title">NOS CREATIONS</h1>
        <div className="line-article-title"> </div>
        <button
          type="button"
          className="filter-button"
          onClick={toggleFiltersMenu}
        >
          {showfilters ? "CACHER LES FILTRES" : "AFFICHER LES FILTRES"}
        </button>
      </div>
      <section
        className={`main_container_filtres ${showfilters ? "filter-active" : ""}`}
      >
        <div className="filtres_container">
          <h1 className="filters_title">FILTRES</h1>
          <img src={line} alt="" />

          {/* Barre de recherche */}
          <div className="searchBar_container">
            <input
              className="input_search"
              type="texte"
              placeholder="Chercher une création"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Input prix */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">PRIX</h2>
              <img src={line} alt="" />
            </div>
            <div className="label_price">
              <p>min</p>
              <p>max</p>
            </div>
            <input
              className="input_range"
              type="range"
              min="0"
              max="200"
              // defaultValue="200"
              value={prixValue}
              step="5"
              onChange={(e) => setPrixValue(e.target.value)}
            />
            <p>{prixValue} €</p>
          </div>
          {/* Thematique */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">THEMATIQUE</h2>
              <img src={line} alt="" />
            </div>
            <div className="thematique_buttons">
              {thematiques.map((thematique) => (
                <button
                  key={thematique}
                  className="thematique_button"
                  type="button"
                  value={thematique}
                  onClick={() => setThematiqueValue(thematique)}
                >
                  {thematique}
                </button>
              ))}
            </div>
          </div>
          {/* Type */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">TYPES</h2>
              <img src={line} alt="" />
            </div>
            <div className="types_buttons">
              {types.map((type) => (
                <div key={type}>
                  <input
                    className="type_button"
                    type="button"
                    id={type}
                    value={type}
                    onClick={(e) => setTypeValue(e.target.value)}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
          </div>
          {/* Couleurs */}
          <div className="filtre_container">
            <div className="filtre_title">
              <h2 className="filter_title">COULEURS</h2>
              <img src={line} alt="" />
            </div>
            <div className="colors_buttons">
              {couleurs.map((couleur) => (
                <button
                  key={couleur.nom}
                  className="color_button"
                  alt={couleur.name}
                  aria-label="bbb"
                  type="button"
                  value={couleur.nom}
                  style={{ backgroundColor: couleur.couleur }}
                  onClick={() => setCouleurValue(couleur.nom)}
                />
              ))}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="remove-filter-button"
              onClick={removeFilters}
            >
              ANNULER LES FILTRES
            </button>
          </div>
        </div>
        <div className="view_articles">
          {articlesFiltrees
            .sort((a, b) => a.nom.localeCompare(b.nom))
            .map((article) => (
              <Article
                key={article.id}
                id={article.id}
                image={`http://localhost:3310${article.image}`}
                nom={article.nom}
                vendeuse={article.vendeuse}
                prix={`${article.prix} €`}
                isFav={false}
              />
            ))}
          ;
        </div>
      </section>
    </main>
  );
}

export default FiltresArticles;
