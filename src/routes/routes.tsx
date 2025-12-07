import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import { Buy, Footer, Navbar } from "../components";
import { Saber } from "../sections";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saber-mas" element={<Saber />} />
          <Route path="/comprar" element={<Buy />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default AppRoutes;
