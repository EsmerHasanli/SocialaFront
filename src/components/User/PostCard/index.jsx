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

const UserPostCard = ({ fetchedUser, posts, setPosts, loading, fetchPosts }) => {
  const { store } = useContext(Context);
  
  useEffect(()=>{
    fetchPosts()
    console.log('posts');
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
        posts.map((post, id) => {
          const postCreatedAt = Date.parse(post.createdAt);
          const timeAgoString = getTimeAgoString(postCreatedAt);
          return (
            <div key={id} id="user-post-card">
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
                      if(item.type == 'image'){
                        return (
                          <SwiperSlide className="swiper-slide">
                            <img
                              src="https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-2.jpg"
                              alt=""
                            />
                          </SwiperSlide>
                        );
                      }
                      if(item.type == 'video'){
                        return(
                        <SwiperSlide className="swiper-slide">
                            <video style={{ borderRadius: '8px',}} controls width="100%" height="100%" >
                                <source src="https://cdn.dribbble.com/users/133941/screenshots/16414788/media/cd8b34ba1faa0e80f66c6b67b33a5feb.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </SwiperSlide>
                        )
                      }
                    })}
                </Swiper>
                <p>
                  {post?.description}
                  📷
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
                    return (
                      <li>
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
                <div>
                  <Avatar />
                  <input placeholder="Add Comment...." type="text" />
                </div>
                <button>Reply</button>
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
