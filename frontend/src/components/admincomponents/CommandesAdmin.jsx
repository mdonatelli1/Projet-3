import axios from "axios";
import React, { useEffect, useState } from "react";
import CommandeDetailsModal from "./CommandeDetailModal";

import "../../styles/CommandesAdmin.scss";

function CommandesAdmin() {
  const [sortedField, setSortedField] = useState(null);
  const [order, setOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommandeDetails, setSelectedCommandeDetails] = useState({
    id: "",
    articles: [],
  });

  const calculerTotal = (articles) => {
    return articles.reduce((acc, article) => {
      const prix = parseFloat(article.prix);
      const quantite = parseInt(article.quantite, 10);
      if (!Number.isNaN(prix) && !Number.isNaN(quantite)) {
        return acc + prix * quantite;
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:3310/api/commandes/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setInitialData(response.data);
        // console.info("La reponse du back :", response.data);
      })
      .catch((error) => {
        console.error("Il y a eu un problème avec la requête Axios", error);
      });
  }, []);

  function getStatusClass(statut) {
    const lowerCaseStatut = statut.toLowerCase(); // ici on change le statut en minuscules car j'avais un soucis de recuperationd e données ca ne marchait pas
    switch (lowerCaseStatut) {
      case "livrée":
        return "status-delivered";
      case "en préparation":
        return "status-in-preparation";
      case "annulée":
        return "status-cancelled";
      default:
        return "";
    }
  }

  const handleCommandeClick = async (commandeId) => {
    const response = await axios.get(
      `http://localhost:3310/api/commandes/details/${commandeId}`,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );

    if (response.data && response.data.length > 0) {
      const commandeDetails = {
        id: response.data[0].id.toString(),
        statut: response.data[0].statut || "",
        articles:
          response.data.map((article) => ({
            nom: article.articleNom || "",
            prix: article.articlePrix || "",
            quantite: article.quantite || "",
          })) || "",
        total: calculerTotal(
          response.data.map((article) => ({
            prix: article.articlePrix || "",
            quantite: article.quantite || "",
          }))
        ),
      };
      console.info(
        "Détails de la commande définis pour les props:",
        commandeDetails
      );
      setSelectedCommandeDetails(commandeDetails);
      setIsModalOpen(true);
    } else {
      console.error("Aucune donnée trouvée pour cette commande");
    }
  };

  const sortData = (field) => {
    if (sortedField === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setOrder("asc");
    }

    const sortedArray = [...data].sort((a, b) => {
      if (field === "date") {
        const dateA = new Date(a.date_commande);
        const dateB = new Date(b.date_commande);
        return (dateA - dateB) * (order === "asc" ? 1 : -1);
      }

      if (field === "nomAcheteur") {
        const nameA = a.nomAcheteur ? a.nomAcheteur.toUpperCase() : "";
        const nameB = b.nomAcheteur ? b.nomAcheteur.toUpperCase() : "";
        return (nameA < nameB ? -1 : 1) * (order === "asc" ? 1 : -1);
      }

      if (field === "statut") {
        const statutA = a.statut.toUpperCase();
        const statutB = b.statut.toUpperCase();
        return (statutA < statutB ? -1 : 1) * (order === "asc" ? 1 : -1);
      }

      return 0;
    });
    setData(sortedArray);
  };

  // Merci stackoverflow pour ce qui suit !
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("fr-FR")} ${date.toLocaleTimeString("fr-FR")}`;
  };

  const formatTotal = (total) => {
    return `${total.toFixed(2)} €`;
  };

  const resetSorting = () => {
    setSortedField(null);
    setOrder("asc");
    setData(initialData);
  };

  return (
    <div>
      <div className="orders-container">
        <h2 className="tilte-admin-command">Les Commandes</h2>
        <div className="filter-command-buttons">
          <button type="button" onClick={() => sortData("date")}>
            Trier par date
          </button>
          <button type="button" onClick={() => sortData("statut")}>
            Trier par statut
          </button>
          <button type="button" onClick={() => sortData("nomAcheteur")}>
            Trier par utilisateur
          </button>
          <button type="button" onClick={resetSorting}>
            Réinitialiser les filtres
          </button>
        </div>
        <table id="array-command-container">
          <thead id="array-command-title">
            <tr>
              <th>NUMÉRO DE COMMANDE</th>
              <th>DATE</th>
              <th>NOM D'ACHETEUR</th>
              <th>TOTAL DE LA COMMANDE</th>
              <th>NOMBRE D'ARTICLE</th>
              <th>STATUT</th>
            </tr>
          </thead>
          <tbody id="array-command-data">
            {data.map((commande) => (
              <tr
                key={commande.id}
                onClick={() => handleCommandeClick(commande.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{commande.id}</td>
                <td>{formatDate(commande.date_commande)}</td>
                <td>{commande.nomAcheteur || "Non spécifié"}</td>
                <td>{formatTotal(commande.totalCommande)}</td>
                <td>{commande.nombreArticle}</td>
                <td>
                  <span
                    className={`status-diode ${getStatusClass(commande.statut)}`}
                    aria-label={`Statut de la commande: ${commande.statut}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommandeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        commandeDetails={selectedCommandeDetails}
      />
    </div>
  );
}

export default CommandesAdmin;
