import "./App.css";
import { observer } from "mobx-react-lite";
import AppRouter from "./pages/AppRouter";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import * as React from "react";
import { Box, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FollowContext } from "./context";
import { useState } from "react";
import WebSockets from "./sockets/WebSockets";

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [fetchedUser, setFetchedUser] = useState({});
  const [currentUserFollows, setCurrentUserFollows] = useState([]);
  const [userAvatar, setUserAvatar] = useState(store.user?.imageUrl);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await store.checkAuth();
      setCurrentUserFollows(store.user.follows);
      setUserAvatar(store.user.imageUrl);
    };

      fetchCurrentUser();

  }, []);

  useEffect(() => setUserAvatar(store.user.imageUrl), [store.user]);

  if (store.isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
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
        setUserAvatar,
        notifications,
        setNotifications,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      <AppRouter />
      <WebSockets />
    </FollowContext.Provider>
  );
}

export default observer(App);
