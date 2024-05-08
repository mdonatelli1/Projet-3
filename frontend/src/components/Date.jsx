import PropTypes from "prop-types";
import "../styles/Date.scss";
import Loca from "../assets/Layer 10.png";

function Date({ nom, lieu, date }) {
  return (
    <div className="containerD">
      <div className="dateD">
        <p className="numberD">{date}</p>
      </div>
      <div className="lineD" />
      <div className="locaD">
        <p className="placeD">{nom}</p>
        <div className="adressD">
          <img src={Loca} alt="localisation" className="logoD" />
          <p className="textD">{lieu !== null ? lieu : "Lieu non spécifié"}</p>
        </div>
      </div>
    </div>
  );
}

Date.propTypes = {
  nom: PropTypes.string,
  lieu: PropTypes.string,
  date: PropTypes.string,
};

Date.defaultProps = {
  nom: "Nom non spécifié",
  date: "Date non spécifiée",
  lieu: null,
};

export default Date;
