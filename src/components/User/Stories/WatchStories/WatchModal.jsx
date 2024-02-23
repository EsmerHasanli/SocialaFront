import React, { useContext, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton } from "@mui/material";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";

const WatchModal = ({ isModalOpen, handleCancel, watchers }) => {

  return (
    <>
      {
        isModalOpen && 
        <div className="modal-wrapper" style={{display:'flex', flexDirection: 'column', position:'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999999999999999', backgroundColor:'white', borderRadius:'8px', padding:'10px', width:'300px'}}>
          <div className="btn-wrapper" style={{width: '100%', display:'flex', alignItems: 'end', justifyContent: 'end'}}>
            <IconButton onClick={handleCancel} style={{float:'left', width:'30px', height:'30px'}}><CloseIcon/></IconButton>
          </div>
          <ul style={{width: '150px'}}>
          {watchers && watchers.map(watcher => 
              <li key={watcher.id} style={{display:'flex', alignItems:'center', gap:'8px', margin:'4px 0'}}>
                  <Avatar src={watcher.watcherImageUrl}/>
                  <p>{watcher.watcherUserName}</p>
              </li>
              )}
          </ul>
        </div>
      }
    </>
  );
};

export default observer(WatchModal);
