import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ConnexionContext = createContext();

export const useConnexionContext = () => {
  return useContext(ConnexionContext);
};

export function ModalProvider({ children }) {
  const [auth, setAuth] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [authentification, setAuthentification] = useState(
    sessionStorage.getItem("token") !== null
  );
  const [deco, setDeco] = useState();

  const logout = () => {
    if (sessionStorage.getItem("token") !== null) {
      setDeco(sessionStorage.removeItem("token"));
      window.location.href = "/";
      sessionStorage.setItem("authentification", "false");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3310/api/utilisateurs/0", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
          logout();
        });
    }
  }, [authentification]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const closeModal = () => {
    setModal(false);
    setModalTwo(false);
  };
  const toggleModalTwo = () => {
    setModal(!modal);
    setModalTwo(!modalTwo);
  };

  const contextValue = useMemo(
    () => ({
      modal,
      modalTwo,
      toggleModal,
      closeModal,
      toggleModalTwo,
      authentification,
      setAuthentification,
      auth,
      setAuth,
      logout,
      deco,
      setDeco,
      userInfo, // Ajout de userInfo au contexte
    }),
    [modal, modalTwo, authentification, userInfo]
  );

  return (
    <ConnexionContext.Provider value={contextValue}>
      {children}
    </ConnexionContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
