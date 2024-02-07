import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import "./index.scss";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const FooterMobile = () => {
  const [value, setValue] = React.useState("recents");

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
      <Link to='/messages'>
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
      </BottomNavigation>
    </div>
  );
}

export default observer(FooterMobile)
