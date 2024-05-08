import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NoFav from "../assets/NoFav.svg";
import Fav from "../assets/Fav.svg";
import "../styles/ArticlePanier.scss";

function ArticlesPanier({
  reload,
  setReload,
  articlesId,
  image,
  nom,
  vendeuse,
  quantité,
  prix,
}) {
  const [articleId] = useState(articlesId);
  const [fav, setFav] = useState(false);
  const [quantity, setQuantity] = useState(quantité);

  // Récupération des favoris//
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data && setFav(true))
      .catch((err) => console.error(err));
  }, []);

  // Ajouter le favoris//
  const axiosPostFav = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/isFav/",
        {
          articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.error(err));
    // console.info(articleId, "post fav");

    setFav(true);
  };

  // Supprimer le favoris//
  const axiosDeleteFav = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.error(err));
    // console.info(articleId, "delete fav");

    setFav(false);
  };

  const handleFav = () => {
    if (!fav) {
      axiosPostFav();
    } else {
      axiosDeleteFav();
    }
  };

  // Ajout d'un article supplémentaire dans le panier//
  const axiosPutPanierPlus = (nb) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(
        `http://localhost:3310/api/panier/?articleId=${articleId}`,
        {
          quantité: nb + 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setQuantity(nb + 1);
        setReload(!reload);
      })
      .catch((err) =>
        console.error("Erreur lors de la mise à jour des quantités", err)
      );
  };

  // Suppréssion d'un article dans le panier//
  const axiosPutPanierMoins = (nb) => {
    const token = sessionStorage.getItem("token");
    if (nb > 0) {
      axios
        .put(
          `http://localhost:3310/api/panier/?articleId=${articleId}`,
          {
            quantité: nb - 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          if (nb >= 1) {
            setQuantity(nb - 1);
          }
          setReload(!reload);
        })
        .catch((err) =>
          console.error("Erreur lors de la mise à jour des quantités", err)
        );
    }
  };

  return (
    <>
      <div className="article-panier-container">
        <div className="container-image-infos-article">
          <Link
            to={`/catalogue/${articleId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <img
              src={`http://localhost:3310${image}`}
              alt="a"
              className={`article-image ${vendeuse}`}
            />
          </Link>
          <div className="info_article_panier">
            <p className="article-panier-nom">{nom}</p>
            <div className="line-info-article"> </div>
            <p>{vendeuse}</p>
            {fav ? (
              <button
                className="fav-button"
                onClick={handleFav}
                aria-label="Toggle favorite"
                type="button"
              >
                <img src={Fav} alt="favoris-logo" className="isfav" />
              </button>
            ) : (
              <button
                className="fav-button"
                onClick={handleFav}
                aria-label="Toggle favorite"
                type="button"
              >
                <img src={NoFav} alt="favoris-logo" className="nofav" />
              </button>
            )}
          </div>
        </div>

        <div className="quantity">
          <input
            className="quantity_bouton moins"
            type="button"
            onClick={() => axiosPutPanierMoins(quantity)}
          />
          <p>{quantity}</p>
          <input
            className="quantity_bouton plus"
            type="button"
            onClick={() => axiosPutPanierPlus(quantity)}
          />
        </div>
        <div className="prix_article_panier">
          <p>{prix}€</p>
        </div>
      </div>
      <div className="end-line"> </div>
    </>
  );
}

ArticlesPanier.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
  articlesId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  vendeuse: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
  quantité: PropTypes.number.isRequired,
};

export default ArticlesPanier;
