import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/ClientsAdmin.scss";

function ClientsAdmin() {
  const [clientsList, setClientsList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:3310/api/clients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setClientsList(response.data))
      .catch((err) => console.error(err));
  }, []);

  //
  const sortByOrders = () => {
    if (!isFiltered) {
      const sortedByOrders = [...clientsList].sort(
        (a, b) => b.nombre_de_commandes - a.nombre_de_commandes
      );
      setClientsList(sortedByOrders);
      setIsFiltered(true);
    } else {
      const sortedById = [...clientsList].sort((a, b) => a.id - b.id);
      setClientsList(sortedById);
      setIsFiltered(false);
    }
  };

  const filterCustomers = clientsList.filter((customer) => {
    const searchLower = search ? search.toLowerCase() : "";
    const customerNomLower = (customer.nom || "").toLowerCase();
    const filtreParNom = customerNomLower.includes(searchLower);

    return filtreParNom;
  });

  const formatDate = (dateString) => {
    const changeDateFormat = new Date(dateString);
    const jour = changeDateFormat.getDate().toString().padStart(2, "0");
    const mois = (changeDateFormat.getMonth() + 1).toString().padStart(2, "0");
    const année = changeDateFormat.getFullYear().toString();
    return `${jour}/${mois}/${année}`;
  };

  return (
    <div className="clients-list-main-container">
      <h2>LISTE DES CLIENTS</h2>
      <section className="clients-list-container">
        <div className="filters-clients-list">
          <button type="button" onClick={sortByOrders}>
            {isFiltered ? "ANNULER LE FILTRE" : "TRIER PAR CLIENT FIDELE"}
          </button>
          <input
            className="input_search"
            type="search"
            placeholder="Rechercher un client"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="clients-list-array-labels">
          <ul>
            <li>NOM DU CLIENT</li>
            <li>PRENOM</li>
            <li>NOMBRE DE COMMANDES</li>
            <li>DATE D'INSCRIPTION</li>
          </ul>
          <div className="clients-list-details">
            {filterCustomers.map((client) => (
              <ul key={client.id}>
                <li>{client.nom}</li>
                <li>{client.prénom}</li>
                <li>{client.nombre_de_commandes}</li>
                <li>{formatDate(client.date_inscription)}</li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientsAdmin;
