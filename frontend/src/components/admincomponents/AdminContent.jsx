import React from "react";
import Connexion from "../Connexion";
import { useAdmin } from "../../contexts/AdminContext";
import ArticlesAdmin from "./ArticlesAdmin";
import CommandesAdmin from "./CommandesAdmin";
import FestivalsAdmin from "./FestivalsAdmin";
import ClientsAdmin from "./ClientsAdmin";
import FooterBis from "../FooterBis";
import MenuProfil from "./MenuAdmin";
import Navbar from "../Navbar";
import "../../styles/AdminContent.scss";

function AdminContent() {
  const { activeSection } = useAdmin();
  // console.info("Ce qui est selectionné", activeSection);

  let content;
  switch (activeSection) {
    case "CatalogueAdmin":
      content = <ArticlesAdmin />;
      break;
    case "CommandesAdmin":
      content = <CommandesAdmin />;
      break;
    case "ClientsAdmin":
      content = <ClientsAdmin />;
      break;
    case "EventsAdmin":
      content = <FestivalsAdmin />;
      break;
    default:
      content = <ArticlesAdmin />;
  }

  return (
    <>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <div className="container-admin">
        <MenuProfil />
        {content}
      </div>
      <FooterBis />
    </>
  );
}

export default AdminContent;
