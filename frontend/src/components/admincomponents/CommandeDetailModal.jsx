import React from "react";
import PropTypes from "prop-types";
import "../../styles/Modalcommandes.scss";

function CommandeDetailsModal({ isOpen, onClose, commandeDetails }) {
  if (!isOpen) return null;
  console.info("Props reçues par CommandeDetailsModal:", {
    isOpen,
    commandeDetails,
  });

  return (
    <div className="modal-cmd-container">
      <div className="modal-cmd-content">
        <h2 className="modal-cmd-title">
          Détails de la commande Nr : {commandeDetails.id}
        </h2>
        <div className="modal-text-cmd">
          <div className="title-cmd-cont">
            <p className="titles-cmd">Statut : {commandeDetails.statut}</p>
          </div>
          <div className="modal-cmd-details">
            {commandeDetails.articles.map((article) => (
              <div key={`${article.nom}-${article.prix}`}>
                <p className="titles-cmd">- Article :</p>
                <p>{article.nom}</p>
                <p className="titles-cmd"> Prix unitaire : {article.prix} €</p>
                <p className="titles-cmd"> Quantité : {article.quantite}</p>
              </div>
            ))}
          </div>
          <p className="titles-cmd-commande">
            Total de la commande : {commandeDetails.total.toFixed(2)} €
          </p>
        </div>
        <button className="btn-cmd" type="button" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

CommandeDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  commandeDetails: PropTypes.shape({
    id: PropTypes.string,
    total: PropTypes.number,
    statut: PropTypes.string,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        nom: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
        quantite: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CommandeDetailsModal;
