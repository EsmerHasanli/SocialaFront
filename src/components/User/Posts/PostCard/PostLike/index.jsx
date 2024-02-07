import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../../main";

import { Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";

const PostLike = ({ post }) => {
  const { store } = useContext(Context);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isPostLiked, setIsPostLiked] = useState(
    store.user.likedPosts.find((x) => (x.post.id == post.id ? true : false))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([])

  const handleLikePost = async () => {
    const res = await store.likePost(post.id);
    if (res.status == 204) {
      if (!isPostLiked) {
        setLikesCount(likesCount + 1);
        setIsPostLiked(true);
      } else {
        setLikesCount(likesCount - 1);
        setIsPostLiked(false);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowUsers = async () => {
    showModal()
    const res = await store.getPostLikes(post.id)
    setUsers(res)
  }
  
  return (
    <>
      <IconButton
        onClick={handleLikePost}
        style={{
          backgroundColor: "rgb(254,226,226)",
          color: "rgb(239,68,68)",
        }}
      >
        {isPostLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <p style={{cursor:'pointer'}} onClick={handleShowUsers}>{likesCount && likesCount}</p>

      <Modal
        title="Liked by"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <ul>
            {
                users && 
                users.map(user => 
                    <li style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'8px 0', cursor:'pointer'}}> 
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'16px'}}>
                            <Link to={`/users/${user.username}`}><Avatar src={user?.imageUrl}/></Link>
                            <Link to={`/users/${user.username}`}><p style={{color:'black'}}>{user?.username}</p></Link>
                        </div>
                        <div>
                            <Button>follow</Button>
                        </div>
                    </li>
                )
            }
        </ul>
      </Modal>
    </>
  );
};

export default observer(PostLike);
