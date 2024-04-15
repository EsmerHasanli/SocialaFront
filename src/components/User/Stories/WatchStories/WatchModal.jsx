import React, { useContext, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton } from "@mui/material";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";
import { ArrowDownward, ArrowDropDown, KeyboardArrowDownRounded } from "@mui/icons-material";
import WatchItem from "./WatchItem";

const WatchModal = ({ isModalOpen,  handleCancel, watchers }) => {

  return (
      <div className={isModalOpen ? "modal-wrapper active" : "modal-wrapper"}>
        <h2>Story watchers</h2>
        <ul>
        {watchers && watchers.map(watcher => 
           <WatchItem watcher={watcher}/>
            )}
        </ul>

        <KeyboardArrowDownRounded onClick={handleCancel} className="hide-icon"/>
      </div>
  );
};

export default observer(WatchModal);
