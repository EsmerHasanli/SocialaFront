import React from "react";
import { Avatar } from "@mui/material";
import { Input } from "antd";
import ChatItem from "./ChatItem";
import UserSearchItem from "./UserSearchItem";

const ChatLeft = ({connection, chatItems,currentChatId, setCurrentChatId , searchedUsers, setSearchedUsers}) => {
  let send;
  async function handleSearchChange(e) {
    clearTimeout(send)
    if (e.target.value.length) {
      send = setTimeout(() => 
      {
        console.log("getti")
        connection.searchChatUsers(e.target.value)
      }
      , 1000)
    }
    else setSearchedUsers([])
  }
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
          <Input placeholder="Search" onChange={handleSearchChange} />
        </div>
        {searchedUsers.map(user =>
          <UserSearchItem user={user} connection={connection}/>
          )}
      </div>

      <div className="chatters">
        <ul>
            {chatItems.map(chatItem => 
              <ChatItem  chatItem={chatItem} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} connection={connection}/>
            )}
        </ul>
      </div>
    </div>
  );
};

export default ChatLeft;