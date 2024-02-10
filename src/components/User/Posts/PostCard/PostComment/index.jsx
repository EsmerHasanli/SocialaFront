import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Context } from "../../../../../main";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import CommentReply from "./CommentReply";
function PostComment({ comment, setCommentsCount }) {
  const { store } = useContext(Context);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [isLiked, setIsLiked] = useState(
    store.user.likedCommentsIds.includes(comment.id) ? true : false
  );
  const commentCreatedAt = Date.parse(comment.createdAt);
  const timeAgoString = getTimeAgoString(commentCreatedAt);
  const [replies, setReplies] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [value, setValue] = useState("");
  const [replySkip, setReplySkip] = useState(-10);
  const [repliesCount, setRepliesCount] = useState(comment.repliesCount);
  const [showRepliesBtn, setShowRepliesBtn] = useState(
    comment.repliesCount ? true : false
  );

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

  async function getReplies() {
    const skip = replySkip + 10;
    const commentsRepliesFromDb = await store.getCommentReplies(
      comment.id,
      skip
    );
    if (commentsRepliesFromDb.length < 10) setShowRepliesBtn(false);
    setReplies([...replies, ...commentsRepliesFromDb]);
    setReplySkip(replySkip + 10);
  }
  async function addCommentReply(commentId) {
    const reply = await store.replyComment(commentId, value);
    setReplies([{ ...reply }, ...replies]);
    setShowReplyInput(false);
    setRepliesCount(repliesCount + 1);
    setCommentsCount(prev => prev+1)
  }
  // useEffect(() => console.log(replies), [replies]);
  async function likeComment(commentId) {
    const res = await store.likeComment(commentId);
    if (res.status == 204) {
      if (isLiked) {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      }
    }
  }
  return (
    <li key={comment.id}>
      <div className="wrapper">
        <div className="com">
          <Avatar src={comment?.authorImageUrl} />
          <div>
            <div>
              <h6>{comment?.author}</h6>
              <span>{timeAgoString}</span>
            </div>
            <p>{comment?.text}</p>
          </div>
        </div>

        <div className="func-wrapper">
          <div className="like">
            <div onClick={() => likeComment(comment.id)}>Like</div>
            <div
              style={
                isLiked ? { color: "rgb(239,68,68)" } : { color: "rgb(107, 114, 128)" }
              }
            >
              {likesCount}
            </div>
            <div className="reply-btn" onClick={() => setShowReplyInput(true)}>
              Reply
            </div>
          </div>
        </div>
      </div>

      <div className="reply-wrapper">
        {showReplyInput && (
          <div>
            <Avatar src={store.user.imageUrl} />
            <input
              className="reply-inp"
              placeholder="Reply..."
              style={{ maxWidth: "100px" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div
              className="send-btn"
              onClick={() => addCommentReply(comment.id)}
            >
              Send
            </div>
          </div>
        )}
      </div>

      <div className="show-reply-btn">
      {replies.map((reply) => (
        <CommentReply key={reply.id} reply={reply} /> 
        ))}
        {showRepliesBtn ? (
          <button>
            <ExpandMoreIcon />
            <span onClick={getReplies}>
              Show replies ({repliesCount - replySkip - 10})
            </span>
          </button>
        ) : replies.length ? (
          <button>
            <ExpandLessIcon />
            <span
              onClick={(e) => {
                setShowRepliesBtn(true);
                setReplySkip(-10);
                setReplies([]);
              }}
            >
              Hide replies ({replies.length})
            </span>
          </button>
        ) : null}

      </div>
    </li>
  );
}
export default observer(PostComment);