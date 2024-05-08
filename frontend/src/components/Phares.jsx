import axios from "axios";
import { useEffect, useState } from "react";

import Article from "./Article";
import Star2 from "./animations/svg/Star2";

import "../styles/Phares.scss";

function Phares() {
  const [articles, setArticles] = useState([]);

  // On récupère les articles présent dans la bdd
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/articles/?phares=desc&limit=3", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="phares">
      <div id="phares-title">
        <h2>NOS ARTICLES PHARES</h2>
        <Star2 starClassname="star3" />
        <Star2 starClassname="star4" />
      </div>
      <div id="phares-articles">
        <div id="phares-articles-content">
          {/* On affiche les 3 articles les plus vendus */}
          {articles.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              image={`http://localhost:3310${article.image}`}
              nom={article.nom}
              vendeuse={article.vendeuse}
              prix={`${article.prix} €`}
              isFav={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Phares;
