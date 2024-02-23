import React, { useContext, useEffect, useMemo, useState } from "react";
import "./index.scss";

import { Helmet } from "react-helmet";
import Connector from "../../../sockets/ChatWebSockets";
import Navigation from "../../../components/User/Chat/Navigation";
import ChatLeft from "../../../components/User/Chat/ChatLeft";
import Chat from "../../../components/User/Chat/Chat";
import Form from "../../../components/User/Chat/Form";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";

const Messages = () => {
  const { store } = useContext(Context);
  const [chatItems, setChatItems] = useState([]);
  const {currentChatId, setCurrentChatId} = useContext(FollowContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([])
  const connection = Connector(store);
  useEffect(() => {
    if (currentChatId) connection.connectSockets(currentChatId);
    else connection.connectSockets();
    localStorage.removeItem("chatId");
    function getChatItems(data) {
      console.log(data)
      setChatItems([...data]);
    }
    
    function onConnectChat(chat) {
      setCurrentChat({ ...chat });
      setChatMessages([...chat.messages]);
    }
    function onRecieveMessage(message) {
      setChatMessages(prev => [{ ...message }, ...prev]);
    }
    function onRecieveChatMessages(messages) {
      setChatMessages(prev => [...prev, ...messages])
    }
    function onGetTypingUser(userName) {
      console.log(userName)
      if (!typingUsers.includes(userName)) {
        setTypingUsers([...typingUsers, userName]);
      }
    }
    function onDeleteTypingUser(userName) {
        const filteredTypingUsers = typingUsers.filter(un => un != userName)
        setTypingUsers(filteredTypingUsers);
    }
    function onGetSearchUsers(users) {
      console.log('users', users);
      setSearchedUsers([...users]);
    }
    function handleUserLogout() {
      const chatId = JSON.parse(localStorage.getItem("chatId"));
      console.log(chatId);
      if (chatId) connection.disconnectFromChat(chatId);
      
      connection.disconnectSockets();
    }
    function onGetMessagesAfterDelete(messages) {
      setChatMessages(messages)
    }
    window.addEventListener("unload", handleUserLogout);
    
    connection.events(
      getChatItems,
      onConnectChat,
      onGetSearchUsers,
      onRecieveChatMessages,
      onRecieveMessage,
      onGetTypingUser,
      onDeleteTypingUser,
      onGetMessagesAfterDelete
      );
      return () => {
      window.removeEventListener("unload", handleUserLogout);
      connection.disconnectSockets();
    };
  }, []);

  useEffect(() => console.log(typingUsers), [typingUsers])
 
  return (
    <>
      <Helmet>
        <title>Socialite | Chat</title>
      </Helmet>
      <main id="messages-page">
        <Navigation />

        <section>
          <ChatLeft
            connection={connection}
            typingUsers={typingUsers}
            chatItems={chatItems}
            searchedUsers={searchedUsers}
            setSearchedUsers={setSearchedUsers}
          />
          <div id="chat-wrapper">
            {currentChat ? (
              <div>
                <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} typingUsers={typingUsers} chatMessages={chatMessages}  connection={connection} setCurrentChatId={setCurrentChatId} setChatMessages={setChatMessages} />
                <Form connection={connection}  userName={currentChat.chatPartnerUserName} />
              </div>
            ) : (
              <div className="empty-chat-wrapper" >
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-6823641-5602882.png?f=webp" alt="" />
                <h2>Your messages</h2>
                <h6>Send private messages to a friend </h6>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default observer(Messages);