import React from "react";
import Error404 from "./404";
import { AdminProvider } from "../contexts/AdminContext";
import AdminContent from "../components/admincomponents/AdminContent";
import {
  ModalProvider,
  useConnexionContext,
} from "../contexts/ConnexionContext";

function Admin() {
  const { userInfo } = useConnexionContext();

  if (userInfo && userInfo.seelie) {
    return (
      <ModalProvider>
        <AdminProvider>
          <AdminContent />
        </AdminProvider>
      </ModalProvider>
    );
  }
  return (
    <ModalProvider>
      <Error404 />
    </ModalProvider>
  );
}

export default Admin;
