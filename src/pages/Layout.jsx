import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/User/Navbar";

const Layout = () => {
  const location = useLocation()
  const path = location.pathname
  console.log(path);
  return (
    <>
      {
        path!='/login' && path!='/register' && path!='*' && path!='/admin' && path!='/roles' &&  !path.includes('/verify-requests') && 
        <Navbar />
      }
      <Outlet />
    </>
  );
};

export default Layout;
