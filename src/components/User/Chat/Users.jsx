import React from "react";
import { Avatar } from "@mui/material";
import { Input } from "antd";

const Users = () => {
  return (
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
  );
};

export default Users;
