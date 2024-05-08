import { Link } from "react-router-dom";
import React from "react";
import Connexion from "../components/Connexion";
import FooterBis from "../components/FooterBis";
import { ModalProvider } from "../contexts/ConnexionContext";
import Navbar from "../components/Navbar";

import Mushroom from "../assets/mushroom.svg";
import Vector from "../assets/Vector.svg";

import "../styles/404.scss";

function Page404() {
  return (
    <ModalProvider>
      <Navbar />
      <Connexion />
      <div className="body404">
        <article className="Info404">
          <div className="Text404">
            <h1 className="Title404">OPPS !</h1>
            <p className="Subtitle404">
              Vous avez égaré votre chemin dans la forêt enchantée.
            </p>
            <p className="Text1404">
              Nous n'avons pas pu trouver la page que vous cherchez. Il semble
              que vous ayez pris un chemin mystérieux.
            </p>
            <p className="Text2404">
              Revenez à la lumière et continuez votre exploration magique avec
              nous !
            </p>
          </div>
          <div className="container404">
            <img src={Vector} alt="star" />
            <Link to="/" className="button404">
              RETOURNER A L'ACCUEIL
            </Link>
            <img src={Vector} alt="star" />
          </div>
        </article>
        <article className="number404">
          <p className="four1404">4</p>
          <img src={Mushroom} alt="mushroom" className="mush404" />
          <p className="four2404">4</p>
        </article>
      </div>
      <FooterBis />
    </ModalProvider>
  );
}

export default Page404;
