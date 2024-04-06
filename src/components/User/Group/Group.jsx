import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { FollowContext } from "../../../context";
import GroupInfoBar from "./GroupInfoBar";
import GroupMessage from "./GroupMessage";
import { Modal } from "antd";
import { Context } from "../../../main";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Group = ({currentGroup,groupMembers, setCurrentGroup, groupTypingUsers, groupMessages, connection}) => {
  const {onlineUsers, setOnlineUsers} = useContext(FollowContext)
  const [skip, setSkip] = useState(0); 
  const [messsagesGetted, setMessagesGetted] = useState(false)
  const {currentGroupId, setCurrentGroupId} = useContext(FollowContext)
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const prevScrollRef = useRef(0);
  const {store} = useContext(Context)
  useEffect(() => {
      if (messsagesGetted) {
        setMessagesGetted(false);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - prevScrollRef.current
      }
      else {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    chatContainerRef.current.addEventListener('scroll', getMessages);
  
    return () => {
      chatContainerRef.current?.removeEventListener('scroll', getMessages);
    };
  }, [groupMessages])
  
  function getMessages() {
    if (chatContainerRef.current.scrollTop == 0) {
      prevScrollRef.current = chatContainerRef.current.scrollHeight
      setSkip(skip + 20)
      setMessagesGetted(true)
      connection.getGroupMessages(currentGroup.id, skip + 20)

    }
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = async () => {
    setIsModalOpen(true);
  };

  function deleteMember(userName) {
    connection.removeMemberFromGroup(currentGroup.id, userName)
  }
  function addGroupAdmin(userName) {
    connection.addGroupAdmin(currentGroup.id, userName)
  }

  return (
  
    <div className="wrapper" ref={chatContainerRef}>
        <Modal
          title={`${currentGroup.name} Members`}
          footer={null}
          onCancel={handleCancel}
          open={isModalOpen}
          onOk={handleOk}
        >
          <ul style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
            {groupMembers?.map(member =>
              <div style={{margin:"10px", display: "flex", width:"90%", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{display:"flex",  minWidth:"120px", justifyContent:"flex-start", alignItems:"center"}}>
                  <Avatar src={member.imageUrl} className="avatar"/>
                  <span style={{marginLeft:"10px"}}>{member.userName}</span>
                </div>
                <div style={{display:"flex", minWidth:"20%", justifyContent:"center", alignItems:"center"}}>
                  <span style={member.groupRole == "Admin" || member.groupRole == "Owner"? {color:"blue"} : null }>{member.groupRole}</span>
                
                </div>
                <div style={{display:"flex", alignItems:"center", minWidth:"64px"}}>
                    {(groupMembers?.find(m => m.userName == store.user.userName && m.groupRole == "Owner" ||m.userName == store.user.userName && m.groupRole == "Admin")
                    && member.groupRole == "Member") ? 
                    <IconButton className="delete-message-btn" onClick={() => deleteMember(member.userName)}>
                      <DeleteIcon style={{fontSize:'18px'}} />
                    </IconButton>
                    :
                      (member.groupRole == "Admin" && groupMembers?.find(m => m.userName == store.user.userName && m.groupRole == "Owner"))
                    &&  <IconButton className="delete-message-btn" onClick={() => deleteMember(member.userName)}>
                      <DeleteIcon style={{fontSize:'18px'}} />
                    </IconButton>}
                  {groupMembers?.find(m => m.userName == store.user.userName && m.groupRole == "Owner" ||m.userName == store.user.userName && m.groupRole == "Admin")
                    && member.groupRole == "Member"
                    && <IconButton className="delete-message-btn" onClick={() => addGroupAdmin(member.userName)}>
                    <AdminPanelSettingsIcon style={{fontSize:'18px'}} />
                   </IconButton>}
                </div>
           
              </div>
            )}
          </ul>
        </Modal>
      <div className="header">
        <div className="left">
        <IconButton onClick={()=>{
          if (currentGroupId) connection.disconnectFromGroup(currentGroupId)
          setCurrentGroupId(null)
          setCurrentGroup(null)
        }}>
          <KeyboardArrowLeftIcon/>
        </IconButton>
          <div className="avatar">
            <Avatar
              className="photo"
              src={currentGroup?.imageUrl}
            />
        </div>

          <div className="info">
            <h5 style={{color: 'rgb(37,47,63)'}}>{currentGroup?.name}</h5>
            <p onClick={showModal} style={{cursor:"pointer"}}>{groupMembers.length} Members, <span style={{color:'rgb(34, 197, 94)'}}>{groupMembers.filter(member => onlineUsers.includes(member.userName)).length} Online</span></p>
            {/* <p >{currentGroup?.usersCount} Members</p> */}
          </div>
        </div>

        <div className="right">
          <GroupInfoBar currentGroup={currentGroup} />
        </div>
      </div>
      <div className="messages">
        <div className="chat">
          {groupMessages?.slice().reverse().map((message) => 
            <GroupMessage groupMembers={groupMembers} key={message.id} connection={connection} message={message} group={currentGroup}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Group);