import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterBis from "../components/FooterBis";
import Connexion from "../components/Connexion";
import { ModalProvider } from "../contexts/ConnexionContext";
import Sellers from "../components/Sellers";
import "../styles/About.scss";

function About() {
  const [selectedSeller, setSelectedSeller] = useState(null);

  const sellerTextMap = {
    Dahlia:
      "Dahlia avec ses mains habiles et son savoir-faire ancestral, elle donne vie à des créations uniques et enchanteresses. Chaque pièce, sculptée avec passion et maîtrise, révèle la beauté naturelle du bois, transformant des morceaux d'écorce en œuvres d'art qui respirent la magie et l'authenticité.",
    Doireann:
      " Doireann avec ses aiguilles agiles et son savoir-faire magistral, elle crée des produits faits main qui captivent l'imagination et réchauffent les cœurs. Chaque maille est tissée avec passion et délicatesse, transformant la laine en œuvres d'art uniques et enveloppantes, offrant ainsi une touche de confort et de magie à chaque instant de votre vie.",
    Achlys:
      " Achlys, une illustratrice talentueuse déploie sa magie. Avec son crayon comme baguette et sa palette comme sortilège, elle donne vie à des créations uniques et captivantes. Chaque trait est tracé avec une grâce infinie, chaque couleur est choisie avec soin, faisant de chaque illustration une fenêtre ouverte sur un univers féerique où l'imagination prend son envol.",
    Elya: " Elya, une experte en polymère manie la matière avec virtuosité. De ses mains habiles naissent des créations faites main, empreintes de magie et de créativité. Chaque pièce, modelée avec passion et précision, révèle un monde de couleur et de forme, transformant la polymère en bijoux et en objets d'art uniques, qui éblouissent par leur beauté et leur originalité.",
  };

  const handleSellerSelect = (sellerName) => {
    setSelectedSeller(sellerName);
  };

  const getTextForSeller = () => {
    return selectedSeller
      ? sellerTextMap[selectedSeller]
      : "Plongez dans un monde artisanal envoûtant, où chaque création est une porte ouverte vers la magie. Dans ce royaume féérique du Comptoir des Seelies, quatre fées bienveillantes veillent sur chaque création avec une grâce infinie. Chaque pièce est imprégnée de passion et de compétence, faisant du Comptoir un lieu où l'extraordinaire devient réalité.";
  };

  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <Sellers onSellerSelect={handleSellerSelect} />
        <p className="text">{getTextForSeller()}</p>
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default About;
