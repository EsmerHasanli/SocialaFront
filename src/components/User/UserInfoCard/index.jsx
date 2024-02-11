import React, { useContext } from "react";
import "./index.scss";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import { FollowContext } from "../../../context";
import { Link } from "react-router-dom";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

const UserInfoCard = () => {
  const { fetchedUser } = useContext(FollowContext);
  const { store } = useContext(Context);
  return (
    <div id="user-info-card">
      <div className="header">
        <h3>Intro</h3>
        {store.user.userName === fetchedUser.userName && (
          <Link to="/settings">Edit</Link>
        )}
      </div>
      <div className="info">
        <ul>
          {fetchedUser && fetchedUser?.address && (
            <li>
              <LocationOnOutlinedIcon />
              <span>
                Live In <b>{fetchedUser?.address}</b>
              </span>
            </li>
          )}
          {fetchedUser && fetchedUser?.studyPlace && (
            <li>
              <SchoolOutlinedIcon />
              <span>
                Studied at <b>{fetchedUser?.studyPlace}</b>
              </span>
            </li>
          )}
          {fetchedUser && fetchedUser?.worksPlace && (
            <li>
              <WorkOutlineOutlinedIcon />
              <span>
                Works at <b>{fetchedUser?.worksPlace}</b>
              </span>
            </li>
          )}
          {fetchedUser && fetchedUser?.followers && (
            <li>
              <RssFeedOutlinedIcon />
              <span>Followed By {fetchedUser?.followers.length} People</span>
            </li>
          )}
          {fetchedUser && fetchedUser?.facebookLink && (
            <li>
              <InstagramIcon />
              <span>
                Instagram{" "}
                <a href={fetchedUser?.instagramLink}>
                  <b>{fetchedUser?.instagramLink}</b>
                </a>
              </span>
            </li>
          )}
          {fetchedUser && fetchedUser?.facebookLink && (
            <li>
              <FacebookOutlinedIcon />
              <span>
                Facebook:{" "}
                <a href={fetchedUser?.facebookLink}>
                  <b>{fetchedUser?.facebookLink}</b>
                </a>
              </span>
            </li>
          )}
          {fetchedUser && fetchedUser?.githubLink && (
            <li>
              <GitHubIcon />
              <span>
                GitHub{" "}
                <a href={fetchedUser?.githubLink}>
                  <b>{fetchedUser?.githubLink}</b>
                </a>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default observer(UserInfoCard);
