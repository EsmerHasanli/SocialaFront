import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";

const FollowsRequestsModal = ({ currentUserFollows }) => {
    console.log('currentUserFollows', currentUserFollows);

  return (
    <>
      <li>
        Follow Requests{" "}
        <span>
          {currentUserFollows?.filter((uf) => uf.isConfirmed == false).length}
        </span>
      </li>
    </>
  );
};

export default observer(FollowsRequestsModal);
