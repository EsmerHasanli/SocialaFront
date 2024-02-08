import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Avatar } from "@mui/material";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../../../main";
import { FollowContext } from "../../../../../../context";

const PostLikeItem = ({likeItem, handleClose}) => {
  const navigate = useNavigate()
  const { store } = useContext(Context);
  const {fetchedUser, setFetchedUser} = useContext(FollowContext)
  const followItem = store.user.follows.find(f => f.userName == likeItem.username)
  const [followBtn, setFollowBtn] = useState(
    followItem
      ? followItem.isConfirmed
        ? "unfollow"
        : "cancel request"
      : "follow"
  );
  async function handleFollowBtn() {
    const isPrivate = await store.checkAccountPrivate(likeItem.username);
    if (followBtn == "follow") {
      await store.followUser(likeItem.username);
      if (fetchedUser.userName == likeItem.username) {
        const count = fetchedUser.followersCount + 1;
        setFetchedUser(prev => ({...prev,followersCount:count}))
      }
      if (isPrivate) setFollowBtn("cancel request");
      else setFollowBtn("unfollow");
    } else {
      await store.unfollowUser(likeItem.username);
      const count = fetchedUser.followersCount - 1;
      setFetchedUser(prev => ({...prev,followersCount:count }))
      setFollowBtn("follow");
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
          <div style={{display: 'flex', alignItems:'center', gap:'16px', cursor:'pointer'}} onClick={()=>navigate(`/users/${likeItem.username}`) } >
            <Avatar src={likeItem?.imageUrl} />
            <p style={{ color: "black" }}>{likeItem?.username}</p>
          </div>
        </div>
        <div>
          {store.user.userName != likeItem.username && (
            <Button onClick={handleFollowBtn}>{followBtn}</Button>
          )}
        </div>
      </li>
    </>
  );
};

export default observer(PostLikeItem);