import React, { useState } from "react";
import axios from "axios";
import "../../styles/DeleteAccount.scss";
import { useConnexionContext } from "../../contexts/ConnexionContext";

function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showPassword, setShowPasswordDelAcc] = useState({
    password: false,
  });
  const { logout } = useConnexionContext();

  const delAccToggleShowPassword = (field) => {
    setShowPasswordDelAcc((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3310/api/utilisateurs/delete",
        { actualPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPassword("");
      setPasswordError("");
      setAccountDeleted(true);
      logout();
      window.location.href = "/";
    } catch (error) {
      setPassword("");
      console.info("Error");
      setPasswordError("Mot de passe incorrect");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="formDelAccount">
      <h2 className="titleDel">Supprimer le compte</h2>
      <div className="lineDelAccount" />{" "}
      <form className="deleteForm" onSubmit={handleDeleteAccount}>
        <label className="labelPassDel" htmlFor="password">
          Mot de passe :
        </label>
        <input
          onClick={() => {
            setPasswordError("");
          }}
          className="passwordValidDelete"
          type={showPassword.password ? "text" : "password"}
          placeholder="Entrez votre mot de passe actuel"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          className="toggle-passwordDelAcc"
          onClick={() => delAccToggleShowPassword("password")}
        >
          Voir
        </button>
        <div className="ButtDelContainer">
          <button type="submit" className="ButtDelAcc">
            Supprimer le compte
          </button>
        </div>
        {passwordError && <div className="messageDelAcc">{passwordError}</div>}
        {accountDeleted && (
          <div className="messageDelAcc">Compte supprimé avec succès.</div>
        )}
      </form>
    </main>
  );
}

export default DeleteAccount;
