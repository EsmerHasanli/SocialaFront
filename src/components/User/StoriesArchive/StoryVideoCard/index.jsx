import * as React from 'react'
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Context } from '../../../../main';
import { observer } from 'mobx-react-lite';

const StoryVideoCard = ({story, stories, setStories}) => {
  console.log('story', story);
  const { store } = React.useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [day, setDay] = React.useState();
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function getDate() {
    const dateString = story.createdAt;
    const date = new Date(dateString);

    const x = date.getDate();
    setDay(x);
    const y = date.getMonth() + 1;
    setMonth(y);
    const z = date.getFullYear();
    setYear(z);
  }

  async function handleDelete(id) {
    await store.deleteStory(id);
    const filtetedStories = stories.filter((s) => s.id != id);
    setStories(filtetedStories);
    handleClose();
  }

  React.useEffect(() => {
    getDate();
  }, []);

  return (
    <div className="card" style={{backgroundColor: 'black'}}>
        <video controls style={{width:'100%', height:'100%'}} onClick={(e) => e.stopPropagation()}>
            <source src={story.sourceUrl} type="video/mp4" />
            Your browser does not support the video tag or the file format of this video.
        </video>
        <div className="date">
            <b>{day}</b> <br /> <p>{month}<br/>{year}</p>
        </div>
        <div className="descr">
        {story?.text}
        </div>
        <IconButton onClick={handleClick}>
            <MoreVertIcon style={{color: 'white'}}/>
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
        <MenuItem onClick={()=>handleDelete(story.id)}>Delete</MenuItem>
        </Menu>
    </div>
  );
};

export default observer(StoryVideoCard);
