// import style from "./css/App.module.css";
import React from "react";
import Home from "./components/Home";
// import Home from "./components/NewOperation";
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
