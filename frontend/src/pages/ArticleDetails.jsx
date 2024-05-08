import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Profil.scss";
import DetailArticle from "../components/DetailArticle";
import NavBar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";
import FooterBis from "../components/FooterBis";
import Connexion from "../components/Connexion";
import Article from "../components/Article";

function ArticleDetails() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3310/api/articles/?phares=desc&limit=3", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ModalProvider>
      <NavBar />
      <Connexion />
      <DetailArticle />
      <div id="articles-phares-articles">
        <div className="title-suggest-article">
          <h2 className="articles-title-articles-details">Articles phares</h2>
          <div id="articles-phares-articles-content">
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
            <Link to="/catalogue" className="retour-catalogue-btn">
              Retour au catalogue
            </Link>
          </div>
        </div>
      </div>
      <FooterBis />
    </ModalProvider>
  );
}

export default ArticleDetails;
