import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from "react-router-dom";
import { AttachFileIcon } from "@mui/icons-material/AttachFile";
const GroupInfoBar = ({currentGroup}) => {
    const [userInfoBar, setShowUserInfoBar] = useState(false);

    return (
      <>
        <IconButton onClick={()=>setShowUserInfoBar(true)}>
          <InfoOutlinedIcon />
        </IconButton>
  
        {
        userInfoBar && 
        <div id="user-info-bar">
          <div className="wrapper">
              <div className="gradient"></div>
              <IconButton onClick={()=>setShowUserInfoBar(false)}>
                  <CloseOutlinedIcon/>
              </IconButton>
              <div className="profile">
                  <input  id="chAv" type="file" style={{display:"none"}} />
                  <label htmlFor="chAv" >
                  <Avatar src={currentGroup?.imageUrl} className="avatar"/>
                  </label>
                  <h2>{currentGroup?.name}</h2>
                  <h3>{currentGroup?.description}</h3>
                  <h6>{currentGroup?.usersCount} Members</h6>
              </div>
              <ul>
                  <li>
                      <div className="right">
  
                      </div>
                      <div className="left">
  
                      </div>
                  </li>
                  <li>
                      
                  </li>
              </ul>
          </div>
        </div>
      }
      </>
    );
}

export default GroupInfoBar;
