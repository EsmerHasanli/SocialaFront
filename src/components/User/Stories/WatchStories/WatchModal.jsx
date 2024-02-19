import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Modal } from 'antd';
import { Avatar } from "@mui/material";

const WatchModal = ({ storyItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  return (
    <>
      <button className="watch-wrapper" onClick={showModal}>
        <RemoveRedEyeIcon />
        <span>{storyItem?.watchCount}</span>
      </button>

      <Modal title="Watchers" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} style={{width: '150px', position: 'relative', zIndex: '999999999999'}}>
        <ul>
            <li style={{display:'flex', alignItems:'center', gap:'8px', margin:'4px 0'}}>
                <Avatar/>
                <p>username</p>
            </li>
            <li style={{display:'flex', alignItems:'center', gap:'8px', margin:'4px 0'}}>
                <Avatar/>
                <p>username</p>
            </li>
            <li style={{display:'flex', alignItems:'center', gap:'8px', margin:'4px 0'}}>
                <Avatar/>
                <p>username</p>
            </li>
        </ul>
      </Modal>
    </>
  );
};

export default WatchModal;
