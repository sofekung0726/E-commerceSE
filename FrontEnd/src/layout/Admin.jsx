import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Admin from "../pages/admin/admin";
import "../App.css"

const Admin = () => {
  return (
    <div>
      <Admin />
      <Outlet />
      <footer><Footer /></footer>
    </div>
  );
};

export default Admin;