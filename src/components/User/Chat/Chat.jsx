import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { observer } from "mobx-react-lite";
import Message from "./Message";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UserInfoBar from "./UserInfoBar";

const Chat = ({currentChat, setCurrentChat, chatMessages, currentChatId, connection, setCurrentChatId}) => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="left">
        <IconButton onClick={()=>{
          if (currentChatId) connection.disconnectFromChat(currentChatId)
          setCurrentChatId(null)
          setCurrentChat(null)
        }}>
          <KeyboardArrowLeftIcon/>
        </IconButton>
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
          <UserInfoBar/>
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
          {chatMessages.slice().reverse().map((message) => 
            <Message key={message.id} message={message} chat={currentChat}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Chat);