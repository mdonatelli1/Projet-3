import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Article from "./Article";
import IvyAnimation from "./animations/IvyAnimation";
import IvyBranch1 from "./animations/svg/IvyBranch1";

import "../styles/Nouveautés.scss";

function Nouveautés() {
  const ivyRef = useRef(null);

  const [articles, setArticles] = useState([]);

  // On récupère les articles présent dans la bdd
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/articles/?nouveautes=1&limit=3", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="nouveautés">
      <IvyAnimation
        ivyId="ivyNew"
        ivyRef={ivyRef}
        start="top +=500"
        end="bottom top"
      >
        <IvyBranch1 />
      </IvyAnimation>
      <div id="nouveautés-content">
        <h2 id="nouveautés-title">NOUVEAUTÉS SUR LE SITE</h2>
        <div id="nouveautés-articles">
          {/* On affiche les 3 articles les plus récents */}
          {articles.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              image={`http://localhost:3310${article.image}`}
              nom={article.nom}
              vendeuse={article.vendeuse}
              prix={`${article.prix} €`}
            />
          ))}
          <Link to="/catalogue">
            <button type="button">EN VOIR PLUS</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Nouveautés;
