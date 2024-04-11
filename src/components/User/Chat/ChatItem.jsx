import React, { useContext, useEffect } from 'react';
import { Context } from '../../../main';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import { FollowContext } from '../../../context';
import { Avatar } from '@mui/material';

const ChatItem = ({chatItem,typingUsers, connection }) => {
    const {store} = useContext(Context);
    const {onlineUsers, setOnlineUsers} = useContext(FollowContext)
    const {currentChatId, setCurrentChatId} = useContext(FollowContext)
    
    const formatDate = (dateString) => {
      const currentDate = new Date();
      const inputDate = new Date(dateString);
    
      const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
      const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
      const utcOffset = -timezoneOffsetInHours;
      inputDate.setHours(inputDate.getHours() + utcOffset);
      const timeDifference = differenceInDays(currentDate, inputDate);
      if (timeDifference < 1) {
        const formattedTime = format(inputDate, 'HH:mm');
        return formattedTime;
      } else if (timeDifference < 7) {
        const formattedDayOfWeek = format(inputDate, 'EEE');
        return formattedDayOfWeek;
      } else {
        const formattedDate = format(inputDate, 'dd.MM.yyyy');
        return formattedDate;
      }
    };

      useEffect(() => {
        connection.connectToChat(currentChatId)
      }, [currentChatId])
    
    return (
        <li onClick={() => {
            if (currentChatId) connection.disconnectFromChat(currentChatId)           
            setCurrentChatId(chatItem?.chatId)
            localStorage.setItem("chatId", JSON.stringify(chatItem.chatId));
            }}>
            <div className="avatar">
            <Avatar
                className="photo"
                src={chatItem?.chatPartnerImageUrl}
            />
            {onlineUsers.find(u => u == chatItem?.chatPartnerUserName) &&
            <div className="isOnline"></div>}
            </div>
            <div className="info">
            <div className="top">
                <h5>{chatItem.chatPartnerUserName}</h5>
                {chatItem.lastMessageSendedAt &&
                <p>{formatDate(chatItem.lastMessageSendedAt)}</p>}
            </div>
            <div className="bottom">
            {typingUsers.includes(chatItem?.chatPartnerUserName) ? <p>typing...</p> :
            <>
                <div style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
                
                <span>{
                    chatItem?.lastMessageSendedBy == store.user.userName 
                    ? chatItem?.lastMessageIsChecked
                    ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                    : <DoneAllIcon style={{fontSize:'16px'}} />
                    : null
                }
                </span>
                    {/* <p style={{marginBottom:'5px'}}>{chatItem.lastMessageSendedBy == store.user.userName} {chatItem.sender == store} {chatItem.lastMessage}</p> */}
                    <p style={{marginBottom:'5px'}}>{chatItem.lastMessage?.length > 10 ? `${chatItem.lastMessage?.substring(0, 10)}... `: chatItem?.lastMessage  }</p>
                </div>
                <div>
                    {chatItem.unreadedMessagesCount > 0 &&
                    <span style={{display:'flex', justifyContent:'center', alignItems:'center', width:'20px', height:'20px', borderRadius:'50%', color:'white', backgroundColor:'rgb(34,197,94)', fontSize:'12px', fontWeight:'300'}} >{chatItem.unreadedMessagesCount}</span>}
                </div>
            </>
            }
               
                
            </div>
        </div>
      </li>
    );
}

export default ChatItem;