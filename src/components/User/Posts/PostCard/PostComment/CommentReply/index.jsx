import { Avatar } from "antd"
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { Context } from "../../../../../../main"

const CommentReply = ({reply}) => {
    const {store} = useContext(Context)

    const [isLiked, setIsLiked] = useState(store.user.likedRepliesIds.find(x=>x.id == reply.id) ? ture : false);
    const [likes, setLikes] = useState(reply.likesCount)

    const handleLikeReply = async () => {
        const res = await store.likeCommentReply(reply.id)
        if(!isLiked){
            setIsLiked(true)
            setLikes(likes+1)
        }else{
            setIsLiked(false)
            setLikes(likes-1)
        }
    } 
    console.log(reply)
    const replyCreatedAt = Date.parse(reply.createdAt);
    const timeAgoString = getTimeAgoString(replyCreatedAt);

    function getTimeAgoString(createdAt) {
        const elapsedTime = Math.floor((Date.now() - createdAt) / (1000 * 60));
        console.log(elapsedTime)
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
        <div className='reply-comments-wrapper'>
            <div className="left">
                <Avatar src={reply?.authorImageUrl} />
                <div>
                    <div>
                        <h6>{reply?.author}</h6>
                        <span>{timeAgoString}</span>
                    </div>
                    <p>{reply?.text}</p>
                </div>
            </div>
            <div className="right">
                <p onClick={handleLikeReply}>Like <span style={{color: isLiked ? 'rgb(239,68,68)' : ' rgb(107, 114, 128)'}}>{likes}</span></p>
            </div>
        </div>
    )
}
export default observer(CommentReply)