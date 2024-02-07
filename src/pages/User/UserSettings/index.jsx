import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserInfoForm from "../../../components/User/UserSettings/UserInfoForm";
import SocialLinks from "../../../components/User/UserSettings/SocialLinks";
import PasswordReset from "../../../components/User/UserSettings/PasswordReset";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserSettings = () => {
  const { store } = useContext(Context);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Socialite | Settings</title>
      </Helmet>
      <section id="user-settings">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <div className="settings-wrapper">
              <div className="header">
                <div className="left">
                  <Avatar
                    className="avatar"
                    alt="Avatar"
                    src={store.user.imageUrl}
                    sx={{ width: 100, height: 100 }}
                  />
                  <input
                    className="avatar-input"
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                  />
                  <label htmlFor="avatar-upload" className="avatar-upload">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{
                        backgroundColor: "rgb(71,85,105)",
                        color: "white",
                        border: "3px solid white",
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <div className="right">
                  <h4>
                    {store.user.name} {store.user.surname}
                  </h4>
                  <h6>
                    <Link to={`/users/${store.user.userName}`}>
                      @{store.user.userName}
                    </Link>
                  </h6>
                </div>
              </div>

              <Divider />

              <Box sx={{ with: "100%" }}>
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab label="User" id="tab-0" />
                  <Tab label="Social Media" id="tab-1" />
                  <Tab label="Password" id="tab-2" />
                </Tabs>
                <TabPanel style={{padding:'48px 80px'}} id='user-info-form' value={value} index={0}>
                  <UserInfoForm/>
                </TabPanel>
                <TabPanel style={{padding:'48px 80px'}} id='user-social-links' value={value} index={1}>
                  <SocialLinks/>
                </TabPanel>
                <TabPanel style={{padding:'48px 80px'}} id='user-password-form' value={value} index={2}>
                  <PasswordReset/>
                </TabPanel>
              </Box>
            </div>
          </Grid>
        </Grid>
        <FooterMobile />
      </section>
    </>
  );
};

export default observer(UserSettings);
