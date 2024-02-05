import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";

const store = new Store();
export const Context = createContext({
  store,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
