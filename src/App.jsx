import "./App.css";
import { observer } from "mobx-react-lite";
import AppRouter from "./pages/AppRouter";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import * as React from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FollowContext } from "./context";
import { useState } from "react";

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [fetchedUser, setFetchedUser] = useState({});
  const [followStatus, setFollowStatus] = useState(false);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      await store.checkAuth();
    };
    if (document.cookie.includes("RefreshToken")) {
      fetchCurrentUser();
    }
    if (!store.isAuth && !document.cookie.includes("RefreshToken")) {
      navigate("/login");
    }
  }, []);

  if (store.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <FollowContext.Provider
      value={{
        fetchedUser,
        setFetchedUser,
      }}
    >
      <AppRouter />
    </FollowContext.Provider>
  );
}

export default observer(App);
