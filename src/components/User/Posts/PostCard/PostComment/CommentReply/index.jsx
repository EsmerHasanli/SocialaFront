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
    
    return (
        <div className='reply-comments-wrapper'>
            <div className="left">
                <Avatar src={reply?.authorImageUrl} />
                <div>
                    <h6>{reply?.author}</h6>
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
