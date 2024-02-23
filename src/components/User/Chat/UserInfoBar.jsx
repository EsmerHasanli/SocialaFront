import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from "react-router-dom";

const UserInfoBar = ({currentChat}) => {
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
                <Avatar src={currentChat.chatPartnerImageUrl} className="avatar"/>
                <h2>{currentChat?.chatPartnerName} {currentChat?.chatPartnerSurname}</h2>
                <h6>@{currentChat?.chatPartnerUserName}</h6>
                <Link to={`/users/${currentChat.chatPartnerUserName}`}>View profile</Link>
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
};

export default UserInfoBar;
