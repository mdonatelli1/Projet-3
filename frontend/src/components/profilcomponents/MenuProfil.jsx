import React from "react";
import { useProfile } from "./ProfileContext";
import "../../styles/MenulProfil.scss";

const sections = [
  { key: "MesInformations", label: "Mes Informations" },
  { key: "MotDePasse", label: "Changer de mot de passe" },
  { key: "MesFavoris", label: "Mes Favoris" },
  { key: "HistoriqueDesCommandes", label: "Historique Des Commandes" },
  { key: "SupprimerMonCompte", label: "Supprimer Mon Compte" },
];

function MenuProfil() {
  const { sectionActive, switchSection } = useProfile();

  const handleKeyDown = (event, sectionKey) => {
    // Prettier et Eslint m'ont un peu embeté afin d'ajouter l'appel par le clavier
    if (event.key === "Enter") {
      switchSection(sectionKey);
    }
  };

  const menuItems = sections.map((section) => (
    <div
      key={section.key}
      className={`item-menu ${sectionActive === section.key ? "actif" : ""}`}
      onClick={() => switchSection(section.key)}
      onKeyDown={(event) => handleKeyDown(event, section.key)}
      role="button"
      tabIndex={0}
    >
      {section.label}
    </div>
  ));

  return (
    <div className="menu_profil_container">
      <div className="menu_profil_title">Profil</div>
      <div className="menu_profil">{menuItems}</div>
    </div>
  );
}

export default MenuProfil;
