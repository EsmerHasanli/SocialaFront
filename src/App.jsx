import "./App.css";
import { observer } from "mobx-react-lite";
import AppRouter from "./pages/AppRouter";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, []);

  if (store.isLoading) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <>
      <AppRouter />
    </>
  );
}

export default observer(App);
