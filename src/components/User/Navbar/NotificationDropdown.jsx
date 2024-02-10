import React, { useContext, useEffect, useState } from 'react'

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
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Context } from '../../../main';
import * as signalR from '@microsoft/signalr';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

const NotificationDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {store} = useContext(Context);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7023/notificationHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

            connection.start().then(() => {
                connection.invoke("Connect", store.user.userName)
                .then(() => {
                    console.log("Connected successfully and user connected.");
                })
                .catch((error) => {
                    console.error(`Error connecting to hub: ${error}`);
                });
                
            }).catch(err => console.error(err));
            connection.onreconnected(() => {
                console.log("reconnected")
                connection.invoke("Connect", store.user.userName)
            })
            connection.onclose("Disconnect", store.user.userName)
            connection.on('NewNotification', (message) => {
                setNotifications( prev => [{...message}, ...prev]);
            });
            connection.on('LatestNotifications', (message) => {
                setNotifications(message);
            });
            
        return () => {
            connection.stop();
        };
    }, []);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div className='notification-dropdown'>
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
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications?.map(notification =>
            <MenuItem onClick={handleClose}>
              <div>
                <Avatar src={notification.sourceUrl} /> 
              </div>
              <div>
                <p><b>{notification.userName}</b> {notification.text}</p>
                <article>{notification.sendedAt}</article>
              </div>
            </MenuItem>
          )}

          

        </Menu>
      </div>
    );
}

export default observer(NotificationDropdown)