import React from 'react'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { Swiper, SwiperSlide } from "swiper/react";


const AddDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div className='add-dropdown'>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <AddIcon />
              </Avatar>
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
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Swiper style={{padding:'15px', width:"325px"}} watchSlidesProgress={true} spaceBetween={'10px'} slidesPerView={3}>
            <SwiperSlide style={{backgroundColor:"rgb(224,253,247)", color:'rgb(13,148,136)', height:'80px', width:'100px', borderRadius:'5px', fontSize:"14px", fontWeight:'500', padding:'8px'}}>
              <ImportContactsIcon style={{fontSize:'24px', marginBottom:'20px'}}/>
              <p>Story</p>
            </SwiperSlide>
            <SwiperSlide style={{backgroundColor:"rgb(236,247,254)", color:'rgb(2,132,199)', height:'80px', width:'100px', borderRadius:'5px', fontSize:"14px", fontWeight:'500', padding:'8px'}}>
              <CameraAltIcon style={{fontSize:'24px', marginBottom:'20px'}} />
              <p>Post</p>
            </SwiperSlide>
            <SwiperSlide style={{backgroundColor:"rgb(248,241,255)", color:'rgb(147,51,234)', height:'80px', width:'100px', borderRadius:'5px', fontSize:"14px", fontWeight:'500', padding:'8px'}}>
              <VideocamIcon style={{fontSize:'24px', marginBottom:'20px'}}/>
              <p>Reel</p>
            </SwiperSlide>
            <SwiperSlide style={{backgroundColor:"rgb(253,241,248)", color:'rgb(219,39,119)', height:'80px', width:'100px', borderRadius:'5px', fontSize:"14px", fontWeight:'500', padding:'8px'}}>
              <LocationOnIcon style={{fontSize:'24px', marginBottom:'20px'}} />
              <p>Location</p>
            </SwiperSlide>
            <SwiperSlide style={{backgroundColor:"rgb(233,246,254)", color:'rgb(2,132,199)', height:'80px', width:'100px', borderRadius:'5px', fontSize:"14px", fontWeight:'500', padding:'8px'}}>
              <EmojiEmotionsIcon style={{fontSize:'24px', marginBottom:'20px'}}/>
              <p>Reel</p>
            </SwiperSlide>
          </Swiper>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
}

export default AddDropdown