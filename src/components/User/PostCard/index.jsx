import "./index.scss";
import { Avatar, Divider, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useContext, useEffect, useState } from "react";
import { Card, Skeleton, Switch } from "antd";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
const { Meta } = Card;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Keyboard, Pagination } from "swiper/modules";
import AddComment from "../AddComment";

const UserPostCard = ({ fetchedUser, posts, setPosts, loading, fetchPosts }) => {
  const { store } = useContext(Context);
  
  useEffect(()=>{
    fetchPosts()
  },[])

  function getTimeAgoString(createdAt) {
    const elapsedTime = Math.floor((Date.now() - createdAt) / (1000 * 60)); 

    if (elapsedTime < 1) {
        return 'less than a minute ago';
    } else if (elapsedTime === 1) {
        return '1 minute ago';
    } else if (elapsedTime < 60) {
        return `${elapsedTime} minutes ago`;
    } else if (elapsedTime < 120) {
        return 'an hour ago';
    } else if (elapsedTime < 1440) { 
        const hoursAgo = Math.floor(elapsedTime / 60);
        return `${hoursAgo} hours ago`;
    } else if (elapsedTime < 2880) { 
        return 'yesterday';
    } else {
        const daysAgo = Math.floor(elapsedTime / 1440); 
        return `${daysAgo} days ago`;
    }
}


  return (
    <div id="user-posts-wrapper">
      {posts &&
        posts.map((post) => {
          const postCreatedAt = Date.parse(post.createdAt);
          const timeAgoString = getTimeAgoString(postCreatedAt);
          return (
            <div key={post.id} id="user-post-card">
              <div className="header">
                <ul>
                  <li>
                    <Avatar src={fetchedUser.imageUrl} />
                    <p>
                      <span>
                        {fetchedUser.name} {fetchedUser.surname}
                      </span>
                      <span>
                        {timeAgoString}
                      </span>
                    </p>
                  </li>

                  <li>
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  </li>
                </ul>
              </div>

              <Divider />
              <div className="post-content">
                <Swiper
                  key={post.id}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  keyboard={{
                    enabled: true,
                    onlyInViewport: false, 
                  }}
                  modules={[Keyboard, Pagination]}
                  className="mySwiper"
                >
                  {post.items &&
                    post.items.map((item) => {
                      if(item.type == 'Image'){
                        return (
                          <SwiperSlide key={item.id} className="swiper-slide">
                            <img
                              src={item?.sourceUrl}
                              alt=""
                            />
                          </SwiperSlide>
                        );
                      }
                      if(item.type == 'Video'){
                        return(
                        <SwiperSlide key={item.id} className="swiper-slide">
                            <video style={{ borderRadius: '8px',}} controls width="100%" height="100%" >
                                <source src={item?.sourceUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </SwiperSlide>
                        )
                      }
                    })}
                </Swiper>
                <p>
                  {post?.description}
                </p>
                <div className="icons-wrapper">
                  <IconButton
                    style={{
                      backgroundColor: "rgb(254,226,226)",
                      color: "rgb(239,68,68)",
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  {/* <IconButton style={{backgroundColor:'rgb(254,226,226)', color:'rgb(239,68,68)'}}>
                                    <FavoriteBorderIcon/>
                                </IconButton> */}
                  <IconButton
                    style={{
                      backgroundColor: "rgb(235,239,244)",
                      color: "rgb(75,85,99)",
                    }}
                  >
                    <MapsUgcIcon />
                  </IconButton>
                </div>
              </div>

              <Divider />

              <div className="comments">
                <ul>
                  {post.comments && post.comments.map((comment) => {
                    console.log(comment);
                    return (
                      <li key={comment.id}>
                        <Avatar src={comment?.authorImageUrl} />
                        <div>
                          <h6>{comment?.author}</h6>
                          <p>{comment?.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {
                  post.comments.length !=0 &&
                  <button>
                    <ExpandMoreIcon />
                    <span>More Comments</span>
                  </button>
                }
              </div>

              <Divider />

              <div className="my-comment">
                <AddComment postId={post.id}/>
              </div>
            </div>
          );
        })}

      {loading && (
        <Card style={{ width: "100%", marginTop: 16, border: "none" }}>
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      )}
    </div>
  );
};

export default observer(UserPostCard);
