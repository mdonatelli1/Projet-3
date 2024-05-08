import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Delete from "../../assets/Delete.svg";
import Modif from "../../assets/Modif.svg";

import "../../styles/AdminArticle.scss";

function AdminArticles({
  handleModif,
  id,
  image,
  vendeuse,
  nom,
  prix,
  nbVentes,
}) {
  const [deleted, setDeleted] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:3310/api/articles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .catch((err) => console.error(err));
    setDeleted(true);
  };

  return (
    <div>
      {!deleted && (
        <>
          <div className="articles-admin">
            <img
              src={`http://localhost:3310${image}`}
              alt="a"
              className={`img-article article-image ${vendeuse}`}
            />
            <div className="info_articles_admin">
              <p className="article-admin-nom">{nom}</p>
              <div className="line-info-article"> </div>
              <p>{vendeuse}</p>
            </div>
            <div className="prix_article_admin">
              <p>{prix}€</p>
            </div>
            <div className="vendu">
              <p className="article-vendu">VENDU</p>
              <p className="article-nombre-vendu">{nbVentes}</p>
            </div>
            <button
              type="button"
              className="admin-cadre"
              onClick={() => handleModif(id)}
            >
              <img src={Modif} alt="Modif" className="admin-img" />
            </button>
            <button
              type="button"
              className="admin-cadre"
              onClick={() => handleDelete()}
            >
              <img src={Delete} alt="Delete" className="admin-img" />
            </button>
          </div>
          <div className="end-line" />
        </>
      )}
    </div>
  );
}

AdminArticles.propTypes = {
  handleModif: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  vendeuse: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
  nbVentes: PropTypes.number.isRequired,
};

export default AdminArticles;
