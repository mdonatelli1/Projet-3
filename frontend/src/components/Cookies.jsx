import { useState, useEffect } from "react";
import "../styles/Cookies.scss";
import cookie from "../assets/myCook.png";

function Cookies() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isClosed = localStorage.getItem("cookiesClosed");
      if (!isClosed) {
        setModal(true);
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleModal = () => {
    localStorage.setItem("cookiesClosed", "true");
    setModal(false);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <main>
      {modal && (
        <div className="modal">
          <div className="overlay" />
          <div className="modal-content">
            <div className="modalContainer">
              <p className="modalText">
                Nous utilisons <span className="italicBold">des cookies</span>{" "}
                pour personnaliser votre expérience et rendre votre visite
                magique. <br />
                En poursuivant votre navigation, vous acceptez notre utilisation
                des cookies. <br />
                <span className="goToBreak">
                  -------------- <br />
                </span>
                <span className="italicBold">
                  Découvrez comment nous protégeons votre vie privée dans notre
                  Politique de Confidentialité.
                </span>
              </p>
              <img className="cookie" src={cookie} alt="" />
            </div>
            <div
              role="button"
              className="close-modal"
              onClick={toggleModal}
              tabIndex={0}
              onKeyDown=""
            >
              ACCEPTER ET CONTINUER
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cookies;
