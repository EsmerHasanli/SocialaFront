import React, { useContext } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";

const SideBar = ({sideBarWidth}) => {
  const { store } = useContext(Context);
  const {unreadedMessagesCount, setUnreadedMessagesCount} = React.useContext(FollowContext)
  
  const handleLogout = async () => {
    await store.logout();
    navigate("/login");
  };
  return (
    <>
      <div id="side-bar" style={{width:`${sideBarWidth}%`}}>
        <ul className="pages">
          {
            store.user?.roles.includes('Admin')  || store.user?.roles.includes('Moderator') ?
              <Link to="/admin">
              <li>
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8901/8901603.png"
                    alt="dashboard"
                  />
                  <p>Dashboard</p>
                </div>
              </li>
            </Link>
          : null
          }
          <Link to={`/users/${store.user.userName}`}>
            <li>
              <div>
                <img src="https://cdn-icons-png.flaticon.com/512/7382/7382094.png" alt="user" />
                <p>My page</p>
              </div>
            </li>
          </Link>
          <Link to="/">
            <li>
              <div>
                <img
                  src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
                  alt="home"
                />
                <p>Feed</p>
              </div>
            </li>
          </Link>

          <Link to="/messages" className="messages-link">
            <li>
              <div>
                <img
                  src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png"
                  alt="chat"
                />
                <p>Messages</p>
              </div>
              {Number(unreadedMessagesCount) > 0 && Number(unreadedMessagesCount) < 100
          ?
            <div className="messages-count-div">
            {unreadedMessagesCount}
            </div>
          : unreadedMessagesCount > 0 && <div className="messages-count-div" style={{fontSize:"10px", width:"22px", height:"22px", top:"7px", right:"18px"}}>
                99+
            </div>
      }

            </li>
          </Link>

          <Link to="/archive">
            <li>
              <div>
                <img
                  style={{ width: "28px", height: "28px" }}
                  src="https://static.vecteezy.com/system/resources/previews/021/095/640/original/3d-render-illustration-of-archive-icon-office-material-png.png"
                  alt="archive"
                />
                <p>Archive</p>
              </div>
            </li>
          </Link>
        </ul>

        <Divider />

        <ul className="functions">
          <Link to="/settings">
            <li>
              <div>
                <SettingsIcon style={{ color: "rgb(41,51,66)" }} />
                <p>Settings</p>
              </div>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <div>
              <LogoutIcon style={{ color: "rgb(41,51,66)" }} />
              <p>Logout</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default observer(SideBar);
