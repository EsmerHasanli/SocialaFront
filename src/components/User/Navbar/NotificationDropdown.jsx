import React from 'react'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='notification-dropdown'>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            
            <Avatar sx={{ width: 32, height: 32 }}><NotificationsActiveIcon /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            '@media (max-width: 600px)': {
              '& .MuiMenuItem-root': {
                maxWidth: '300px',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <div>
            <Avatar /> 
          </div>
          <div>
            <p><b>Alexa Gray</b> started following you. Welocome him to your profile. <WavingHandIcon style={{fill:'rgb(255,200,61)', fontSize:'16px'}} /></p>
            <article>4 hours ago</article>
          </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <div>
            <Avatar /> 
          </div>
          <div>
            <p><b>Jesse Steeve</b> commented on ypur photo. "Wow, stanning shot!" <CloudQueueIcon style={{fill:'rgb(155,155,155)', fontSize:'16px'}} /></p>
            <article>4 hours ago</article>
          </div>
        </MenuItem>

      </Menu>
    </div>
  );
}

export default NotificationDropdown;
