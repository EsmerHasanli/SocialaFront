import React, { useContext } from 'react';
import { Avatar } from 'antd';
import { Context } from '../../../main';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
                <div style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
                <span>{
                    chatItem.lastMessageSendedBy == store.user.userName 
                    ? chatItem.lastMessageIsChecked
                    ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                    : <DoneAllIcon style={{fontSize:'16px'}} />
                    : chatItem.lastMessageIsChecked
                    ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                    : <DoneAllIcon style={{fontSize:'16px'}} />}
                </span>
                    <p style={{marginBottom:'5px'}}>{chatItem.lastMessageSendedBy == store.user.userName} {chatItem.sender == store} {chatItem.lastMessage}</p>
                </div>
                <div>
                    {chatItem.unreadedMessagesCount > 0 &&
                    <span style={{display:'flex', justifyContent:'center', alignItems:'center', width:'20px', height:'20px', borderRadius:'50%', color:'white', backgroundColor:'rgb(34,197,94)', fontSize:'12px', fontWeight:'300'}} >{chatItem.unreadedMessagesCount}</span>}
                </div>
                
            </div>
            </div>
      </li>
    );
}

export default ChatItem;