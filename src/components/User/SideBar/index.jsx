import React, { useContext } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

const SideBar = () => {
  const { store } = useContext(Context);

  const handleLogout = async () => {
    await store.logout();
    navigate("/login");
  };
  return (
    <>
      <div id="side-bar">
        <ul className="pages">
          <Link to="/">
            <li>
              <img
                src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
                alt=""
              />
              <p>Feed</p>
            </li>
          </Link>

          <Link to="/messages">
            <li>
              <img
                src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png"
                alt=""
              />
              <p>Messages</p>
            </li>
          </Link>
        </ul>

        <Divider />

        <ul className="functions">
          <Link to="/settings">
            <li>
              <SettingsIcon style={{color:'rgb(41,51,66)'}} />
              <p>Settings</p>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <LogoutIcon style={{color:'rgb(41,51,66)'}} />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default observer(SideBar);
