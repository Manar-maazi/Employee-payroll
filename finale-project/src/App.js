import React from "react";

import Login from "./components/auth/Login.js";
import {  Route, Routes } from "react-router-dom";
import MainApp from "./components/MainApp/MainApp";
import NotFound from "./components/NotFound.jsx";

function App() {

  return (
    <div>
      <Routes>
      <Route exact path="/login" element={<Login />} />
        <Route path="/app/*" element={<MainApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      )
}

export default App;
