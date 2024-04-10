import "./App.css";
import { observer } from "mobx-react-lite";
import AppRouter from "./pages/AppRouter";
import { Context } from "./main";
import { useContext, useEffect } from "react";
import * as React from "react";
import { Box, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FollowContext } from "./context";
import { useState } from "react";
import WebSockets from "./sockets/WebSockets";
import Connector from "./sockets/ChatWebSockets";

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [fetchedUser, setFetchedUser] = useState({});
  const [currentUserFollows, setCurrentUserFollows] = useState([]);
  const [userAvatar, setUserAvatar] = useState(store.user?.imageUrl);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null)
  const [currentGroupId, setCurrentGroupId] = useState(null)
  const [chatItems, setChatItems] = useState([]);
  const [groupItems, setGroupItems] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [isChatItems, setIsChatItems] = useState(localStorage.getItem("chats") ? JSON.parse(localStorage.getItem("chats")) : true);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([])
  const [groupsTypingUsers, setGroupsTypingUsers] = useState([]);
  const [chatsCount, setChatsCount] = useState(0)
  const [groupsCount, setGroupsCount] = useState(0)
  const [groupMembers, setGroupMembers] = useState([]);
  const [unreadedMessagesCount, setUnreadedMessagesCount] = useState(0)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      await store.checkAuth();
      setCurrentUserFollows(store.user.follows);
      setUserAvatar(store.user.imageUrl);
    };

      fetchCurrentUser();

  }, []);
  const connection = Connector(store);
  useEffect(() => {
    if (store.user.userName) {
      
      connection.connectMessagesSockets();
      connection.events(
        onGetChatItems,
        onConnectChat,
        onGetSearchUsers,
        onRecieveChatMessages,
        onRecieveGroupMessages,
        onRecieveMessage,
        onRecieveGroupMessage,
        onGetTypingUser,
        onGetGroupAddedTypingUser,
        onDeleteTypingUser,
        onGetGroupDeletedTypingUser,
        onGetMessagesAfterDelete,
        onGetGroupMessagesAfterDelete,
        onGetGroupItems,
        onConnectGroup,
        onGetGroupsCount,
        onGetChatsCount,
        onGetRemovedGroupId,
        onGetGroupMembersAfterDelete,
        onGetNewGroup,
        onGetUnreadedMessagesCount,
        onGetChatAfterDelete
        );
  
      function onGetRemovedGroupId(groupId) {
        setCurrentGroup(prevGroup => {
          // Проверка, что предыдущая группа существует и её id совпадает с groupId
          if (prevGroup && prevGroup.id === groupId) {
            setCurrentGroupId(null);
            return null; // Обнуляем текущую группу
          }
      
          return prevGroup; // Возвращаем текущую группу без изменений
        });
      }
      function onGetUnreadedMessagesCount(count) {
        setUnreadedMessagesCount(count);
      }
      function onGetGroupMembersAfterDelete(members) {
        setGroupMembers([...members]);
        
      }
      function onGetGroupsCount(count) {
        setChatsCount(count)
      }
      function onGetChatsCount(count) {
        setGroupsCount(count)
      }
      function onGetChatItems(data) {
        console.log(data)
        let unreadedMsgsCount = 0;
        data.forEach((item) => unreadedMsgsCount+= item.unreadedMessagesCount)
        setUnreadedMessagesCount(unreadedMsgsCount)
        setChatItems([...data]);
        setChatsCount(data.length);
      }
      function onConnectChat(chat) {
        setCurrentChat({ ...chat });
        setChatMessages([...chat.messages]);
      }
      function onRecieveMessage(message) {
        setChatMessages(prev => [{ ...message }, ...prev]);
        console.log(message)
        if (!message.isChecked) setUnreadedMessagesCount(prev => prev + 1);
      }
      function onRecieveGroupMessage(message) {
        setGroupMessages(prev => [{ ...message }, ...prev]);
      }
      function onRecieveChatMessages(messages) {
        setChatMessages(prev => [...prev, ...messages])
      }
      function onRecieveGroupMessages(messages) {
        setGroupMessages(prev => [...prev, ...messages])
      }
      function onGetTypingUser(userName) {
        if (!typingUsers.includes(userName)) {
          setTypingUsers([...typingUsers, userName]);
        }
      }
      function onGetGroupAddedTypingUser(id, userName) {
        setGroupsTypingUsers(prevGroups => {
          const existingGroup = prevGroups.find(obj => obj.id === id);
      
          if (existingGroup) {
            // Если группа уже существует, обновляем ее
            const updatedGroups = prevGroups.map(group => {
              if (group.id === id && !group.users.includes(userName)) {
                group.users.push(userName);
              }
              return group;
            });
            return updatedGroups;
          } else {
            // Если группа не существует, добавляем новую
            return [...prevGroups, { id, users: [userName] }];
          }
        });
      }
      function onGetGroupDeletedTypingUser(id, userName) {
        console.log(userName, id)
        setGroupsTypingUsers(prevGroups => {
          const updatedGroups = prevGroups.map(group => {
            if (group.id == id) {
              group.users = group.users.filter(u => u !== userName);
            }
            return group;
          });
          return updatedGroups;
        });
      }
      function onDeleteTypingUser(userName) {
          const filteredTypingUsers = typingUsers.filter(un => un != userName)
          setTypingUsers(filteredTypingUsers);
      }
      function onGetSearchUsers(users) {
        setSearchedUsers([...users]);
      }
      function onGetMessagesAfterDelete(messages) {
        
        setChatMessages(messages)
      }
      function onGetChatAfterDelete(chatDto) {
      
        if (!chatDto.isDeletedMessageChecked && chatDto) setUnreadedMessagesCount(prev => prev -1)
        setChatItems(prev => {
          const updatedChatItems = prev.map(chatItem => {
              if (chatItem.chatId === chatDto.id) {
                  // Если chatItem имеет такой же chatId, как id из chatDto, обновляем его поля
                  return {
                      ...chatItem,
                      lastMessage: chatDto.messages[0].text,
                      lastMessageIsChecked: chatDto.messages[0].isChecked,
                      lastMessageSendedAt: chatDto.messages[0].createdAt,
                      lastMessageSendedBy: chatDto.messages[0].sender,
                      unreadedMessagesCount: chatDto.isDeletedMessageChecked ? chatItem.unreadedMessagesCount : chatItem.unreadedMessagesCount - 1 // Предполагается, что количество непрочитанных сообщений обнуляется
                  };
              }
              return chatItem; // Возвращаем остальные chatItem без изменений
          });
      
          // Сортируем обновленный массив по дате отправки последнего сообщения (lastMessageSendedAt)
          return updatedChatItems.sort((a, b) => new Date(b.lastMessageSendedAt) - new Date(a.lastMessageSendedAt));
      });
      
      setChatMessages(chatDto.messages)
      
      }
      function onGetGroupMessagesAfterDelete(messages) {
        setGroupMessages([...messages])
      }
      function onGetGroupItems(data) {
        setGroupItems([...data]);
        setGroupsCount(data.length)
      }
      function onConnectGroup(group) {
        setCurrentGroup({ ...group });
        setGroupMembers([...group.members]);
        setGroupMessages([...group.messages]);
      }
      function onGetNewGroup(group) {
        setGroupItems(prev =>  [{...group}, ...prev])
        setGroupsCount(prev => prev+1);
      }
      window.addEventListener("unload", handleUserLogout);
  
      function handleUserLogout() {
        if (isChatItems) {
          const chatId = JSON.parse(localStorage.getItem("chatId"));
          console.log(chatId);
          if (chatId) connection.disconnectFromChat(chatId);
        }
        else {
          const groupId = JSON.parse(localStorage.getItem("groupId"));
          console.log(groupId);
          if (groupId) connection.disconnectFromGroup(groupId);
        }
        connection.disconnectSockets();
      }
      return () => {
      window.removeEventListener("unload", handleUserLogout);
      connection.disconnectSockets();
    }
    
  };
  }, [store.user.userName]);

  useEffect(() => {
    setUserAvatar(store.user.imageUrl)
    setCurrentUserFollows(store.user.follows);
  }
    , [store.user]);

  if (store.isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <FollowContext.Provider
      value={{
        fetchedUser,
        setFetchedUser,
        currentUserFollows,
        setCurrentUserFollows,
        userAvatar,
        setUserAvatar,
        notifications,
        setNotifications,
        onlineUsers,
        setOnlineUsers,
        currentChatId,
        setCurrentChatId,
        currentGroupId,
        setCurrentGroupId,
        chatItems,
        setChatItems,
        groupItems,
        setGroupItems,
        currentChat,
        setCurrentChat,
        currentGroup,
        setCurrentGroup,
        chatMessages,
        setChatMessages,
        typingUsers,
        setTypingUsers,
        groupMessages,
        setGroupMessages,
        isChatItems,
        setIsChatItems,
        searchedUsers,
        setSearchedUsers,
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
      }}
    >
      <AppRouter />
      <WebSockets />
    </FollowContext.Provider>
  );
}

export default observer(App);