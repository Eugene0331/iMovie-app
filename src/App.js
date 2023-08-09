import React from "react";
import "swiper/css";
import "./Styles/assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./config/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <AppRouter />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
