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
import WebSockets from "./components/WebSockets/WebSockets";

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [fetchedUser, setFetchedUser] = useState({});
  const [currentUserFollows, setCurrentUserFollows] = useState([]);
  const [userAvatar, setUserAvatar] = useState(store.user?.imageUrl);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await store.checkAuth();
      setCurrentUserFollows(store.user.follows);
      setUserAvatar(store.user.imageUrl);
    };
    if (document.cookie.includes("RefreshToken")) {
      fetchCurrentUser();
    }
    if (!store.isAuth && !document.cookie.includes("RefreshToken")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => setUserAvatar(store.user.imageUrl), [store.user])

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
        currentUserFollows,
        setCurrentUserFollows,
        userAvatar,
        setUserAvatar
      }}
    >
      <AppRouter />
      <WebSockets/>
    </FollowContext.Provider>
  );
}

export default observer(App);