import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../../main";
import "../../Posts/index.scss";
import { Avatar, Divider, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card } from "antd";
const { Meta } = Card;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Pagination } from "swiper/modules";
import AddComment from "../../AddComment";
import PostComment from "./PostComment";
import PostLike from "./PostLike";

const PostCard = ({ post, fetchedUser }) => {
    // console.log("post", post);
  const { store } = useContext(Context);
  const [comments, setComments] = useState(post.comments);
  const [commentSkip, setCommentSkip] = useState(-5);
  const [showMoreBtn, setShowMoreBtn] = useState(
      post.comments.length == 5 ? true : false
      );
      
  
  const postCreatedAt = Date.parse(post.createdAt);
  const timeAgoString = getTimeAgoString(postCreatedAt);
  async function showMoreComments() {
    const skip = commentSkip + 10;
    const commentsFromDb = await store.getPostComments(post.id, skip);
    if (commentsFromDb.length < 10) setShowMoreBtn(false);
    setComments([...comments, ...commentsFromDb]);
    setCommentSkip(commentSkip + 10);
  }
  function getTimeAgoString(createdAt) {
    const elapsedTime = Math.floor((Date.now() - createdAt) / (1000 * 60));

    if (elapsedTime < 1) {
      return "less than a minute ago";
    } else if (elapsedTime === 1) {
      return "1 minute ago";
    } else if (elapsedTime < 60) {
      return `${elapsedTime} minutes ago`;
    } else if (elapsedTime < 120) {
      return "an hour ago";
    } else if (elapsedTime < 1440) {
      const hoursAgo = Math.floor(elapsedTime / 60);
      return `${hoursAgo} hours ago`;
    } else if (elapsedTime < 2880) {
      return "yesterday";
    } else {
      const daysAgo = Math.floor(elapsedTime / 1440);
      return `${daysAgo} days ago`;
    }
  }

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
              <span>{timeAgoString}</span>
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
              if (item.type == "Image") {
                return (
                  <SwiperSlide key={item.id} className="swiper-slide">
                    <img src={item?.sourceUrl} alt="" />
                  </SwiperSlide>
                );
              }
              if (item.type == "Video") {
                return (
                  <SwiperSlide key={item.id} className="swiper-slide">
                    <video
                      style={{ borderRadius: "8px" }}
                      controls
                      width="100%"
                      height="100%"
                    >
                      <source src={item?.sourceUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
        <p>{post?.description}</p>
        <div className="icons-wrapper">
          <PostLike post={post} fetchedUser={fetchedUser} />
        </div>
      </div>
      <Divider />
      <div className="comments">
        <ul>
          {comments.map((comment) => (
            <PostComment post={post} comment={comment} />
          ))}
        </ul>
        {showMoreBtn && (
          <button>
            <ExpandMoreIcon />
            <span onClick={showMoreComments}>More Comments</span>
          </button>
        )}
      </div>

      <Divider />

      <div className="my-comment">
        <AddComment comments={comments} setComments={setComments} post={post} />
      </div>
    </div>
  );
};
export default observer(PostCard);
