import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";

import { Avatar, Box, Divider, Grid, IconButton, Tab, Tabs, Typography,} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserInfoForm from "../../../components/User/UserSettings/UserInfoForm";
import SocialLinks from "../../../components/User/UserSettings/SocialLinks";
import PasswordReset from "../../../components/User/UserSettings/PasswordReset";
import Notifications from "../../../components/User/UserSettings/Notification";
import { FollowContext } from "../../../context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const {userAvatar} = useContext(Context)

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
  const {store} = useContext(Context)
  const { userAvatar } = useContext(FollowContext);

  const [value, setValue] = useState(localStorage.getItem("tabValue") ? JSON.parse(localStorage.getItem("tabValue")) : 0);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => console.log(photo), [photo])

  function handleFileChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleChange = (event, newValue) => {
    localStorage.setItem("tabValue", newValue);
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Socialite | Settings</title>
      </Helmet>
      <section id="user-settings">
        <Grid container spacing={2}>
          <Grid item xs={false} lg={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <div className="settings-wrapper">
              <div className="header">
                <div className="current-info-wrapper">
                  <div className="left">
                    <Avatar
                      className="avatar"
                      alt="Avatar"
                      src={userAvatar}
                      sx={{ width: 100, height: 100 }}
                    />
                    <input
                      className="avatar-input"
                      accept="image/*"
                      id="avatar-upload"
                      type="file"
                      onChange={handleFileChange}
                      
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
                    <div>
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
                </div>
                  {previewUrl &&
                  <div className="new-photo">
                    <p>New avatar prewiew: </p>
                   <Avatar
                      className="avatar"
                      alt="Avatar"
                      src={previewUrl}
                      
                      sx={{ width: 100, height: 100 }}
                    />
                  </div>
                    }
              </div>

              <Divider />

              <Box sx={{ with: "100%" }}>
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab label="User" id="tab-0" />
                  <Tab label="Social Media" id="tab-1" />
                  <Tab label="Password" id="tab-2" />
                  <Tab label="Notifications" id="tab-3" />
                </Tabs>
                <TabPanel style={{padding:'48px 80px'}} id='user-info-form' value={value} index={0}>
                  <UserInfoForm photo={photo} setPreviewUrl={setPreviewUrl} />
                </TabPanel>
                <TabPanel style={{padding:'48px 80px'}} id='user-social-links' value={value} index={1}>
                  <SocialLinks photo={photo} setPreviewUrl={setPreviewUrl} />
                </TabPanel>
                <TabPanel style={{padding:'48px 80px'}} id='user-password-form' value={value} index={2}>
                  <PasswordReset photo={photo} setPreviewUrl={setPreviewUrl} />
                </TabPanel>
                <TabPanel style={{padding:'48px 80px'}} id='user-notifications-form' value={value} index={3}>
                  <Notifications photo={photo} setPreviewUrl={setPreviewUrl} />
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