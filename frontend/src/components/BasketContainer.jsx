import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import ArticlesPanier from "./ArticlesPanier";

import basketIcon from "../assets/panier_icon.svg";

import "../styles/BasketContainer.scss";

function BasketContainer({ reload, setReload }) {
  const [articles, setArticles] = useState([]);

  // Recupération de tous les produits dans le panier//
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:3310/api/panier/0`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="basketContainer">
      <div id="basketDetail">
        <div id="basketHeading">
          <div id="basketLogo">
            <img src={basketIcon} alt="basket_icon" />
          </div>
          <h1>Ton panier</h1>
        </div>
        <ul id="basketFilter">
          <li>Produit</li>
          <li>Quantité</li>
          <li>Prix</li>
        </ul>
        <div id="basketContent">
          {articles.map((article) => (
            <ArticlesPanier
              reload={reload}
              setReload={setReload}
              key={article.articles_id}
              articlesId={article.articles_id}
              image={article.image}
              nom={article.nom}
              vendeuse={article.vendeuse}
              quantité={article.quantité}
              prix={article.prix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

BasketContainer.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};

export default BasketContainer;
