import React, { useState } from "react";
import PropTypes from "prop-types";
import Cadre from "./Cadre";
import UserInfos from "./UserInfos";
import UserPassword from "./UserPassword";

function CadreProfil({ sectionActive }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse1: "",
    adresse2: "",
    ville: "",
    codePostal: "",
    pays: "",
    telephone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.info("Submitted Data:", formData);
  };

  return (
    <Cadre>
      {/* bon la on conditionne la selection du bouton  */}
      {sectionActive === "MesInformations" && (
        <UserInfos
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      {sectionActive === "ChangerMonMotDePasse" && (
        <UserPassword
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Cadre>
  );
}
CadreProfil.propTypes = {
  sectionActive: PropTypes.string.isRequired,
};

export default CadreProfil;
