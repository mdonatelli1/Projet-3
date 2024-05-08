import React, { useEffect, useState } from "react";
import "../../styles/FestivalsAdmin.scss";
import axios from "axios";

function FestivalsAdmin() {
  const [festivals, setFestivals] = useState([]);
  const [addFestivalIsOpen, setAddFestivalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nom: "",
    lieu: "",
    date: "",
  });

  // comme d'hab' on va recup les festivals
  const recupAccessFestivals = () => {
    axios
      .get("http://localhost:3310/api/festivals")
      .then((response) => {
        setFestivals(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // on se sert du useEffect pour charger les festivals "en live"
  useEffect(() => {
    recupAccessFestivals();
  }, []);

  // ici on va gérer l'ajout ou la mise à jour d'un festival comme c pas public on recup le token pour voir si on a le droit de faire ca
  const handleSaveFestival = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // bah là j'ai trouvé ca plus propre de mettre en condition les routes qui sont en relation avec ce qu'on souhaite faire ajouter ou editer...
    const url = isEditing
      ? `http://localhost:3310/api/festivals/${formData.id}`
      : "http://localhost:3310/api/festivals";

    // C un peu repetitif, je sais, j'ai tenté de faire une simplification et j'me suis perdu :'(
    if (isEditing) {
      // en gros pour résumer si on edit on récup l'id, et on fait un put (edit)
      axios
        .put(url, formData, config)
        .then(() => {
          setAddFestivalIsOpen(false);
          setIsEditing(false);
          setFormData({ id: null, nom: "", lieu: "", date: "" });
          recupAccessFestivals();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // sinon on fait un post donc pas besoin d'id
      axios
        .post(url, formData, config)
        .then(() => {
          setAddFestivalIsOpen(false);
          setIsEditing(false);
          setFormData({ id: null, nom: "", lieu: "", date: "" });
          recupAccessFestivals();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // ici comme d'hab, on fait le delete pour supprimer un festival via son id, et là aussi on a besoin du token pour ca car c pas public.
  const handleDeleteFestival = (id) => {
    const token = sessionStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://localhost:3310/api/festivals/${id}`, config)
      .then(() => {
        recupAccessFestivals();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // cette fonction nous permet d'initialiser le formulaire pour l'ajout ou la mise à jour...
  const showFestivalForm = (
    festival = { id: null, nom: "", lieu: "", date: "" }
  ) => {
    setFormData(festival);
    setAddFestivalIsOpen(true);
    setIsEditing(!!festival.id);
  };

  return (
    <div className="fest-admin-cont">
      <h2 className="fest-admin-title">Liste des Festivals</h2>
      <button
        type="button"
        className="btn-fest-add"
        onClick={() => {
          if (addFestivalIsOpen) {
            setAddFestivalIsOpen(false);
            setIsEditing(false);
            setFormData({ id: null, nom: "", lieu: "", date: "" });
          } else {
            showFestivalForm();
            setIsEditing(false);
          }
        }}
      >
        Ajouter un Festival
      </button>

      {addFestivalIsOpen && (
        <div>
          <form onSubmit={handleSaveFestival}>
            <input
              type="text"
              className="input-fest-admin"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              placeholder="Nom du Festival"
              required
            />
            <input
              type="text"
              className="input-fest-admin"
              value={formData.lieu}
              onChange={(e) =>
                setFormData({ ...formData, lieu: e.target.value })
              }
              placeholder="Lieu"
              required
            />
            <input
              type="date"
              className="input-fest-admin"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              placeholder="Date"
              required
            />
            <button className="btn-fest-save" type="submit">
              Enregistrer
            </button>
            <button
              className="btn-fest-cancel"
              type="button"
              onClick={() => setAddFestivalIsOpen(false)}
            >
              Annuler
            </button>
          </form>
        </div>
      )}

      <table id="array-fest-container">
        <thead id="array-fest-title">
          <tr>
            <th>Nom</th>
            <th>Lieu</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="array-fest-data">
          {festivals.map((festival) => (
            <tr key={festival.id}>
              <td>{festival.nom}</td>
              <td>{festival.lieu}</td>
              <td>{new Date(festival.date).toLocaleDateString()}</td>
              <td>
                <button
                  type="button"
                  className="btn-fest-edit"
                  onClick={() => showFestivalForm(festival)}
                >
                  Éditer
                </button>
                <button
                  type="button"
                  className="btn-fest-delete"
                  onClick={() => handleDeleteFestival(festival.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FestivalsAdmin;
