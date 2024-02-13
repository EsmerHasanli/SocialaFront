import { Avatar, Modal } from "antd";
import React, { useContext, useState } from "react";
import { Context } from "../../../main";

const UserSearchItem = ({ user, connection }) => {
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
  }
  return (
    <>
      <Modal
        title="Follower"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </Modal>
      <li key={user.userName} style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={user.imageUrl} />
        <h4>
          {user.name} {user.surname}
        </h4>
        <button onClick={showModal}>Send message</button>
        {user.chatId && <button>Go chat</button>}
      </li>
    </>
  );
};

export default UserSearchItem;
