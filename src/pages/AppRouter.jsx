import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import Layout from "./Layout";

const AppRouter = () => {
  const { store } = useContext(Context);
  const navigate  = useNavigate()
  
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  },[])
  
  return (
    <>
      <Layout />
      {store.isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      )}
    </>
  );
};

export default observer(AppRouter);
