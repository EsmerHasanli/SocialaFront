import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import PostCard from '../Posts/PostCard'

const PostsArchive = () => {
 const { store } = useContext(Context)
 const [ skip, setSkip ] = useState(0);
 const [ archivedPosts, setArchievedPosts ] = useState([])
 
 useEffect(()=>{
    async function fetchPosts() {
        const res = await store.getArchievePosts(skip)
        setArchievedPosts(res)
    }
    fetchPosts()
 },[])

  return (
    <div className='content-wrapper'>
        <p>Only you can see your archived posts unless you choose to share them.</p>
        {archivedPosts && archivedPosts.map(archivedPost => (
            <PostCard/>
        ))}
    </div>
  )
}

export default observer(PostsArchive)