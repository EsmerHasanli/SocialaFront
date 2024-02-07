import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Avatar } from "@mui/material";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../../../../../main";

const PostLikeItem = ({ likeItem }) => {
  const { store } = useContext(Context);
  const [follow, setFollow] = useState(
    store.user.follows.find((f) => f.userName == likeItem.username)
      ? f.isConfirmed
        ? "unfollow"
        : "cancel request"
      : "follow"
  );
  async function handleFollowBtn() {
    const isPrivate = await store.checkAccountPrivate(likeItem.username);
    if (follow == "follow") {
      await store.followUser(likeItem.username);
      if (isPrivate) setFollow("cancel request");
      else setFollow("unfollow");
    } else {
      await store.unfollowUser(likeItem.username);
      setFollow("follow");
    }
  }
  return (
    <>
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "8px 0",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Link to={`/users/${likeItem.username}`}>
            <Avatar src={likeItem?.imageUrl} />
          </Link>
          <Link to={`/users/${likeItem.username}`}>
            <p style={{ color: "black" }}>{likeItem?.username}</p>
          </Link>
        </div>
        <div>
          {store.user.userName != likeItem.username && (
            <Button onClick={handleFollowBtn}>{follow}</Button>
          )}
        </div>
      </li>
    </>
  );
};

export default observer(PostLikeItem);
