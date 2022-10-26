import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

let api = {
  backUrl: import.meta.env.VITE_BACKURL,
};
axios.defaults.baseURL = api.backUrl || "http://localhost:4000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
