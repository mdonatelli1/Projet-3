// Attention composant servant a gérer la navigation du block de gauche MenuProfil

import React from "react";

import Cadre from "./Cadre";
import DeleteAccount from "./DeleteAccount";
import HistoriqueDesCommandes from "./HistoriqueDesCommandes";
import MenuProfil from "./MenuProfil";
import MesFavoris from "./MesFavoris";
import { useProfile } from "./ProfileContext";
import UserCreditCard from "./UserCreditCard";
import UserInfos from "./UserInfos";
import UserPassword from "./UserPassword";

import "../../styles/ProfilContainer.scss";

function ProfilContainer() {
  const { sectionActive } = useProfile();

  const renderContent = () => {
    switch (sectionActive) {
      case "MesInformations":
        return <UserInfos />;
      case "InformationsDePaiement":
        return <UserCreditCard />;
      case "MotDePasse":
        return <UserPassword />;
      case "MesFavoris":
        return <MesFavoris />;
      case "HistoriqueDesCommandes":
        return <HistoriqueDesCommandes />;
      case "SupprimerMonCompte":
        return <DeleteAccount />;
      default:
        return <UserInfos />;
    }
  };

  return (
    <div className="profil-container">
      <MenuProfil />
      <Cadre>{renderContent()}</Cadre>
    </div>
  );
}

export default ProfilContainer;
