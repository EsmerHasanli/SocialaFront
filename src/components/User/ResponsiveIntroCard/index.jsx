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

const ResponsiveIntroCard = () => {
  const { fetchedUser } = useContext(FollowContext);
  const { store } = useContext(Context);

  return (
    <div id="responsive-intro-card">
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
          {fetchedUser && fetchedUser?.followersCount > 0 && (
            <li>
              <RssFeedOutlinedIcon />
              <span>Followed By {fetchedUser?.followersCount} People</span>
            </li>
          )}

          <li className="social-links">
            {fetchedUser && fetchedUser?.instagramLink && (
              <a href={fetchedUser?.instagramLink}>
                <InstagramIcon />
              </a>
            )}
            {fetchedUser && fetchedUser?.facebookLink && (
              <a href={fetchedUser?.facebookLink}>
                <FacebookOutlinedIcon />
              </a>
            )}
            {fetchedUser && fetchedUser?.githubLink && (
              <a href={fetchedUser?.githubLink}>
                <GitHubIcon />
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(ResponsiveIntroCard);
