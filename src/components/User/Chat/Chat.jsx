import { Avatar, IconButton } from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Chat = () => {
  return (
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
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="messages">
        <div className="chatter-info">
          <Avatar
            src="	https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-6.jpg"
            className="avatar"
          />
          <h2>Monroe Parker</h2>
          <h6>@Monroepark</h6>
          <button>View profile</button>
        </div>

        <div className="chat">
          <div className="recieved">
            <div className="avatar">
              <Avatar className="photo" />
            </div>
            <div className="message">Hi, I’m John</div>
          </div>

          <div className="sended">
            <div className="message">I’m Lisa. welcome John</div>
            <div className="avatar">
              <Avatar className="photo" />
            </div>
          </div>

          <div className="recieved">
            <div className="avatar">
              <Avatar className="photo" />
            </div>
            <div className="message">Hi, I’m John</div>
          </div>

          <div className="sended">
            <div className="message">I’m Lisa. welcome John</div>
            <div className="avatar">
              <Avatar className="photo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
