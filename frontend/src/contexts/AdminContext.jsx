import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

// allez on crée un contexte pour partager des données et fonctions entre composants
const AdminContext = createContext();

export function AdminProvider({ children }) {
  // ici on initialise par defaut "activeSection" avec la valeur "AdminCatalogue"
  const [activeSection, setActiveSection] = useState("AdminCatalogue");

  // Fonction pour changer la section active
  const switchSection = (sectionKey) => {
    // console.info("L'appel de changement vers", sectionKey);
    setActiveSection(sectionKey);
  };

  // on met en memoire la vleur activeSection et la fonction switchSection
  const value = useMemo(
    () => ({
      activeSection,
      switchSection,
    }),
    [activeSection]
  );

  // bah la retourne le Provider avec les valeurs à partager
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

// la ca verifie que les enfants sont en props
AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// la ca nou permet de recuperer les valeurs partagées
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
}

export default AdminContext;
