import React from "react";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import CarsPage from "../pages/car/CarsPage";
import CarDetailPage from "../pages/car/CarDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PostCarPage from "../pages/car/PostCarPage";
import MyCarPage from "../pages/car/MyCarPage";
import CarsRentalPage from "../pages/rental/CarsRentalPage";
import UserProtectedRoute from "../components/UserProtectedRoute";
import { Route } from "react-router-dom";
import RentalFillPage from "../pages/rental/RentalFillPage";

function UserRoutes() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="cars" element={<CarsPage />} />
      <Route path="cars/:id" element={<CarDetailPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route
        path="post-car"
        element={
          <UserProtectedRoute>
            <PostCarPage />
          </UserProtectedRoute>
        }
      />
      <Route
        path="my-cars"
        element={
          <UserProtectedRoute>
            <MyCarPage />
          </UserProtectedRoute>
        }
      />
      <Route
        path="my-rentals"
        element={
          <UserProtectedRoute>
            <CarsRentalPage />
          </UserProtectedRoute>
        }
      />
      <Route
        path="checkout/:id"
        element={
          <UserProtectedRoute>
            <RentalFillPage />
          </UserProtectedRoute>
        }
      />
    </Route>
  );
}

export default UserRoutes;
