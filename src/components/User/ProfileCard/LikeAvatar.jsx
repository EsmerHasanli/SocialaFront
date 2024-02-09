import React, { useContext, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

import { Avatar } from "@mui/material";
import { FollowContext } from "../../../context";

const LikeAvatar = () => {
    const { store } = useContext(Context);
  const { fetchedUser, setFetchedUser } = useContext(FollowContext);
  const [sparkVisible, setSparkVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(
    store.user?.likedAvatarsUsernames.find(x=>x.userName == fetchedUser.userName) ? true : false
  )
  const handleLikeAvatar = async () => {
    setSparkVisible(true);
    setTimeout(() => setSparkVisible(false), 1000);

    const likedUserUsername = new FormData();
    likedUserUsername.append('username', fetchedUser.userName)

   const res = await store.likeAvatar(likedUserUsername)
   console.log(res);

   setIsLiked(!isLiked)
  }

  return (
    <div className="like-avatar">
      <Avatar
        className="likebtn"
        onClick={handleLikeAvatar}
        src={fetchedUser?.imageUrl}
        style={{ boxShadow: sparkVisible ? "0 0 10px 5px rgba(239,68,68, 0.8)" : "none", border: isLiked ? '8px solid rgb(244,124,124)' : '8px solid rgb(243, 244, 246)' }}
      />
      {/* {sparkVisible && <div style={{backgroundImage: `url(${fetchedUser?.imageUrl})`}} className="sparks"></div>}  */}
    </div>
  );
};

export default observer(LikeAvatar);
