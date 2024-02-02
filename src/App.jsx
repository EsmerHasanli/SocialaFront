import "./App.css";
import { observer } from "mobx-react-lite";
import AppRouter from "./pages/AppRouter";
import { Context } from "./main";
import { useContext } from "react";

function App() {
  const { store } = useContext(Context);
  console.log(store.isAuth);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default observer(App);
