import React, { useState } from 'react'
import './index.scss'

import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import VideocamIcon from '@mui/icons-material/Videocam';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { IconButton } from '@mui/material';

import {  Divider, Modal } from 'antd';

const AddPost = () => {
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
    <section id='add-post'>
        <button  onClick={showModal} className='status'>What Do You Have On Mind ?</button>

        <IconButton className='photo'><CollectionsIcon/></IconButton>

        <IconButton className='video'><VideocamOutlinedIcon/></IconButton>

      <Modal style={{textAlign:'center'}} title="Create Status" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Create">
        <Divider/>
        <textarea style={{width:'100%', height:'130px', border:'none', padding:"10px", fontSize:'20px', fontWeight:'400px'}}>What Do You Have On Mind ?</textarea>
        <ul style={{margin:'10px', display:'flex', gap:'15px'}}>
            <li style={{ display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'25px', padding:'4px 8px', gap:'8px', border:'1px solid rgb(224,242,254)', backgroundColor:'rgb(240,249,255)', color:'rgb(55,158,211)'}}><CollectionsIcon /><span>Image</span></li>
            <li style={{ display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'25px', padding:'4px 8px', gap:'8px', border:'1px solid rgb(204,251,241)', backgroundColor:'rgb(240,253,250)', color:'rgb(13,148,136)'}}><VideocamIcon/><span>Video</span></li>
            <li style={{ display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'25px', padding:'4px 8px', gap:'8px', border:'1px solid rgb(255,237,213)', backgroundColor:'rgb(255,228,230)', color:'rgb(234,88,12)'}}><EmojiEmotionsIcon/><span>Feeling</span></li>
            <li style={{ display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'25px', padding:'4px 8px', gap:'8px', border:'1px solid rgb(255,228,230)', backgroundColor:'rgb(255,228,230)', color:'rgb(220,38,38)'}}><FmdGoodIcon/><span>Check In</span></li>
        </ul>
      </Modal>
    </section>
  )
}
export default AddPost