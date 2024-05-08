import axios from "axios";
import React, { useEffect, useState } from "react";

import AdminArticles from "./AdminArticles";
import ModalArticle from "./ModalArticle";

import "../../styles/ArticlesAdmin.scss";

function ArticlesAdmin() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [addArticleIsOpen, setAddArticleIsOpen] = useState(false);
  // Initialisation des states du formulaire
  const [formData, setFormData] = useState({
    name: "",
    creatrice: "",
    price: "0",
    bijoux: false,
    deco: false,
    illustration: false,
    vetement: false,
    accessoire: false,
    thematique: "",
    file: null,
  });
  const [submit, setSubmit] = useState("");
  const [articleId, setArticleId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/articles/?nom=${search}%&${sort}`)
      .then((response) => setArticles(response.data))
      .catch((err) => console.error(err));
  }, [search, sort]);

  const modifArticle = async (id) => {
    await axios
      .get(`http://localhost:3310/api/articles/${id}`)
      .then((response) => {
        // On attribue les valeurs aux variables (1)
        const name = response.data.nom;
        const creatrice = response.data.vendeuse;
        const price = response.data.prix.toString();
        let bijoux;
        let deco;
        let illustration;
        let vetement;
        let accessoire;
        if (response.data.types) {
          bijoux = response.data.types.includes("BIJOUX");
          deco = response.data.types.includes("DECO");
          illustration = response.data.types.includes("ILLUSTRATION");
          vetement = response.data.types.includes("VETEMENT");
          accessoire = response.data.types.includes("ACCESSOIRE");
        } else {
          bijoux = false;
          deco = false;
          illustration = false;
          vetement = false;
          accessoire = false;
        }
        const { thematique } = response.data;
        const file = response.data.image.replace("/static/", "");

        // et on les assigne au formulaire (2)
        setFormData({
          name,
          creatrice,
          price,
          bijoux,
          deco,
          illustration,
          vetement,
          accessoire,
          thematique,
          file,
        });

        setSubmit("modif");
        // On ouvre la modal
        setAddArticleIsOpen(true);
      })
      .catch((err) => console.error(err));

    setArticleId(id);
  };

  const addArticle = () => {
    // On formate les variables
    setFormData({
      name: "",
      creatrice: "",
      price: "0",
      bijoux: false,
      deco: false,
      illustration: false,
      vetement: false,
      accessoire: false,
      thematique: "",
      file: null,
    });

    setSubmit("add");
    // On ouvre la modal
    setAddArticleIsOpen(true);
  };

  return (
    <>
      <ModalArticle
        articleId={articleId}
        submit={submit}
        addArticleIsOpen={addArticleIsOpen}
        setAddArticleIsOpen={setAddArticleIsOpen}
        formData={formData}
        setFormData={setFormData}
      />
      <section id="admin-catalogue">
        <h2>ARTICLES</h2>
        <button type="button" onClick={() => setSort("phares=desc")}>
          LES PLUS VENDUS
        </button>
        <button type="button" onClick={() => setSort("phares=asc")}>
          LES MOINS VENDUS
        </button>
        <button
          type="button"
          onClick={() => setSort("price=asc")}
          className="noborder"
        >
          PRIX CROISSANT
        </button>
        <button
          type="button"
          onClick={() => setSort("price=desc")}
          className="noborder"
        >
          PRIX DECROISSANT
        </button>
        <section id="admin-articles-list">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Rechercher un article"
            type="text"
            name="search"
            id="search"
          />
          <button type="button" onClick={() => addArticle()}>
            <span>+</span> AJOUTER UN ARTICLE
          </button>
          {/* Liste des articles présents dans le catalogue */}
          <div id="admin-list">
            {articles.map((article) => (
              <AdminArticles
                handleModif={(id) => modifArticle(id)}
                key={article.id}
                id={article.id}
                image={article.image}
                vendeuse={article.vendeuse}
                nom={article.nom}
                prix={article.prix}
                nbVentes={article.nb_ventes}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default ArticlesAdmin;
