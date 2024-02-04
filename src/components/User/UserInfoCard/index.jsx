import React from "react";
import "./index.scss";


import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';

const UserInfoCard = () => {
  return (
    <div id="user-info-card">
      <div className="header">
        <h3>Intro</h3>
        <button>Edit</button>
      </div>
      <div className="info">
        <ul>
          <li>
            <LocationOnOutlinedIcon/>
            <span>Live In <b>Cairo , Eygept</b></span>
          </li>
          <li>
            <SchoolOutlinedIcon/>
            <span>Studied at <b>University of Turkey</b></span>
          </li>
          <li>
            <WorkOutlineOutlinedIcon/>
            <span>Works at <b>Envanto Martket</b></span>
          </li>
          <li>
            <FavoriteBorderOutlinedIcon/>
            <span>In <b>Relationship</b></span>
          </li>
          <li>
            <RssFeedOutlinedIcon/>
            <span>Flowwed By 3,240 People</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoCard;
