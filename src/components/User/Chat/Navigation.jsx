import React from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#0284C7" : "black",
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
          })}
        >
          <li>
            <img
              src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
              alt=""
            />
            Home
          </li>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
            color: isActive ? "#0284C7" : "black",
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
        <Divider style={{ margin: "8px 0", color: "rgb(229, 231, 235)" }} />
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "rgb(241,245,249)" : "white",
            color: isActive ? "#0284C7" : "black",
          })}
        >
          <li>
            <SettingsIcon />
            Settings
          </li>
        </NavLink>
        <li>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
