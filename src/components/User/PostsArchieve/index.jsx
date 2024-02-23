import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import PostCard from '../Posts/PostCard'

const PostsArchive = () => {
 const { store } = useContext(Context)
 const [ skip, setSkip ] = useState(0);
 const [ archivedPosts, setArchievedPosts ] = useState([])
 
 async function getArchievePostsAsync() {
  const posts = await store.getArchievePosts(skip)
  // if(posts.length < 10){
  //   setIsEnded(true);
  // }
  setSkip(skip+10);
  setArchievedPosts([...archivedPosts, ...posts]);
}

 useEffect(()=>{
  getArchievePostsAsync()
 },[])

  return (
    <div className='content-wrapper'>
        <p>Only you can see your archived posts unless you choose to share them.</p>
        {archivedPosts && archivedPosts.map(post => (
            <PostCard key={post.id} post={post} setArchievedPosts={setArchievedPosts} />
        ))}
    </div>
  )
}

export default observer(PostsArchive)