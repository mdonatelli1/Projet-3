import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useConnexionContext } from "../contexts/ConnexionContext";
import NoFav from "../assets/NoFav.svg";
import Fav from "../assets/Fav.svg";
import "../styles/DetailArticle.scss";

function DetailArticle() {
  const { authentification, toggleModal } = useConnexionContext();
  const { articleId } = useParams();
  const [isAuthForWarning, setIsAuthForWarning] = useState(false);
  const [article, setArticle] = useState(null);
  const [nbCart, setNbCart] = useState(0);
  const [guest, setGuest] = useState(false);
  const [fav, setFav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data && setFav(true))
        .catch((err) => console.error(err));

      axios
        .get(`http://localhost:3310/api/panier/?articleId=${articleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data && setNbCart(response.data.quantité))
        .catch((err) => console.error(err));
    } else {
      setGuest(true);
    }
  }, []);

  const axiosPost = () => {
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
    // console.info(articleId, "post");

    setFav(true);
  };

  const axiosDelete = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.error(err));
    // console.info(articleId, "delete");

    setFav(false);
  };

  const handleFav = () => {
    if (!fav) {
      axiosPost();
    } else {
      axiosDelete();
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/articles/${articleId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const showAddToCartNotification = () => {
    if (quantity !== "0" && quantity !== "") {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };

  const showAuthWarning = () => {
    if (!authentification) {
      setIsAuthForWarning(true);
      setTimeout(() => {
        setIsAuthForWarning(false);
      }, 100000);
    }
  };

  const handleCart = () => {
    console.info("Quantité dans le panier :", nbCart + parseInt(quantity, 10));

    const token = sessionStorage.getItem("token");

    let quantité = 0;
    if (quantity) {
      quantité = parseInt(quantity, 10);
    }

    axios
      .get(`http://localhost:3310/api/panier/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          const existingQuantity = response.data.quantité;
          const newQuantity = existingQuantity + quantité;
          axios
            .put(
              `http://localhost:3310/api/panier/?articleId=${articleId}`,
              { quantité: newQuantity },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              setNbCart(newQuantity);
              // console.info(nbCart);
              showAddToCartNotification();
            })
            .catch((error) => {
              console.error("Error updating cart:", error);
              showAuthWarning();
            });
        } else {
          axios
            .post(
              "http://localhost:3310/api/panier/",
              {
                articleId,
                quantité,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              setNbCart(quantité);
              showAddToCartNotification();
            })
            .catch((error) => {
              showAuthWarning();
              console.error("Error adding to cart:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking cart:", error);
        showAuthWarning();
      });
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="detail-page">
      <div className="outLine">
        <div className={`detail-container ${article.vendeuse}`}>
          <div className="detail-left">
            <img
              className="detail-image"
              src={`http://localhost:3310${article.image}`}
              alt={article.nom}
            />
          </div>
          <div className="detail-right">
            <h1 className="detail-title">{article.nom}</h1>
            <p>Vendeuse: {article.vendeuse}</p>
            <p className="detail-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              repudiandae quaerat quod, dolore nisi error, eligendi dignissimos
              accusamus ad porro esse illum harum quam deleniti exercitationem
              voluptas accusantium voluptatem ducimus?
            </p>
            <p>Prix: {article.prix} €</p>
            <div className="detail-quantity-form">
              <label className="detail-label-quantity" htmlFor="quantity">
                Quantité:
              </label>
              <input
                type="number"
                className="detail-quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value, 10)}
              />
            </div>
            <div className="detail-logos">
              <button
                className="detail-button-add"
                type="button"
                onClick={() => {
                  handleCart();
                }}
              >
                AJOUTER AU PANIER
              </button>
              {fav ? (
                <button
                  className="favorite-button"
                  onClick={!guest ? handleFav : () => setFav(!fav)}
                  aria-label="Toggle favorite"
                  type="button"
                >
                  <img
                    src={Fav}
                    alt={fav ? "Favorited" : "Not favorited"}
                    className={fav ? "favorite-icon filled" : "favorite-icon"}
                  />
                </button>
              ) : (
                <button
                  className="favorite-button"
                  onClick={!guest ? handleFav : () => setFav(!fav)}
                  aria-label="Toggle favorite"
                  type="button"
                >
                  <img
                    src={NoFav}
                    alt={fav ? "Favorited" : "Not favorited"}
                    className={fav ? "favorite-icon filled" : "favorite-icon"}
                  />
                </button>
              )}
            </div>
            {showNotification && quantity !== "0" && quantity !== "" ? (
              <div className="detail-notification">
                Article bien ajouté au{" "}
                <Link to="/panier">
                  <span className="detail-toggle-link">panier</span>
                </Link>
              </div>
            ) : (
              (quantity === "0" || quantity === "") && (
                <div className="detail-notification">
                  Veuillez ajouter une quantité
                </div>
              )
            )}
            {isAuthForWarning && (
              <div className="detail-notification">
                Veuillez vous{" "}
                <span
                  className="detail-toggle-link"
                  onClick={toggleModal}
                  role="button"
                  onKeyDown=""
                  tabIndex={0}
                >
                  connectez
                </span>{" "}
                pour ajouter des articles à votre panier
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailArticle;
