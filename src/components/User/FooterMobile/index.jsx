import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import "./index.scss";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Context } from '../../../main'
import { FollowContext } from "../../../context";

const FooterMobile = () => {
  const { store } = React.useContext(Context)
  const [value, setValue] = React.useState("recents");
  const {unreadedMessagesCount, setUnreadedMessagesCount} = React.useContext(FollowContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="mobile-footer">
      <BottomNavigation
        lg={false}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999 }}
        value={value}
        onChange={handleChange}
      >
      {
        store.user.roles.includes("Admin") || store.user.roles.includes("Moderator") ? 
          <Link to='/admin'>
          <BottomNavigationAction
            label="Dashboard"
            value="dashboard"
            icon={<AdminPanelSettingsIcon />}
          />
        </Link> : null
      }
      <Link className="messages-link" to='/messages'>
      {Number(unreadedMessagesCount) > 0 && Number(unreadedMessagesCount) < 100
          ?
            <div className="messages-count-div">
            {unreadedMessagesCount}
            </div>
          : unreadedMessagesCount > 0 && <div className="messages-count-div" style={{fontSize:"10px", width:"22px", height:"22px", top:"7px", right:"18px"}}>
                99+
            </div>
      }
        <BottomNavigationAction
          label="Messages"
          value="messages"
          icon={<QuestionAnswerIcon />}
        />
      </Link>
      <Link to='/'>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
      </Link>
      <Link to='/settings'>
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </Link>
      <Link to='/archive'>
        <BottomNavigationAction
          label="Archive"
          value="archive"
          icon={<FolderIcon />}
        />
      </Link>
      </BottomNavigation>
    </div>
  );
}

export default observer(FooterMobile)
