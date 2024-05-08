import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function Favori({ articleId, nom, prix }) {
  const [fav, setFav] = useState(true);
  const [nbCart, setNbCart] = useState(0);

  // On ajoute l'article au tableau fav de la bdd pour l'utilisateur et l'article ciblés
  const axiosPost = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/isFav/",
        {
          articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));
    // console.info(articleId, "post");
    // On actualise l'état
    setFav(true);
  };

  // On supprime l'article du tableau fav de la bdd pour l'utilisateur et l'article ciblés
  const axiosDelete = () => {
    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://localhost:3310/api/isFav/?articleId=${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      })
      .catch((err) => console.error(err));
    // console.info(articleId, "delete");
    // On actualise l'état
    setFav(false);
  };

  const axiosPostPanier = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "http://localhost:3310/api/panier/",
        {
          articleId,
          quantité: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));
    // console.info(articleId, "add to cart");
  };

  const axiosPutPanier = (nb) => {
    const token = sessionStorage.getItem("token");
    axios
      .put(
        `http://localhost:3310/api/panier/?articleId=${articleId}`,
        {
          quantité: nb + 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      )
      .catch((err) => console.error(err));
    // console.info(articleId, "add another to cart");
  };

  const handleCart = () => {
    if (nbCart === 0) {
      axiosPostPanier();
      setNbCart(nbCart + 1);
    }

    if (nbCart > 0) {
      axiosPutPanier(nbCart);
      setNbCart(nbCart + 1);
    }
  };

  return (
    <>
      <div className="fav">
        <div className="infos">
          <Link
            to={`/catalogue/${articleId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <h3>{nom}</h3>
          </Link>
          <p>{`${prix} €`}</p>
        </div>
        <div className="logos">
          <div className="fav-ligne-v" />
          {/* LOGO FAV ET LOGO PANIER */}
          <div className="article-logos">
            {fav ? (
              <svg
                onClick={() => (!fav ? axiosPost() : axiosDelete())}
                className="article-logo article-fav"
                width="28.48"
                height="23.98"
                viewBox="0 0 33 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6001 26.7436L16.2387 27.277L16.8793 26.746L18.9443 25.0344L18.9465 25.0325L19.0554 24.9418C22.6539 21.9416 25.7252 19.3809 27.8912 16.9496C30.0871 14.4848 31.4824 12.0134 31.4824 9.18631C31.4824 4.53036 27.5055 1 22.6497 1C20.2611 1 17.951 1.88254 16.2412 3.34699C14.5314 1.88254 12.2213 1 9.83265 1C4.9769 1 1 4.53036 1 9.18631C1 12.0134 2.39527 14.4849 4.59133 16.9482C6.76488 19.3863 9.84963 21.9527 13.4641 24.9598L13.5352 25.0189L13.5366 25.0202L15.6001 26.7436Z"
                  fill="#8D214C"
                  stroke="#BDC9AC"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                onClick={() => (!fav ? axiosPost() : axiosDelete())}
                className="article-logo article-fav"
                width="28.48"
                height="23.98"
                viewBox="0 0 30 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7311 22.2161L13.7296 22.2149C10.0411 19.1461 7.0645 16.6675 4.99804 14.3495C2.93954 12.0405 1.91382 10.0303 1.91382 7.91848C1.91382 4.52577 4.82965 1.73218 8.74647 1.73218C10.9524 1.73218 13.0631 2.67912 14.422 4.14326L15.155 4.93294L15.8879 4.14326C17.2469 2.67912 19.3576 1.73218 21.5635 1.73218C25.4803 1.73218 28.3962 4.52577 28.3962 7.91848C28.3962 10.0303 27.3704 12.0405 25.3117 14.3514C23.2452 16.671 20.269 19.1526 16.5808 22.2276C16.5804 22.2279 16.58 22.2283 16.5796 22.2286L15.1574 23.4074L13.7311 22.2161Z"
                  stroke="#442332"
                  strokeWidth="2"
                />
              </svg>
            )}
            <svg
              onClick={() => handleCart()}
              className="article-logo article-panier"
              width="30.59"
              height="31.79"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.17797 13.0743C3.99307 11.723 5.04332 10.5193 6.4072 10.5193H25.9543C27.3047 10.5193 28.3509 11.7005 28.1878 13.041L26.889 23.72C26.7516 24.8492 25.793 25.6983 24.6554 25.6983H7.86845C6.74368 25.6983 5.7917 24.8677 5.63922 23.7534L4.17797 13.0743Z"
                stroke="#442332"
                strokeWidth="1.5"
              />
              <path
                d="M12.3659 20.9818L12.3817 21.0086L12.3941 21.0371L13.5388 23.6766C14.6805 26.3092 18.4403 26.2316 19.4725 23.5542C20.1223 21.8686 20.8929 20.232 21.7782 18.6573L26.8267 9.67737C28.5131 6.67766 26.3453 2.97209 22.9041 2.97209H9.61658C6.13313 2.97209 3.9706 6.75985 5.74139 9.75964L12.3659 20.9818Z"
                stroke="#442332"
              />
              <path
                d="M16.6824 10.8117L15.9535 12.3728C13.9122 16.7452 10.7484 20.8276 6.66088 24.3634V24.3634"
                stroke="#442332"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.1548 10.8117L16.8224 12.1145C19.0737 16.5082 22.2352 20.6482 26.1764 24.3634V24.3634"
                stroke="#442332"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="10.753"
                y="0.787207"
                width="10.8039"
                height="4.4122"
                rx="0.6"
                stroke="#442332"
                strokeWidth="0.8"
              />
              <path
                d="M5.07861 17.3716V17.3716C7.75946 16.5153 9.96675 14.5832 11.1412 12.0525L11.717 10.8116M11.717 10.8116L11.1467 12.0405C9.96877 14.5789 7.76756 16.5127 5.07861 17.3716"
                stroke="#442332"
                strokeLinecap="round"
              />
              <path
                d="M27.9133 17.3716V17.3716C25.2325 16.5153 23.0252 14.5832 21.8508 12.0525L21.2749 10.8116M21.2749 10.8116L21.8452 12.0405C23.0232 14.5789 25.2244 16.5127 27.9133 17.3716"
                stroke="#442332"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="fav-ligne-h" />
    </>
  );
}

Favori.propTypes = {
  articleId: PropTypes.number.isRequired,
  nom: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
};

export default Favori;
