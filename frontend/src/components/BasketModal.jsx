import React from "react";
import "../styles/BasketModal.scss";

function BasketModal() {
  return (
    <main className="BasketModalMain">
      <div className="basketModalContainer">
        <h2 className="basketModalTanks">
          Merci pour votre commande, votre panier à été validé!
        </h2>
      </div>
    </main>
  );
}

export default BasketModal;
