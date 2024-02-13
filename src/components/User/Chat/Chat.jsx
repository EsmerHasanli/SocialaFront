import { Avatar, IconButton } from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { observer } from "mobx-react-lite";
import Message from "./Message";

const Chat = ({currentChat, chatMessages}) => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="left">
          <div className="avatar">
            <Avatar
              className="photo"
              src={currentChat.chatPartnerImageUrl}
            />
            <div className="isOnline"></div>
          </div>

          <div className="info">
            <h5>{currentChat.ChatPartnerUserName}</h5>
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
            src=" https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-6.jpg"
            className="avatar"
          />
          <h2>Monroe Parker</h2>
          <h6>@Monroepark</h6>
          <button>View profile</button>
        </div>

        <div className="chat">
          {chatMessages.map((message) => 
            <Message message={message} chat={currentChat}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Chat);