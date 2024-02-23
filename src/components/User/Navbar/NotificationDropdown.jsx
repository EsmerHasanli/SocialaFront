import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";
import { NotificationsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { notifications, setNotifications } = useContext(FollowContext);
  const [hasNewNotifications, setHasNewNotifications] = useState(
    notifications.find((n) => n.isChecked == false) ? true : false
  );
  const open = Boolean(anchorEl);
  

  const { store } = useContext(Context);

  useEffect(() => {
    if (notifications.find((n) => n.isChecked == false)) {
      setHasNewNotifications(true);
    } else setHasNewNotifications(false);
  }, [notifications]);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (hasNewNotifications) {
      const notificationsIds = notifications.map((obj) => obj.id);
      const formData = new FormData();
      for (let i = 0; i < notificationsIds.length; i++) {
        formData.append("notificationsIds", notificationsIds[i]);
      }
      await store.checkNotifications(formData);
    }
    setHasNewNotifications(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="notification-dropdown">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, overflow: "visible" }}>
              <Badge color="error" variant="dot" invisible={!hasNewNotifications}>
                <NotificationsOutlined style={{ color: "rgb(88,80,236)" }} />
              </Badge>
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications?.map((notification, key) => (
          <MenuItem key={key} onClick={handleClose}>
            <div>
              {notification.type == "Custom" ? (
                <Avatar src={notification.sourceUrl} />
              ) : notification.type == "Email" ? (
                "🎊"
              ) : (
                "🛠️"
              )}
            </div>
            <Link to={`users/${notification.userName}`}>
              <p>{notification.text}</p>
              <article>{notification.sendedAt}</article>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default observer(NotificationDropdown);