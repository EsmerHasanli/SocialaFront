import React, { useContext, useEffect } from "react";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Typography, Divider, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = () => {
  const { store } = useContext(Context)
  const drawerWidth = 240;
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [verifyRequestsCount, setVerifyRequestsCount] = React.useState(0);

  useEffect(() => {
    async function getVerifyRequestsCount() {
        const count = await store.getVerifyRequestsCount();
        setVerifyRequestsCount(count)
    }
    getVerifyRequestsCount();
  })
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    await store.logout();
    navigate("/login");
  };

  return (
    <Box id="admin-nav" sx={{ display: "flex", margin: "0", padding: "0" }}>
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(279deg, rgba(189,56,236,1) 0%, rgba(109,65,242,1) 100%)",
          color: "white",
          margin: "0",
          padding: "0",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo-mobile-light.png"
            alt=""
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Typography variant="h6">{store.user.userName}</Typography>
            <Avatar src={store.user.imageUrl} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <List>
          {
            store.user.roles.includes("Moderator") || store.user.roles.includes("Admin") &&
            <>
            <Link to="/admin">
              <ListItem button>
                <ListItemIcon>
                  <img
                    style={{ width: "26px", height: "26px" }}
                    src="https://cdn-icons-png.flaticon.com/512/8901/8901603.png"
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/verify-requests/1">
            <ListItem button>
              <ListItemIcon>
                <img
                  style={{ width: "26px", height: "26px" }}
                  src="https://cdn-icons-png.flaticon.com/512/6713/6713086.png"
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Verify Requests" />
              <div className="verify-requests-count">{verifyRequestsCount}</div>
            </ListItem>
          </Link>
            </>
          }
          {
            store.user.roles.includes("Admin") && 
            <Link to="/roles">
              <ListItem>
                <ListItemIcon>
                  <img
                    style={{ width: "26px", height: "26px" }}
                    src="https://cdn-icons-png.flaticon.com/512/6713/6713086.png"
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItem>
            </Link>
          }
       
          <Link to="/messages">
            <ListItem button>
              <ListItemIcon>
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png"
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png"
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItem>
          </Link>
          <ListItem onClick={handleLogout} style={{cursor:"pointer"}}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default observer(Navigation);
