import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserCreditCard.scss";

function UserCreditCard() {
  const [cardInfo, setCardInfo] = useState({
    titulaire: "NOM DU TITULAIRE",
    numero: "................",
    expiration: "MM/AA",
    cvv: "•••",
  });

  const [isCardLoaded, setIsCardLoaded] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/paiements/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => {
        const { titulaire, numero, expiration, cvv } = response.data;
        setCardInfo({
          titulaire,
          numero,
          expiration,
          cvv,
        });
        setIsCardLoaded(true);
      })
      .catch((error) =>
        console.error("Erreur chargement des données utilisateur:", error)
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveCard = (event) => {
    const token = sessionStorage.getItem("token");
    event.preventDefault();
    try {
      axios.post(
        "http://localhost:3310/api/paiements/",
        {
          titulaire: cardInfo.titulaire,
          numero: cardInfo.numero,
          expiration: cardInfo.expiration,
          cvv: cardInfo.cvv,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.info("Carte ajoutée avec succès");
      setSaveSuccess(true); // Afficher le message de succès
      setTimeout(() => {
        window.location.reload(); // Recharger la page après 4 secondes
      }, 4000);
    } catch (error) {
      console.error("Une erreur de réseau est survenue", error);
      setSaveSuccess(false); // Ne pas afficher le message de succès en cas d'erreur
    }
  };

  const handleExpirationChange = (e) => {
    const { value } = e.target;
    // Permet uniquement les chiffres et garde le format ".. / .."
    const formattedValue = value
      .replace(
        /[^0-9]/g,
        "" // Là on supprime tous les caracteres non numériques
      )
      .replace(
        /^([0-9]{2})/,
        "$1 / " // Automatiquement ca va jouter ' / ' après 2 chiffres
      )
      .slice(0, 7); // Ca ne marchait pas avec 0, 5, je l'ai changé en 0, 7

    setCardInfo((prevInfo) => ({
      ...prevInfo,
      expiration: formattedValue,
    }));
  };

  const handleDeleteCard = () => {
    const token = sessionStorage.getItem("token");
    try {
      axios.delete("http://localhost:3310/api/paiements/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.info("Carte supprimée avec succès");
      setDeleteSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Erreur réseau lors de la suppression de la carte", error);
      setDeleteSuccess(false);
    }
  };

  return (
    <div className="informations-paiement-container">
      <div className="card-container">
        <div className="carte-paiement-container">
          <h1 id="card-title">Carte de crédit</h1>

          <div className="carte-titulaire">{cardInfo.titulaire}</div>
          <div className="carte-numero">
            {cardInfo.numero
              .replace(/.(?=.{4})/g, ".")
              .replace(/(.{4})/g, "$1 ")
              .trim()}
          </div>
          <div className="carte-expiration">{cardInfo.expiration}</div>
          <img
            className="logo-visa"
            src="../src/assets/visa.svg"
            alt="logo carte VISA"
          />
        </div>

        <div className="buttons-card">
          {" "}
          {saveSuccess && (
            <div className="save-success-message">
              Carte enregistrée avec succès !
            </div>
          )}
          {deleteSuccess && (
            <div className="delete-success-message">
              Carte supprimée avec succès !
            </div>
          )}
          {isCardLoaded ? (
            <button className="bouton" type="button" onClick={handleDeleteCard}>
              Supprimer cette carte
            </button>
          ) : (
            <button className="bouton" type="button" onClick={handleSaveCard}>
              Ajouter une nouvelle carte
            </button>
          )}
        </div>
      </div>
      <form onSubmit={handleSaveCard}>
        <div className="input-group">
          <label className="labels-cb" htmlFor="titulaire">
            Nom
          </label>
          <input
            type="text"
            id="titulaire"
            name="titulaire"
            className="inputs-cb input-name-cb"
            value={cardInfo.titulaire}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label className="labels-cb" htmlFor="numero">
            Numéro de la carte
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            className="inputs-cb input-number-cb"
            value={cardInfo.numero}
            maxLength={16}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label className="labels-cb" htmlFor="expiration">
            Date d'expiration
          </label>
          <input
            type="text"
            id="expiration"
            name="expiration"
            className="inputs-cb input-exp-cb"
            value={cardInfo.expiration}
            onChange={handleExpirationChange}
          />
        </div>
        <div className="input-group">
          <label className="labels-cb" htmlFor="cvv">
            CVV / CCV
          </label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            className="inputs-cb input-cvv-cb"
            value={cardInfo.cvv}
            onChange={handleInputChange}
            maxLength={3}
          />
        </div>
        {/* <div className="cb-validate">
          <button type="submit" className="sauvegarder-btn">
            Sauvegarder
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default UserCreditCard;
