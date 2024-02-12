import React from "react";
import "./index.scss";

import { Helmet } from "react-helmet";
import FooterMobile from "../../../components/User/FooterMobile";
import { Divider, IconButton } from "@mui/material";
import { Avatar, Input } from "antd";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Messages = () => {
  return (
    <>
      <Helmet>
        <title>Socialite | Chat</title>
      </Helmet>
      <main id="messages-page">
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

        <section>
          <div id="users-wrapper">
            <div className="header">
              <div className="top">
                <div className="left">
                  <h1>Chats</h1>
                </div>
                <div className="right"></div>
              </div>
              <div className="bottom">
                <Input placeholder="Search" />
              </div>
            </div>

            <div className="chatters">
              <ul>
                <li>
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                    <div className="isOnline"></div>
                  </div>

                  <div className="info">
                    <div className="top">
                      <h5>Jesse Steeve</h5>
                      <p>09:40AM</p>
                    </div>
                    <div className="bottom">
                      <p>Love your photos 😍</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                    <div className="isOnline"></div>
                  </div>

                  <div className="info">
                    <div className="top">
                      <h5>Jesse Steeve</h5>
                      <p>09:40AM</p>
                    </div>
                    <div className="bottom">
                      <p>Love your photos 😍</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                    <div className="isOnline"></div>
                  </div>

                  <div className="info">
                    <div className="top">
                      <h5>Jesse Steeve</h5>
                      <p>09:40AM</p>
                    </div>
                    <div className="bottom">
                      <p>Love your photos 😍</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                  </div>

                  <div className="info">
                    <div className="top">
                      <h5>Jesse Steeve</h5>
                      <p>09:40AM</p>
                    </div>
                    <div className="bottom">
                      <p>Love your photos 😍</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                  </div>

                  <div className="info">
                    <div className="top">
                      <h5>Jesse Steeve</h5>
                      <p>09:40AM</p>
                    </div>
                    <div className="bottom">
                      <p>Love your photos 😍</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div id="chat-wrapper">
            <div className="wrapper">
              <div className="header">
                <div className="left">
                  <div className="avatar">
                    <Avatar
                      className="photo"
                      src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-5.jpg"
                    />
                    <div className="isOnline"></div>
                  </div>

                  <div className="info">
                      <h5>Jesse Steeve</h5>
                      <p>Online</p>
                  </div>
                </div>

                <div className="right">
                  <IconButton>
                    <InfoOutlinedIcon/>
                  </IconButton>
                </div>

              </div>
              <div className="messages">
                <div className="chatter-info">
                  <Avatar src='	https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-6.jpg' className="avatar" />
                  <h2>Monroe Parker</h2>
                  <h6>@Monroepark</h6>
                  <button>View profile</button>
                </div>

                <div className="chat">
                  <div className="recieved">
                    <div className="avatar">
                      <Avatar className="photo"/>
                    </div>
                    <div className="message">
                      Hi, I’m John
                    </div>
                  </div>

                  <div className="sended">
                    <div className="message">
                      I’m Lisa. welcome John
                    </div>
                    <div className="avatar">
                      <Avatar className="photo"/>
                    </div>
                  </div>

                  <div className="recieved">
                    <div className="avatar">
                      <Avatar className="photo"/>
                    </div>
                    <div className="message">
                      Hi, I’m John
                    </div>
                  </div>

                  <div className="sended">
                    <div className="message">
                      I’m Lisa. welcome John
                    </div>
                    <div className="avatar">
                      <Avatar className="photo"/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
              <div className="message-input">
                <div className="icons-left">
                  <AddCircleOutlineOutlinedIcon />
                  <EmojiEmotionsOutlinedIcon/>
                </div>
                <form className="input-wrapper">
                  <input placeholder="Write your message" type="text" />
                </form>
                <div className="icons-right">
                  <FavoriteBorderOutlinedIcon/>
                </div>
              </div>
          </div>
        </section>

        <FooterMobile />
      </main>
    </>
  );
};

export default Messages;