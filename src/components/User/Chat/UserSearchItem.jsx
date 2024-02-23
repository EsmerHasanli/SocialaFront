import { Input, Modal,Button } from "antd";
import React, { useContext, useState } from "react";
import { Context } from "../../../main";
import { Avatar, IconButton } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

const UserSearchItem = ({ user, connection, currentChatId, setCurrentChatId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const { store } = useContext(Context);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function sendMessage() {
    if (value.length) {
      const payload = {
        sender: store.user.userName,
        receiverUsername: user.userName,
        text: value,
      };
      connection.sendMessageByUserName(payload);
    }
    setValue("")
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal
        title="Message"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <div style={{display:'flex', gap:'10px'}}>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </Modal>
      <li key={user.userName} style={{ display: "flex", alignItems: "center", justifyContent:'space-between', flexWrap:'wrap', marginTop:'16px' }}>
        <div style={{display: "flex", alignItems: "center", gap:'10px'}}>
          <Avatar src={user.imageUrl} />
          <h5 style={{fontSize: '14px',fontWeight: '500'}}>
            {user.userName}
          </h5>
        </div>
        <div style={{display: "flex", alignItems: "center", gap:'10px'}}>
          {user.chatId ?
            <IconButton onClick={() => {
              if (currentChatId) connection.disconnectFromChat(currentChatId)           
              setCurrentChatId(user.chatId)
              localStorage.setItem("chatId", JSON.stringify(user.chatId));
            }} style={{border:'1px solid rgb(88,80,236)', color:'rgb(88,80,236)'}} variant='outlined'><QuestionAnswerRoundedIcon/></IconButton>
            :
            <IconButton style={{ border:'1px solid rgb(88,80,236)', backgroundColor:'rgb(88,80,236)', color:'white'}} variant='contained' onClick={showModal}><SendOutlinedIcon style={{rotate:'45deg'}}/></IconButton>
            }
        </div>
      </li>
    </>
  );
};

export default UserSearchItem;
