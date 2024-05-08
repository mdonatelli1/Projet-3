import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

import confAjout from "../../assets/confAjout.png";
import confModif from "../../assets/confModif.png";

function ModalArticle({
  articleId,
  submit,
  addArticleIsOpen,
  setAddArticleIsOpen,
  formData,
  setFormData,
}) {
  const [articleAdded, setArticleAdded] = useState(false);
  // Initialisation de la state stockant l'image
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { id, type, name, value, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name || id]: newValue,
    }));
  };

  const handleCreate = async () => {
    // On créait un Formulaire
    const newArticleData = new FormData();

    // On parcoure la state et on ajoute ses données dans le Formulaire
    for (const key in formData) {
      if (formData[key]) {
        newArticleData.append(key, formData[key]);
      }
    }
    newArticleData.append("file", file);

    // On initialise les variables (1)
    const body = {};
    let filePath = "";

    // On envoie l'image dans le Back et on récupère les données du Formulaire
    await axios
      .post("http://localhost:3310/upload", newArticleData)
      .then((response) => {
        // On récupère les valeurs (2)
        const {
          name,
          price,
          creatrice,
          bijoux,
          deco,
          illustration,
          vetement,
          accessoire,
          thematique,
        } = response.data.body;
        const { filename } = response.data.file;

        // et on les attribue aux variables initialisées (3)
        body.name = name;
        body.price = price;
        body.creatrice = creatrice;
        body.bijoux = bijoux;
        body.deco = deco;
        body.illustration = illustration;
        body.vetement = vetement;
        body.accessoire = accessoire;
        body.thematique = thematique;
        filePath = `/static/${filename}`;
      })
      .catch((err) => console.error(err));

    // On envoie les données du Formulaire dans le Back
    const token = sessionStorage.getItem("token");
    await axios
      .post(
        "http://localhost:3310/api/articles/",
        {
          // On envoie les variables body et filePath dans le BACK (4)
          nom: body.name,
          image: filePath,
          prix: body.price,
          vendeuse: body.creatrice,
          bijoux: body.bijoux,
          deco: body.deco,
          illustration: body.illustration,
          vetement: body.vetement,
          accessoire: body.accessoire,
          thematique: body.thematique,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));

    // On retire la modale d'ajout et on affiche une popup de confirmation
    setAddArticleIsOpen(false);
    setArticleAdded(true);
    setTimeout(() => {
      setArticleAdded(false);
      window.location.reload();
    }, 3000);
  };

  const handleSave = async () => {
    // On créait un Formulaire
    const newArticleData = new FormData();

    // On parcoure la state et on ajoute ses données dans le Formulaire
    for (const key in formData) {
      if (formData[key]) {
        newArticleData.append(key, formData[key]);
      }
    }
    newArticleData.append("file", file);

    // On initialise les variables (1)
    const body = {};
    let filePath = "";

    // On envoie l'image dans le Back et on récupère les données du Formulaire
    await axios
      .post("http://localhost:3310/upload", newArticleData)
      .then((response) => {
        // On récupère les valeurs (2)
        const {
          name,
          price,
          creatrice,
          bijoux,
          deco,
          illustration,
          vetement,
          accessoire,
          thematique,
        } = response.data.body;

        let filename;
        if (response.data.file) {
          filename = response.data.file.filename;
        } else {
          filename = formData.file;
        }

        // et on les attribue aux variables initialisées (3)
        body.name = name;
        body.price = price;
        body.creatrice = creatrice;
        body.bijoux = bijoux;
        body.deco = deco;
        body.illustration = illustration;
        body.vetement = vetement;
        body.accessoire = accessoire;
        body.thematique = thematique;
        filePath = `/static/${filename}`;
      })
      .catch((err) => console.error(err));

    // On envoie les données du Formulaire dans le Back
    const token = sessionStorage.getItem("token");
    await axios
      .put(
        `http://localhost:3310/api/articles/${articleId}`,
        {
          // On envoie les variables body et filePath dans le BACK (4)
          nom: body.name,
          image: filePath,
          prix: body.price,
          vendeuse: body.creatrice,
          bijoux: body.bijoux,
          deco: body.deco,
          illustration: body.illustration,
          vetement: body.vetement,
          accessoire: body.accessoire,
          thematique: body.thematique,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));

    // On retire la modale d'ajout et on affiche une popup de confirmation
    setAddArticleIsOpen(false);
    setArticleAdded(true);
    setTimeout(() => {
      setArticleAdded(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <>
      {/* Modal de confirmation */}
      {articleAdded && (
        <img
          style={{
            position: "fixed",
            top: "50vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          src={submit === "modif" ? confModif : confAjout}
          alt="confirmation"
        />
      )}
      {/* Modal d'ajout d'article */}
      {addArticleIsOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setAddArticleIsOpen(false)}
            id="admin-backdrop"
          />
          <div id="addArticle">
            <form>
              <div id="admin-modal-left">
                <label htmlFor="name">NOM DU PRODUIT</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  required
                />
                <label htmlFor="creatrice">CREATRICE</label>
                <select
                  value={formData.creatrice}
                  onChange={handleChange}
                  id="creatrice"
                  required
                >
                  <option value="">---</option>
                  <option value="Dahlia">Dahlia</option>
                  <option value="Doireann">Doireann</option>
                  <option value="Achlys">Achlys</option>
                  <option value="Elya">Elya</option>
                </select>
                <label htmlFor="price">PRIX</label>
                <div id="admin-modal-price">
                  <input
                    value={formData.price}
                    onChange={handleChange}
                    id="price"
                    type="number"
                    required
                  />
                  <p>€</p>
                </div>
                <h2>TYPES</h2>
                <div className="admin-ligne" />
                <div id="admin-modal-types">
                  <input
                    value={formData.bijoux}
                    checked={formData.bijoux}
                    onChange={handleChange}
                    id="bijoux"
                    type="checkbox"
                  />
                  <label htmlFor="bijoux">BIJOUX</label>
                  <input
                    value={formData.deco}
                    checked={formData.deco}
                    onChange={handleChange}
                    id="deco"
                    type="checkbox"
                  />
                  <label htmlFor="deco">DECORATION</label>
                  <input
                    value={formData.illustration}
                    checked={formData.illustration}
                    onChange={handleChange}
                    id="illustration"
                    type="checkbox"
                  />
                  <label htmlFor="illustration">ILLUSTRATION</label>
                  <input
                    value={formData.vetement}
                    checked={formData.vetement}
                    onChange={handleChange}
                    id="vetement"
                    type="checkbox"
                  />
                  <label htmlFor="vetement">VETEMENT</label>
                  <input
                    value={formData.accessoire}
                    checked={formData.accessoire}
                    onChange={handleChange}
                    id="accessoire"
                    type="checkbox"
                  />
                  <label htmlFor="accessoire">ACCESSOIRE</label>
                </div>
              </div>
              <div id="admin-modal-right">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <h2>THEMATIQUES</h2>
                <div className="admin-ligne" />
                <div id="admin-modal-thematiques">
                  <input
                    value="STEAMPUNK"
                    checked={formData.thematique === "STEAMPUNK"}
                    onChange={handleChange}
                    id="steampunk"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="steampunk">STEAMPUNK</label>
                  <input
                    value="FANTASY"
                    checked={formData.thematique === "FANTASY"}
                    onChange={handleChange}
                    id="fantasy"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="fantasy">FANTASY</label>
                  <input
                    value="MEDIEVAL"
                    checked={formData.thematique === "MEDIEVAL"}
                    onChange={handleChange}
                    id="medieval"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="medieval">MEDIEVAL</label>
                  <input
                    value="MAGIE"
                    checked={formData.thematique === "MAGIE"}
                    onChange={handleChange}
                    id="magie"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="magie">MAGIE</label>
                  <input
                    value="FEERIE"
                    checked={formData.thematique === "FEERIE"}
                    onChange={handleChange}
                    id="feerie"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="feerie">FEERIE</label>
                  <input
                    value="COTTAGE CORE"
                    checked={formData.thematique === "COTTAGE CORE"}
                    onChange={handleChange}
                    id="cottage"
                    type="radio"
                    name="thematique"
                  />
                  <label htmlFor="cottage">COTTAGE CORE</label>
                </div>
                {submit === "add" ? (
                  <button type="button" onClick={handleCreate}>
                    AJOUTER
                  </button>
                ) : (
                  submit === "modif" && (
                    <button type="button" onClick={handleSave}>
                      ENREGISTRER
                    </button>
                  )
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

ModalArticle.propTypes = {
  articleId: PropTypes.number.isRequired,
  submit: PropTypes.string.isRequired,
  addArticleIsOpen: PropTypes.bool.isRequired,
  setAddArticleIsOpen: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creatrice: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    bijoux: PropTypes.bool.isRequired,
    deco: PropTypes.bool.isRequired,
    illustration: PropTypes.bool.isRequired,
    vetement: PropTypes.bool.isRequired,
    accessoire: PropTypes.bool.isRequired,
    thematique: PropTypes.string.isRequired,
    file: PropTypes.any, // eslint-disable-line
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ModalArticle;
