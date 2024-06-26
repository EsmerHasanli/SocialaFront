import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";

const Navigation = () => {
  const { store } = useContext(Context);
  const handleLogout = async () => {
    await store.logout();
    navigate("/login");
  };
  console.log(store.user);

  return (
    <nav>
      <ul>
        {store.user?.roles.includes("Admin") || store.user?.roles.includes("Moderator") ?
          
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                color: isActive ? "#0284C7" : "rgb(41, 51, 66)",
                backgroundColor: isActive ? "rgb(241,245,249)" : "white",
              })}
            >
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8901/8901603.png"
                  alt=""
                />
                <p>Dashboard</p>
              </li>
            </NavLink>
            :null
          
        }
        <NavLink
          to={`/users/${store.user.userName}`}
          style={({ isActive }) => ({
            color: isActive ? "#0284C7" : "rgb(41, 51, 66)",
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
          })}
        >
          <li>
            <img
              src="https://cdn-icons-png.flaticon.com/512/7382/7382094.png"
              alt=""
            />
            My page
          </li>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#0284C7" : "rgb(41, 51, 66)",
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
          })}
        >
          <li>
            <img
              src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
              alt=""
            />
            Feed
          </li>
        </NavLink>
        <NavLink
          to="/messages"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
            color: isActive ? "#0284C7" : "rgb(41, 51, 66)",
          })}
        >
          <li>
            <img
              src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png"
              alt=""
            />
            Messages
          </li>
        </NavLink>
        <NavLink to="/archive">
          <li>
            <img
              style={{ width: "28px", height: "28px" }}
              src="https://static.vecteezy.com/system/resources/previews/021/095/640/original/3d-render-illustration-of-archive-icon-office-material-png.png"
              alt=""
            />
            <p>Archive</p>
          </li>
        </NavLink>
        <Divider style={{ margin: "8px 0", color: "rgb(229, 231, 235)" }} />
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
            color: isActive ? "#0284C7" : "rgb(41, 51, 66)",
          })}
        >
          <li>
            <SettingsIcon />
            Settings
          </li>
        </NavLink>
        <li onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default observer(Navigation);
