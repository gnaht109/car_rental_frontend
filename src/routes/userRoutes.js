import React from "react";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import CarsPage from "../pages/CarsPage";
import CarDetailPage from "../pages/CarDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Route } from "react-router-dom";
import PostCarPage from "../pages/PostCarPage";

function UserRoutes() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="cars" element={<CarsPage />} />
      <Route path="cars/:id" element={<CarDetailPage />} />
      <Route path="cars/post" element={<PostCarPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
}

export default UserRoutes;
