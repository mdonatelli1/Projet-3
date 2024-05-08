import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useBasketContext } from "../contexts/BasketContext";

import "../styles/ValidationBasket.scss";

function ValidationBasket({ reload }) {
  const { setIsBasketClear } = useBasketContext();
  const [nbArticles, setNbArticles] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/panier/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.info("Réponse du backend:", response.data);
        const totalQuantity = response.data.reduce(
          (total, article) => total + article.quantité,
          0
        );
        // console.info("Quantité totale:", totalQuantity);
        const totalPrice = response.data.reduce(
          (total, article) => total + article.quantité * article.prix,
          0
        );
        // console.info("Prix total:", totalPrice);
        setNbArticles(totalQuantity);
        setPriceTotal(totalPrice.toFixed(2));
        // console.info("nbArticles après mise à jour:", nbArticles);
        // console.info("priceTotal après mise à jour:", priceTotal);
      })

      .catch((error) =>
        console.error("Erreur chargement des articles du panier:", error)
      );

    // Récupération du panier
    axios
      .get("http://localhost:3310/api/panier/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setBasket(response.data))
      .catch((err) => console.error(err));
  }, [reload]);

  const handleValidBasket = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = sessionStorage.getItem("token");

    if (nbArticles === 0) {
      setIsLoading(false);
      return;
    }

    try {
      // --- Création de la commande à partir des infos du panier ---
      const { data } = await axios.post(
        "http://localhost:3310/api/commandes",
        {
          statut: "en préparation",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      basket.forEach((article) => {
        axios
          .post(
            "http://localhost:3310/api/commandeArticle",
            {
              quantité: article.quantité,
              commandeId: data.result,
              articleId: article.articles_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((err) => console.error(err));
      });

      // await axios.post(
      //   "http://localhost:3310/api/validerPanier",
      //   {},
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      //-------------------------------------------------------------

      // Supression du panier
      await axios.delete("http://localhost:3310/api/panier", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setNbArticles(0);
      setPriceTotal(0);
      setIsBasketClear(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="firstBorder">
      <div className="secondBorder">
        <div className="quantityBasket"> {nbArticles} articles</div>
        <div className="ligneBasket" />
        <div className="totalBasket">TOTAL {priceTotal}€</div>
        <button
          type="button"
          className="paymentBasket"
          onClick={handleValidBasket}
          disabled={isLoading}
        >
          {isLoading ? "En cours..." : "VALIDER MON PANIER"}
        </button>
      </div>
    </main>
  );
}

ValidationBasket.propTypes = {
  reload: PropTypes.bool.isRequired,
};

export default ValidationBasket;
