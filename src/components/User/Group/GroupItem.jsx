import React, { useContext, useEffect } from 'react';
import { Context } from '../../../main';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import { FollowContext } from '../../../context';
import { Avatar } from '@mui/material';

const GroupItem = ({groupItem, groupsTypingUsers, connection }) => {
    const {store} = useContext(Context);
    const {onlineUsers, setOnlineUsers} = useContext(FollowContext)
    const {currentGroupId, setCurrentGroupId} = useContext(FollowContext)
    const formatDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);
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
        connection.connectToGroup(currentGroupId)
      }, [currentGroupId])
      
    return (
        <li onClick={() => {
            if (currentGroupId) connection.disconnectFromGroup(currentGroupId)           
            setCurrentGroupId(groupItem?.groupId)
            localStorage.setItem("groupId", JSON.stringify(groupItem?.groupId));
            }}>
            <div className="avatar">
            <Avatar
                className="photo"
                src={groupItem?.imageUrl}
            />
            </div>
            <div className="info">
            <div className="top">
                <h5>{groupItem?.name}</h5>
                {groupItem?.lastMessageSendedAt &&
                <p>{formatDate(groupItem.lastMessageSendedAt)}</p>}
            </div>
            <div className="bottom">
            {(groupsTypingUsers.find(obj => obj.id == groupItem?.groupId))?.users?.length ? 
            <p>{(groupsTypingUsers.find(obj => obj.id == groupItem?.groupId))?.users.join(", ")} typing...</p> :
            <>
                <div style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
                
                <span>{
                    groupItem?.lastMessageSendedBy == store.user.userName 
                    ? groupItem?.lastMessageIsChecked
                    ? <DoneAllIcon style={{color:'rgb(88,80,236)', fontSize:'16px'}}/>
                    : <DoneAllIcon style={{fontSize:'16px'}} />
                    : null
                }
                </span>
                    {/* <p style={{marginBottom:'5px'}}>{groupItems.lastMessageSendedBy == store.user.userName} {groupItems.sender == store} {groupItems.lastMessage}</p> */}
                    <p style={{marginBottom:'5px'}}>{groupItem.lastMessage?.length > 10 ? `${groupItem.lastMessage?.substring(0, 10)}... `: groupItem?.lastMessage  }</p>
                </div>
                <div>
                    {groupItem.unreadedMessagesCount > 0 &&
                    <span style={{display:'flex', justifyContent:'center', alignItems:'center', width:'20px', height:'20px', borderRadius:'50%', color:'white', backgroundColor:'rgb(34,197,94)', fontSize:'12px', fontWeight:'300'}} >{groupItem.unreadedMessagesCount}</span>}
                </div>
            </>
            }   
            </div>
        </div>
      </li>
    );
}

export default GroupItem;