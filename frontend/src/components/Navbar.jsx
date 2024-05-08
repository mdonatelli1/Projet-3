/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useConnexionContext } from "../contexts/ConnexionContext";
import "../styles/Navbar.scss";
import logo from "../assets/Logo_Le_comptoir_des_seelies.svg";
import logout2 from "../assets/logout2.svg";
import panierIcon from "../assets/panier_icon.svg";
import utilisateurIcon from "../assets/utilisateur_icon.svg";

function Navbar() {
  const { toggleModal, authentification, logout, userInfo } =
    useConnexionContext();
  const [showLinks, setShowlinks] = useState(false);
  const handleShowLinks = () => {
    setShowlinks(!showLinks);
  };

  return (
    <nav>
      <div className={`navbar ${showLinks ? "show-nav" : ""}`}>
        <button
          type="button"
          className="navbar_burger"
          onClick={handleShowLinks}
          aria-label="aaa"
        >
          <span className="burger_line"> </span>
        </button>
        <img src={logo} alt="" className="img_logo" />
        <ul className="nav_links">
          <li className="navbar_item">
            <Link to="/">ACCUEIL</Link>
          </li>
          <li className="navbar_item">
            <Link to="/catalogue">CATALOGUE</Link>
          </li>
          <li className="navbar_item">
            <Link to="/About">A PROPOS</Link>
          </li>
        </ul>
        <div className="items_nav">
          {authentification ? (
            <div
              className="modalToogle"
              role="button"
              tabIndex={0}
              onClick={logout}
            >
              <img src={logout2} alt="basket_icon" />
            </div>
          ) : null}
          {authentification ? (
            <Link to="/panier">
              <img className="basketNav" src={panierIcon} alt="basket_icon" />
            </Link>
          ) : (
            ""
          )}
          {authentification ? (
            <Link to={userInfo && userInfo.seelie ? "/admin" : "/profil"}>
              <img src={utilisateurIcon} alt="user_icon" />
            </Link>
          ) : (
            <div
              className="modalToogle"
              role="button"
              tabIndex={0}
              onClick={toggleModal}
            >
              <img src={utilisateurIcon} alt="user_icon" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
