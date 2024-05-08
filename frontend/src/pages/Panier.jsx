import React, { useState } from "react";

import BasketContainer from "../components/BasketContainer";
import BasketModal from "../components/BasketModal";
import Error404 from "./404";
import FooterBis from "../components/FooterBis";
import {
  ModalProvider,
  useConnexionContext,
} from "../contexts/ConnexionContext";
import Navbar from "../components/Navbar";
import { useBasketContext } from "../contexts/BasketContext";
import ValidationBasket from "../components/ValidationBasket";

import "../styles/Panier.scss";

function Panier() {
  const { isBasketClear } = useBasketContext();
  const { authentification } = useConnexionContext();
  const [reload, setReload] = useState(false);

  if (!authentification) {
    return (
      <ModalProvider>
        <Error404 />
      </ModalProvider>
    );
  }

  return (
    <ModalProvider>
      <header>
        <Navbar />
      </header>
      <main className="basket-main">
        {isBasketClear ? (
          <BasketModal />
        ) : (
          <div className="basket-page">
            <BasketContainer reload={reload} setReload={setReload} />
            <ValidationBasket reload={reload} />
          </div>
        )}
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Panier;
