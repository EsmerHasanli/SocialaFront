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

const Messages = () => {
  const { store } = useContext(Context);
  const [chatItems, setChatItems] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const connection = Connector(store);
  useEffect(() => {
    connection.connectSockets(true);
    localStorage.removeItem("chatId");
    function getChatItems(data) {
      console.log(data);
      setChatItems([...data]);
    }

    function onConnectChat(chat) {
      setCurrentChat({ ...chat });
      setChatMessages([...chat.messages]);
    }
    function onRecieveMessage(message) {
      setChatMessages([...chatMessages, { ...message }]);
    }
    function onRecieveChatMessages(messages) {
      setChatMessages([...messages, ...chatMessages])
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
    window.addEventListener("beforeunload", handleUserLogout);

    connection.events(
      getChatItems,
      onRecieveMessage,
      onConnectChat,
      onGetSearchUsers,
      onRecieveChatMessages
    );
    return () => {
      window.removeEventListener("beforeunload", handleUserLogout);
      connection.disconnectSockets();
    };
  }, []);

  useEffect(() => {
    if (currentChatId) {
      connection.connectToChat(currentChatId);
    }
  }, [currentChatId]);
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
            chatItems={chatItems}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            searchedUsers={searchedUsers}
            setSearchedUsers={setSearchedUsers}
          />
          <div id="chat-wrapper">
            {currentChat ? (
              <div>
                <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} chatMessages={chatMessages} currentChatId={currentChatId} connection={connection} setCurrentChatId={setCurrentChatId} />
                <Form />
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
