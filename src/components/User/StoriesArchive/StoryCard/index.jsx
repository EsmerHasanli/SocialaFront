import * as React from 'react'
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StoryCard = ({ story }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="card-wrapper">
          <div className="card" style={{backgroundImage:'url(https://images.pexels.com/photos/18254529/pexels-photo-18254529/free-photo-of-portrait-of-brunette-woman-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)' }}>
          <div className="date">
              <b>17</b> <span>Feb 2023</span>
          </div>
          <IconButton onClick={handleClick}>
              <MoreVertIcon/>
          </IconButton>
          </div>
      </div>
    </>
  )
}

export default StoryCard