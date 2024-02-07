import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../../main";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Modal } from "antd";
import PostLikeItem from "./PostLikeItem";

const PostLike = ({ post }) => {
  const { store } = useContext(Context);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isPostLiked, setIsPostLiked] = useState(
    store.user.likedPosts.find((x) => (x.post.id == post.id ? true : false))
  );
  const [likeItems, setLikeItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    showModal();
    const res = await store.getPostLikes(post.id);
    setLikeItems(res);
  };

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

      <p style={{ cursor: "pointer" }} onClick={handleShowUsers}>
        {likesCount && likesCount}
      </p>

      <Modal
        title="Liked by"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <ul>
          {likeItems.map((likeItem) => (
            <PostLikeItem likeItem={likeItem} />
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default observer(PostLike);
