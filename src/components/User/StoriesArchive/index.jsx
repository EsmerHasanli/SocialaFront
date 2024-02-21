import React, { useContext, useEffect, useState } from 'react'
import StoryCard from './StoryCard'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'

const StoriesArchive = () => {
  const { store } = useContext(Context)
  const [ stories, setStories ] = useState([])

  useEffect(() => {
    async function getStories() {

    }
  },[])

  return (
    <div className='content-wrapper'>
        <p>Only you can see your archived stories unless you choose to share them.</p>
        {stories && stories.map(story => (
            <StoryCard story={story} />
        ))}
    </div>
  )
}

export default observer(StoriesArchive)