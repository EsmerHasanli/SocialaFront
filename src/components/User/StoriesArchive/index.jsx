import React, { useContext, useEffect, useState } from 'react'
import StoryCard from './StoryCard'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

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
              <StoryCard story={story}stories={stories} setStories={setStories} />
          ))}
        </div>
    </div>
  )
}

export default observer(StoriesArchive)