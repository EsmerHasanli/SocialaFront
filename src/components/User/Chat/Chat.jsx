import { Avatar, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Message from "./Message";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UserInfoBar from "./UserInfoBar";
import { Link } from "react-router-dom";
import { FollowContext } from "../../../context";

const Chat = ({currentChat, setCurrentChat, chatMessages, currentChatId, connection, setCurrentChatId}) => {
  const {onlineUsers, setOnlineUsers} = useContext(FollowContext)


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
              src={currentChat?.chatPartnerImageUrl}
            />
            {onlineUsers.find(u => u == currentChat.chatPartnerUserName) &&
            <div className="isOnline"></div>
            }
          </div>

          <div className="info">
            <h5>{currentChat?.chatPartnerUserName}</h5>
            {onlineUsers.find(u => u == currentChat.chatPartnerUserName) &&
            <p style={{color:'rgb(34, 197, 94)'}}>Online</p>}
          </div>
        </div>

        <div className="right">
          <UserInfoBar currentChat={currentChat} />
        </div>
      </div>
      <div className="messages">
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