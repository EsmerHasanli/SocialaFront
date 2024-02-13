import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { Context } from '../../../main';

const ChatItem = ({chatItem,currentChatId, setCurrentChatId, connection}) => {
    const {store} = useContext(Context);
    return (
        <li onClick={() => {
            if (currentChatId) connection.disconnectFromChat(currentChatId)           
            setCurrentChatId(chatItem.chatId)
            localStorage.setItem("chatId", JSON.stringify(chatItem.chatId));
            }}>
            <div className="avatar">
            <Avatar
                className="photo"
                src={chatItem.chatPartnerImageUrl}
            />
            <div className="isOnline"></div>
            </div>
            <div className="info">
            <div className="top">
                <h5>{chatItem.chatPartnerUserName}</h5>
                <p>09:40AM</p>
            </div>
            <div className="bottom">
                <p>{chatItem.lastMessageSendedBy == store.user.userName && "You:"} {chatItem.sender == store} {chatItem.lastMessage}</p>
                <span>{
                chatItem.lastMessageSendedBy == store.user.userName 
                    ? chatItem.lastMessageIsChecked
                        ? "Просмотрено"
                        : "Отправлено"
                    : chatItem.lastMessageIsChecked
                        ? "Просмотрено"
                        : "Получено"}
                </span>
            </div>
            </div>
      </li>
    );
}

export default ChatItem;
