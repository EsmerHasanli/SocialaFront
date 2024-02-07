import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SettingsIcon from '@mui/icons-material/Settings';
import "./index.scss";
import { observer } from "mobx-react-lite";

const FooterMobile = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="mobile-footer">
      <BottomNavigation
        lg={false}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Messages"
          value="messages"
          icon={<QuestionAnswerIcon />}
        />
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default observer(FooterMobile)
