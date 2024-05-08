import React, { useState } from "react";
import axios from "axios";
import "../../styles/UserPassword.scss";

function UserChangePassword() {
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Définit une fonction pour évaluer la force du mot de passe basée sur plusieurs critères
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password) && /[#$@!%*?&]/.test(password)) strength += 1;
    return Math.min(strength, 3); // Assure que la force ne dépasse pas 3
  };

  const getPasswordStrengthClass = (strength) => {
    switch (strength) {
      case 1:
        return "weak"; // Rouge
      case 2:
        return "medium"; // Orange
      case 3:
        return "strong"; // Vert
      default:
        return "inactive";
    }
  };

  // ici on met a jour l'etant au changement des infos dans les inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prevFields) => ({
      // on regarde la force du mot de passe pour le champ newPassword
      ...prevFields,
      [name]: value,
    }));
    setPasswordError("");
    setUpdateSuccess(false);
    // on regarde la force du mot de passe pour le champ newPassword
    if (name === "newPassword") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  // la on gere la soumission du formulaire
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // la on va empecher le comportement par défaut du formulaire
    const { oldPassword, newPassword, confirmPassword } = passwordFields;

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword === oldPassword) {
      setPasswordError(
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@!%&*?]{8,15}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Le nouveau mot de passe doit respecter le format requis."
      );
      return;
    }

    // logique pour récupérer token JWT stocké localement
    const token = sessionStorage.getItem("token");
    try {
      // Envoie une requête PUT pour mettre à jour le mot de passe, incluant le token JWT pour l'authentification
      await axios.put(
        `http://localhost:3310/api/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      setPasswordError(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du mot de passe."
      );
    }
  };

  return (
    <form className="form-psw-container" onSubmit={handleFormSubmit}>
      <h2 className="title-psw">Mot de passe</h2>
      <div className="line-user-psw" />{" "}
      <div>
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
      <div className="password-input-container">
        <label className="labels-psw" htmlFor="nom">
          Ancien mot de passe
        </label>
        <input
          className="input-psw"
          type={showPassword.oldPassword ? "text" : "password"}
          name="oldPassword"
          value={passwordFields.oldPassword}
          onChange={handleInputChange}
          autoComplete="current-password"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("oldPassword")}
        >
          Voir
        </button>
      </div>
      <div className="password-input-container">
        <label className="labels-psw" htmlFor="nom">
          Nouveau mot de passe
        </label>
        <div className="npsw-strenght">
          <input
            className="input-psw"
            type={showPassword.newPassword ? "text" : "password"}
            name="newPassword"
            value={passwordFields.newPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />{" "}
          <div className="password-secure-indicator">
            {[...Array(3)].map((_, index) => {
              const isActive = index < passwordStrength;
              const strengthClass = getPasswordStrengthClass(passwordStrength);
              const key = `strength-bar-${isActive ? strengthClass : "inactive"}-${index}`;
              return (
                <div
                  key={key}
                  className={`secure-bar ${isActive ? strengthClass : ""}`}
                />
              );
            })}
          </div>
        </div>{" "}
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("newPassword")}
        >
          Voir
        </button>
      </div>
      <div className="password-input-container">
        <label className="labels-psw" htmlFor="nom">
          Confirmation nouveau mot de passe
        </label>
        <input
          className="input-psw"
          type={showPassword.confirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={passwordFields.confirmPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => toggleShowPassword("confirmPassword")}
        >
          Voir
        </button>
      </div>
      <div className="submit-btn-psw">
        <button className="button-psw-send" type="submit">
          Changer le mot de passe
        </button>
        {updateSuccess && (
          <div className="psw-done">
            Mise à jour de votre mot de passe effectuée.
          </div>
        )}
      </div>
    </form>
  );
}

export default UserChangePassword;
