import React, { useContext, useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { IconButton, Button, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Input, Modal } from 'antd';
import UserSearchItem from "./UserSearchItem";
import { FollowContext } from "../../../context";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useFormik } from "formik";
import { Context } from "../../../main";
import Swal from "sweetalert2";
import GroupItem from "../Group/GroupItem";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from 'react-router-dom';

const ChatLeft = ({connection, chatsCount, groupsCount, typingUsers, groupsTypingUsers, chatItems, groupItems, setGroupItems, setChatItems, isChatItems, setIsChatItems, searchedUsers, setSearchedUsers}) => {
  const {currentChatId, setCurrentChatId} = useContext(FollowContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userFollows, setUserFollows] = useState([]);
  const {store} = useContext(Context)
  const navigate = useNavigate();
  const showModal = async () => {
    const res = await store.getFollows(store.user.userName);
    setUserFollows(res);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  let send;
  async function handleSearchChange(e) {
    clearTimeout(send)
    if (e.target.value.length) {
      send = setTimeout(() => 
      {
        connection.searchChatUsers(e.target.value)
      }
      , 1000)
    }
    else setSearchedUsers([])
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      photo: null,
      description: "",
      membersUserNames: [],
      adminsUserNames:[]
    },
  
    onSubmit: async (values, actions) => {
      if (!values.name.length) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Group name is required!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const formData = new FormData();
        formData.append("name", values.name)
        if (values.description.length) formData.append("description", values.description)
        values.membersUserNames.forEach((member, index) => {
          console.log(member)
          formData.append(`members[${index}].userName`, member);
          formData.append(`members[${index}].groupRole`, "member");
        });
        formData.append("ownerUserName", store.user.userName)
        formData.append("photo", values.photo)
        await store.createGroup(formData);
        values.photo = null;
        setSelectedUsers([])
        actions.resetForm({
          name: "",
          photo: null,
          description: "",
          membersUserNames: [],
          adminsUserNames:[]
        });
       
        handleOk();
      }
    },
  });
  const handleCheckboxChange = (userName) => {
    const updatedUsers = [...selectedUsers];
    const index = updatedUsers.indexOf(userName);
    if (index === -1) {
      updatedUsers.push(userName);
    } else {
      updatedUsers.splice(index, 1);
    }
    setSelectedUsers(updatedUsers);

    formik.setFieldValue('membersUserNames', updatedUsers);
  };
  return (
    <div id="users-wrapper">
      <IconButton className='go-back-icon' onClick={()=>navigate(-1)}><ArrowBackIosIcon style={{fontSize:'12px'}} /> <span>go back</span></IconButton>
      <Modal
        open={isModalOpen}
        footer = {null}
        title = "Create group"
        onCancel={handleCancel}
      >
        <form onSubmit={formik.handleSubmit}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <Input style={{marginBottom:'8px', color:'#293342'}} value={formik.values.name} id="name" onChange={formik.handleChange} placeholder="name" autoComplete="off" />
              <Input  style={{marginBottom:'8px', color:'#293342'}} value={formik.values.description} onChange={formik.handleChange} id="description"  placeholder="description" autoComplete="off"  />
              <div className="photoWrapper" style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <p style={{ color:'#293342'}}>Choose group picture:</p>
                <input style={{display:'none'}} type="file" onChange={(event) => { formik.setFieldValue("photo", event.currentTarget.files[0])}}  id="photo" placeholder="photo" />
                  <label htmlFor="photo"
                    style={{ backgroundColor: "rgb(226,232,240)", width: "35px", height: "35px", marginTop: "10px", cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'50%'}}>
                      <AttachFileIcon style={{ rotate: "45deg", color:'#293342'}} />
                  </label>
              </div>
          </div>
          <Typography style={{margin:'8px 0', color:'#293342'}} variant='h5'>Add Members:</Typography>
          <ul style={{maxHeight:'100px', overflowY:'scroll'}}>
              {userFollows && userFollows.map(item => 
                  <li key={item.userName} style={{display:'flex', alignItems:'center', gap:'8px'}}>
                      <input type="checkbox" checked={selectedUsers.includes(item.userName)} onChange={() => handleCheckboxChange(item.userName)} />
                      <span style={{ color:'#293342'}}>{item.userName}</span>
                  </li>
              )}
          </ul>
          <button style={{marginTop:'8px', padding:'10px 15px', backgroundColor: 'rgb(226,232,240)', border:'none', borderRadius:'8px', cursor:'pointer', color:'#293342'}} type="submit" variant='contained'>Create group</button>
        </form>
      </Modal>
      <div className="header">
        <div className="top">
          <div className="left" style={{display:"flex", justifyContent:"space-around", width:"100%"}}>
            <h3 style={isChatItems ? {color:"rgb(88, 80, 236)"} : {cursor:"pointer", color:"rgb(41, 51, 66)"}} onClick={() => {
              setIsChatItems(true)
              localStorage.setItem("chats", true);
              }}>Chats ({chatsCount})</h3>
            <h3 style={!isChatItems ? {color:"rgb(88, 80, 236)"} : {cursor:"pointer", color:"rgb(41, 51, 66)"}}  onClick={() => {
              setIsChatItems(false)
              localStorage.setItem("chats", false);
              }}>Groups ({groupsCount})</h3>
          </div>
          <div className="right"></div>
        </div>
        {isChatItems &&
          <div className="bottom">
            <Input placeholder="Search" onChange={handleSearchChange} />
          </div>
        }
        {isChatItems && searchedUsers.map(user =>
          <UserSearchItem user={user} connection={connection} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
          )}
          {!isChatItems &&
          <IconButton onClick={showModal} style={{marginTop:"8px", borderRadius:"6px"}}>
            <GroupAddIcon style={{fontSize:"20px"}} />
            <span style={{marginLeft:"6px",fontSize:"18px"}}>New group</span>
          </IconButton>
          }
     </div>
     
      <div className="chatters">
        <ul>
          {isChatItems 
            ? chatItems.map(chatItem => 
              <ChatItem key={chatItem.id} chatItem={chatItem} typingUsers={typingUsers} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} connection={connection} />
             )
             : groupItems.map(groupItem => 
              <GroupItem key={groupItem.id} groupItem={groupItem} groupsTypingUsers={groupsTypingUsers} connection={connection} />
             )
          }
        </ul>
      </div>
    </div>
  );
};

export default ChatLeft;