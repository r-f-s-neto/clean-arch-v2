import Router from "@/presentation/components/router/router";
import React from "react";
import ReactDOM from "react-dom/client"; // Modificado para importar de 'react-dom/client'
import "@/presentation/styles/global.scss";

// Criação do root usando createRoot
const makeLogin = () => import("@/main/factories/pages/login/login-factory");
const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<Router makeLogin={makeLogin} />);
