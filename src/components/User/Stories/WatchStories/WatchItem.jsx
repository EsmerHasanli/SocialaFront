import { Avatar } from '@mui/material';
import React from 'react';

const WatchItem = ({watcher}) => {
    const watchedAt = Date.parse(watcher?.createdAt);
    const timeAgoString = getTimeAgoString(watchedAt);
  
    function getTimeAgoString(createdAt) {
      let elapsedTime = Math.floor((Date.now() - createdAt) / (1000 * 60));
      const currentTime = new Date();
      const timezoneOffsetInMinutes = currentTime.getTimezoneOffset();
      const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
      const utcOffset = -timezoneOffsetInHours;
      elapsedTime = elapsedTime - (utcOffset * 60);
  
      if (elapsedTime < 1) {
        return `${elapsedTime * 60}s`;
      } else if (elapsedTime < 60) {
        return `${elapsedTime}m`;
      } else if (elapsedTime < 1440) {
        const hoursAgo = Math.floor(elapsedTime / 60);
        return `${hoursAgo}h`;
      } else if (elapsedTime < 2880) {
        return "1d";
      } else {
        const daysAgo = Math.floor(elapsedTime / 1440);
        return `${daysAgo} days ago`;
      }
    }
    
    return (
        <li key={watcher.id} className='watch-item'>
            <Avatar src={watcher.watcherImageUrl}/>
            <p>{watcher.watcherUserName}</p>
            <span>{timeAgoString}</span>
        </li>
    );
}

export default WatchItem;
