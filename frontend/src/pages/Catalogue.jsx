import Connexion from "../components/Connexion";
import FiltresArticles from "../components/FiltresArticles";
import FooterBis from "../components/FooterBis";
import { ModalProvider } from "../contexts/ConnexionContext";
import Navbar from "../components/Navbar";
import "../styles/Catalogue.scss";

function Catalogue() {
  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <div className="title_page">
          <h1>LE CATALOGUE</h1>
          <svg
            height="3"
            viewBox="0 0 1294 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-0.000732422"
              y1="0.491943"
              x2="1294.01"
              y2="0.491943"
              stroke="#BDC9AC"
            />
          </svg>
        </div>
        <FiltresArticles />
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Catalogue;
