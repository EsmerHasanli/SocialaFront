import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/User/Navbar";

const Layout = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
      {
        path!='/login' && path!='/register' && path!='*' && path!='/admin' && path!='/roles' &&  path!='/verify-requests' && 
        <Navbar />
      }
      <Outlet />
    </>
  );
};

export default Layout;
