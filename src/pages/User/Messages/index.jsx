import React, { useContext, useEffect, useMemo } from "react";
import "./index.scss";

import { Helmet } from "react-helmet";
import Navigation from "../../../components/User/Chat/Navigation";
import ChatLeft from "../../../components/User/Chat/ChatLeft";
import Chat from "../../../components/User/Chat/Chat";
import Form from "../../../components/User/Chat/Form";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";
import Group from "../../../components/User/Group/Group";
import GroupForm from "../../../components/User/Group/GroupForm";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import Connector from "../../../sockets/ChatWebSockets";

const Messages = () => {
  const { store } = useContext(Context);
  const connection = Connector(store);

  const {
    chatItems,
    setChatItems,
    groupItems,
    setGroupItems,
    currentChatId,
    setCurrentChatId,
    currentGroupId,
    setCurrentGroupId,
    currentChat,
    setCurrentChat,
    currentGroup,
    setCurrentGroup,
    chatMessages,
    setChatMessages,
    groupMessages,
    setGroupMessages,
    isChatItems,
    setIsChatItems,
    searchedUsers,
    setSearchedUsers,
    typingUsers,
    setTypingUsers,
    groupsTypingUsers,
    setGroupsTypingUsers,
    chatsCount,
    setChatsCount,
    groupsCount,
    setGroupsCount,
    groupMembers,
    setGroupMembers,
    unreadedMessagesCount,
    setUnreadedMessagesCount
  } = useContext(FollowContext);
  
  useEffect(() => {
    async function getItems() {
      let data;
      if (isChatItems) {
          data = await store.getChatItems()
          let unreadedMsgsCount = 0;
          data.forEach((item) => unreadedMsgsCount+= item.unreadedMessagesCount)
          setUnreadedMessagesCount(unreadedMsgsCount)
          setChatItems([...data]);
      }
      else {
          data = await store.getGroupItems();
          console.log(data)
          setGroupItems([...data]);
      }
      
    }
    getItems();
  }, [isChatItems])


  useEffect(() => {
    getChatAndGroupsCountAsync()
  }, [])

  async function getChatAndGroupsCountAsync() {
    const data = await store.getChatAndGroupsCountAsync()
    setChatsCount(data.chatsCount)
    setGroupsCount(data.groupsCount)
  }

 
  return (
    <>
      <Helmet>
        <title>Socialite | Chat</title>
      </Helmet>
      <main id="messages-page">
        <SideBar sideBarWidth="18"/>
        <section>
          <ChatLeft
            connection={connection}
            typingUsers={typingUsers}
            groupsTypingUsers={groupsTypingUsers}
            chatItems={chatItems}
            groupItems={groupItems}
            groupsCount={groupsCount}
            chatsCount={chatsCount}
            isChatItems={isChatItems}
            setIsChatItems={setIsChatItems}
            searchedUsers={searchedUsers}
            setSearchedUsers={setSearchedUsers}
          />
          <div id="chat-wrapper">
            {isChatItems ? 
              currentChat 
              ?
              <div>
                  <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} typingUsers={typingUsers} chatMessages={chatMessages}  connection={connection} setCurrentChatId={setCurrentChatId} setChatMessages={setChatMessages} />
                  <Form connection={connection}  userName={currentChat.chatPartnerUserName} />
              </div>
              : <div className="empty-chat-wrapper" >
                  <img src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-6823641-5602882.png?f=webp" alt="" />
                  <h2>Your messages</h2>
                  <h6>Send private messages to a friend </h6>
                </div>
            : currentGroup 
            ?
              <div>
                <Group currentGroup={currentGroup} groupMembers={groupMembers} setCurrentGroup={setCurrentGroup} groupsTypingUsers={groupsTypingUsers} groupMessages={groupMessages}  connection={connection} setGroupMessages={setGroupMessages} />
                <GroupForm connection={connection} />
              </div>
            : <div className="empty-chat-wrapper" >
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-6823641-5602882.png?f=webp" alt="" />
            <h2>Your groups</h2>
            <h6>Send private messages to group</h6>
          </div>
            }
          </div>
        </section>
      </main>

    </>
  );
};

export default observer(Messages);