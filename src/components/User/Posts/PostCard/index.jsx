import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../../main";
import "../../Posts/index.scss";
import { Avatar, Divider, IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material";
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
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PostCard = ({ post, posts, setPosts, archivedPosts, setArchivedPosts }) => {
  const location = useLocation()
  const path = location.pathname

  // console.log("post", post);
  const { store } = useContext(Context);
  const [comments, setComments] = useState(post.comments);
  const [commentSkip, setCommentSkip] = useState(-5);
  const [showMoreBtn, setShowMoreBtn] = useState( post.comments.length == 5 ? true : false );
  const [commentsCount, setCommentsCount] = useState(post?.commentsCount);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  
  async function handleDeletePost(id) {
    handleClose()
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(59,130,246)",
      cancelButtonColor: "rgb(239,68,68)",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        await store.deletePost(id);
        console.log(posts);
        console.log("postId", id);
        if (archivedPosts) {
          const archiveArr = archivedPosts.filter(p => p.id != id)
          setArchivedPosts(archiveArr)

        }
        if (posts) {
          const postsArr = posts.filter(p => p.id != id)
          setPosts(postsArr);

        }
      }
    });
  }

  async function handleRecoverPost (id) {
      console.log(id);
      handleClose();
      const res = await store.recoverArchivePosts(id)
      const updatedArr = archivedPosts.filter(x => x.id != id)
      setArchivedPosts(updatedArr)
  }

  return (
    <div key={post.id} id="user-post-card">
      <div className="header">
        <ul>
          {post.appUserUserName == store.user.userName ? (
            <li>
              <Avatar src={post.appUserImageUrl} />
              <p>
                <span>
                  {post.appUserName} {post.appUserSurname}
                </span>
                <span>{timeAgoString}</span>
              </p>
            </li>
          ) : (
            <Link to={`users/${post.appUserUserName}`}>
              <li>
                <Avatar src={post.appUserImageUrl} />
                <p>
                  <span>
                    {post.appUserName} {post.appUserSurname}
                  </span>
                  <span>{timeAgoString}</span>
                </p>
              </li>
            </Link>
          )}
          {post.appUserUserName == store.user.userName && (
            <>
              <li>
                <IconButton onClick={handleClick}>
                  <MoreHorizIcon /> 
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={()=>handleDeletePost(post.id)}>Delete</MenuItem>
                  {path=='/archive' && <MenuItem onClick={()=>handleRecoverPost(post.id)}>Recover</MenuItem>}
                </Menu>
              </li>
            </>
          )}
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
        {
          path != '/archive' && 
          <div className="icons-wrapper">
            <PostLike post={post} />
            <IconButton className="comment-btn">
              <MapsUgcIcon />
            </IconButton>
            <p>{commentsCount}</p>
          </div>

        }
      </div>
      <Divider />
      {
        path != '/archive' &&
        <>
          <div className="comments">
            <ul>
              {comments.map((comment) => (
                <PostComment
                  key={comment.id}
                  post={post}
                  comment={comment}
                  setCommentsCount={setCommentsCount}
                />
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
          <AddComment
            comments={comments}
            setComments={setComments}
            post={post}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
          />
        </div>
        </>
      }

    </div>
  );
};
export default observer(PostCard);
