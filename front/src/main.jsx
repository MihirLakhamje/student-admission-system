import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
