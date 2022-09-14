// import style from "./css/App.module.css";
import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/firebase" element={<Firebase />} />
        <Route path="/register" element={<Registro />} /> */}
      </Routes>
    </div>
  );
}

export default App;
