import { Avatar } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../../main';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatItem = ({chatItem,currentChatId, setCurrentChatId, connection }) => {
    const {store} = useContext(Context);
    useEffect(()=>{
        console.log('chattItem', chatItem);
    },[chatItem])
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
                        ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                        : <DoneAllIcon style={{fontSize:'16px'}} />
                    : chatItem.lastMessageIsChecked
                        ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                        : <DoneAllIcon style={{fontSize:'16px'}} />}
                </span>
            </div>
            </div>
      </li>
    );
}

export default ChatItem;
