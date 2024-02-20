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
          {
            store.user?.roles.includes('Admin')  || store.user?.roles.includes('Moderator') ?
              <Link to="/admin">
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8901/8901603.png"
                  alt="dashboard"
                />
                <p>Dashboard</p>
              </li>
            </Link>
          : null
          }
          <Link to={`/users/${store.user.userName}`}>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/7382/7382094.png" alt="user" />
              <p>My page</p>
            </li>
          </Link>
          <Link to="/">
            <li>
              <img
                src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
                alt="home"
              />
              <p>Feed</p>
            </li>
          </Link>

          <Link to="/messages">
            <li>
              <img
                src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png"
                alt="chat"
              />
              <p>Messages</p>
            </li>
          </Link>

          <Link to="/archive">
            <li>
              <img
                style={{ width: "28px", height: "28px" }}
                src="https://static.vecteezy.com/system/resources/previews/021/095/640/original/3d-render-illustration-of-archive-icon-office-material-png.png"
                alt="archive"
              />
              <p>Archive</p>
            </li>
          </Link>
        </ul>

        <Divider />

        <ul className="functions">
          <Link to="/settings">
            <li>
              <SettingsIcon style={{ color: "rgb(41,51,66)" }} />
              <p>Settings</p>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <LogoutIcon style={{ color: "rgb(41,51,66)" }} />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default observer(SideBar);
