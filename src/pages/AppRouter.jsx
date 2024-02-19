import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Login from "./User/Login";
import Dashboard from './Admin/Dashboard'
import Roles from './Admin/Roles';
import VerifyRequests from './Admin/VeifyUser'

const AppRouter = () => {
  const { store } = useContext(Context);
  const navigate  = useNavigate()

  if (store.user?.roles?.includes("Admin")) {
    privateRoutes?.push({
      path: '/admin',
      element: <Dashboard/>
    },
    {
      path: '/roles',
      element: <Roles/>
    },
    {
      path: '/verify-requests',
      element: <VerifyRequests/>
    })
  }else if (store.user?.roles?.includes("Moderator")){
    privateRoutes?.push({
      path: '/admin',
      element: <Dashboard/>
    },
    {
      path: '/verify-requests',
      element: <VerifyRequests/>
    })
  }
  
  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/login')
  //   }
  // },[])
  
  return (
    <>
      {store.isAuth ? (
        <Routes>
          <Route path='/' element={<Layout/>}>
          {privateRoutes.map((route, key) => (
            <Route key={key}  path={route.path} element={route.element} />
          ))}
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      ): 
        <Routes>
          {publicRoutes.map((route, key) => (
            <React.Fragment key={key}>
              <Route  path={route.path} element={route.element}  />
              <Route  path="*" element={<Login />}></Route>
            </React.Fragment>
          ))}
        </Routes>
      }
    </>
  );
};

export default observer(AppRouter);