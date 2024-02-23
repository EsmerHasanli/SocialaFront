import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import StoryVideoCard from './StoryVideoCard'
import StoryPhotoCard from './StoryPhotoCard'

const StoriesArchive = () => {
  const { store } = useContext(Context)
  const [ stories, setStories ] = useState([])
  const [ skip, setSkip ] = useState(0);

  async function getStories() {
    const posts = await store.getArchiveStories(skip)
    console.log(posts);
    // if(posts.length < 10){
    //   setIsEnded(true);
    // }
    setSkip(skip+10);
    setStories([...stories, ...posts]);
  }

  useEffect(() => {
    getStories()
  },[])

  return (
    <div className='content-wrapper'>
        <p>Only you can see your archived stories unless you choose to share them.</p>
        <div className="card-wrapper">
          {stories && stories.map(story => (
            story.type == 'Image' ?
              <StoryPhotoCard story={story} stories={stories} setStories={setStories} /> : 
              story.type == 'Video' ?
              <StoryVideoCard story={story} stories={stories} setStories={setStories}/> : null
          ))}
        </div>
    </div>
  )
}

export default observer(StoriesArchive)