import React from "react";
import "./side.scss";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const SideBarUpdated = () => {
  return (
    <div id="side-bar-updated">
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
            to="/messages"
            style={({ isActive }) => ({
              color: isActive ? "#0284C7" : "black",
              backgroundColor: isActive ? "rgb(241,245,249)" : "white",
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
          <Divider style={{ margin: "8px 0" }} />
          <NavLink
            to="/settings"
            style={({ isActive }) => ({
              color: isActive ? "#0284C7" : "black",
              backgroundColor: isActive ? "rgb(241,245,249)" : "white",
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
    </div>
  );
};

export default SideBarUpdated;
