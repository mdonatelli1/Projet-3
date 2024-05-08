import axios from "axios";
import { useState } from "react";

import { useConnexionContext } from "../contexts/ConnexionContext";

import flower from "../assets/Group 19.png";

import "../styles/Connexion.scss";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&?])[A-Za-z\d#$@!%&?]{8,15}$/;

function Connexion() {
  const { modal, modalTwo, closeModal, toggleModalTwo, setAuthentification } =
    useConnexionContext();
  const [emailReg, setEmailReg] = useState("");
  const [emailCo, setEmailCo] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordCo, setPasswordCo] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setloginFail] = useState(false);
  const [passwordFormat, setPasswordFormat] = useState(false);

  const handleSubmitCo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3310/api/auth/login",
        {
          email: emailCo,
          password: passwordCo,
        }
      );

      const { token } = response.data;

      setAuthentification(true);
      sessionStorage.setItem("authentification", "true");
      sessionStorage.setItem("token", token);
      window.location.reload();
      setLoginSuccess(true);
      console.info("Authentication success:", response.data);
    } catch (error) {
      console.error("Authentication failed:", error);
      setloginFail(true);
    }
  };

  const closeAccountCreated = () => {
    setAccountCreated(false);
  };

  const handleInputReg = (e) => {
    if (e.target.id === "email") {
      const email = e.target.value;
      setEmailReg(email);

      if (!emailRegex.test(email)) {
        setEmailError("Le format du mail n'est pas correct.");
      } else {
        setEmailError("");
      }
    } else if (e.target.id === "passwordLog") {
      setPasswordReg(e.target.value);
    } else if (e.target.id === "passwordConfirmation") {
      const confirmation = e.target.value;
      setPasswordConfirmation(confirmation);
      setPasswordError(passwordReg !== confirmation);
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();

    if (passwordReg === passwordConfirmation) {
      if (!passwordRegex.test(passwordReg)) {
        setPasswordFormat(true);
        return;
      }

      axios
        .post("http://localhost:3310/api/utilisateurs", {
          email: emailReg,
          password: passwordReg,
        })
        .then(() => {
          setEmailCo("");
          setPasswordCo("");
          setAccountCreated(true);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.warn(error.response.data);
          } else {
            console.error("Erreur lors de la création du compte :", error);
          }
        });
    } else {
      setPasswordFormat(true);
      setPasswordError(false);
    }
  };

  if (modal) {
    document.body.classList.add("active-modalCo");
  } else {
    document.body.classList.remove("active-modalCo");
  }

  if (modalTwo) {
    document.body.classList.add("active-modalTwoCo");
  } else {
    document.body.classList.remove("active-modalTwoCo");
  }

  return (
    <>
      {modal && (
        <div className="modalCo">
          <div
            onClick={() => {
              closeModal();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                toggleModalTwo();
              }
            }}
            tabIndex={0}
            role="button"
            className="overlayCo"
            aria-label="Close Modal"
          />
          <div
            className={`borderCo1 ${loginSuccess ? "borderCo1Success" : "borderCo1"}`}
          />
          <div className="modal-contentCo">
            <div className="borderCo">
              {loginSuccess ? "" : <h2 className="titleCo">SE CONNECTER</h2>}
              <div className="modalContainerCo">
                {loginSuccess ? (
                  <h3 className="AuthSuccess">Connexion réussie !</h3>
                ) : (
                  <>
                    <img className="flowerCo" src={flower} alt="" />
                    <form className="formCo" onSubmit={handleSubmitCo}>
                      <div>
                        <label className="labelHidden" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="inputCo"
                          placeholder="Email"
                          type="email"
                          id="emailCo"
                          onClick={() => {
                            setloginFail(false);
                          }}
                          value={emailCo}
                          onChange={(e) => setEmailCo(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="labelHidden" htmlFor="password">
                          Mdp
                        </label>
                        <input
                          className="inputCo"
                          placeholder="Mot de passe"
                          type="password"
                          onClick={() => {
                            setloginFail(false);
                          }}
                          id="passwordCo"
                          value={passwordCo}
                          onChange={(e) => setPasswordCo(e.target.value)}
                          required
                        />
                      </div>
                      <p className="forgotCo">Mot de passe oublié ?</p>
                      {loginFail && (
                        <p className="errorLogin">Identifiants incorrects</p>
                      )}
                      <button className="buttonCo" type="submit">
                        Se connecter
                      </button>
                    </form>
                    <div className="ligneCo" />
                    <p className="noAcc">
                      Pas encore de compte ?
                      <span
                        onClick={toggleModalTwo}
                        className="noAccountCo"
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            toggleModalTwo();
                          }
                        }}
                        tabIndex={0}
                        role="button"
                      >
                        Crée ton compte
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {modalTwo && (
        <div className="modalCo">
          <div
            onClick={() => {
              closeModal();
              closeAccountCreated();
            }}
            className="overlayCo"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                toggleModalTwo();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Close Modal"
          />
          <div className="borderCo1Bis" />
          <div className="modal-contentCo">
            <div className="borderCoBis">
              <h2 className="titleCoBis">CREER UN COMPTE</h2>
              <div className="modalContainerCo">
                <img className="flowerCoBis" src={flower} alt="" />
                <form className="formCoBis" onSubmit={handleSubmitReg}>
                  <div>
                    <label className="labelHidden" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputCoBis"
                      onClick={closeAccountCreated}
                      placeholder="Email"
                      type="email"
                      id="email"
                      onChange={handleInputReg}
                      required
                    />
                    {emailError && <p className="errorMail">{emailError}</p>}
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Mot de passe
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Mot de passe"
                      onClick={() => {
                        closeAccountCreated();
                        setPasswordFormat(false);
                      }}
                      type="password"
                      id="passwordLog"
                      onChange={handleInputReg}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelHidden" htmlFor="password">
                      Confirmation du mot de passe
                    </label>
                    <input
                      className="inputCoBis"
                      placeholder="Confirmation du mot de passe"
                      onClick={() => {
                        closeAccountCreated();
                        setPasswordFormat(false);
                      }}
                      type="password"
                      id="passwordConfirmation"
                      onChange={(e) => handleInputReg(e)}
                      required
                    />
                    {passwordFormat && (
                      <p className="error">
                        Le format du mot de passe n'est pas respecté.
                      </p>
                    )}
                    {passwordError && (
                      <p className="error2">
                        Les mots de passe ne correspondent pas.
                      </p>
                    )}
                  </div>
                  {accountCreated && (
                    <p className="success">
                      Merci, votre compte à bien été créé.
                    </p>
                  )}
                  <button className="buttonCoBis" type="submit">
                    CREÉ LE COMPTE
                  </button>
                  <p className="noAcc">
                    Vous avez déjà un compte ?
                    <span
                      onClick={toggleModalTwo}
                      className="noAccountCo"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          toggleModalTwo();
                        }
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      Connectez vous
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Connexion;
