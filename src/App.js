import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/adminRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {UserRoutes()}
          {AdminRoutes()}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
