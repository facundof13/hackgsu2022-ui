import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import Login from "../Login/Login";
import Home from "../Home/Home";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

interface RoutesProps {}

const AppRoutes: FC<RoutesProps> = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route
        path="favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Login isRegister={true} />} />
    </Routes>
  );
};

export default AppRoutes;
