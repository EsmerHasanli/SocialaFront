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
  const {currentUserFollows, setCurrentUserFollows} = useContext(FollowContext);
  
  async function handleFollowBtn() {
      let count;
      const followItem = currentUserFollows.find(fi => fi.userName == likeItem.username)
        if (!followItem) 
        {
            const newFollowItem = await store.followUser(likeItem.username);
            console.log(newFollowItem);
            if (likeItem.username == fetchedUser.userName) {
              if (newFollowItem?.isConfirmed) {
                count = fetchedUser.followersCount + 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
              }
             
            }
            setCurrentUserFollows([...currentUserFollows, {...newFollowItem}])
        }
        else 
        {
            const currentFollow = currentUserFollows.find(f => f.userName == likeItem.username);
            if (currentFollow) {
                await store.unfollowUser(likeItem.username);
            }
            const filteredArr = currentUserFollows.filter(f => f.userName != likeItem.username)
            if (currentFollow.isConfirmed && likeItem.username == fetchedUser.userName) {
                count = fetchedUser.followersCount - 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            
            setCurrentUserFollows([...filteredArr]);
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
            <Button onClick={handleFollowBtn}>{currentUserFollows.find(f => f.userName == likeItem.username) 
              ? currentUserFollows.find(f => f.userName == likeItem.username && f.isConfirmed)
                  ? "unfollow" 
                  : "cancel request" 
              : 'follow'}</Button>
          )}
        </div>
      </li>
    </>
  );
};

export default observer(PostLikeItem);