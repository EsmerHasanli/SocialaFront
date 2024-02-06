import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';

const SideBar = () =>  {

  return(
    <>
      <div id='side-bar'> 
          <ul className='pages'>
            <li>
              <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/home.png" alt="" />
              <Link to='/'>Feed</Link>
            </li>
  
            <li>
              <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/message.png" alt="" />
              <Link to='/messages'>Messages</Link>
            </li>
  
            <li>
              <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/icons/video.png" alt="" />
              <Link to='/video'>Video</Link>
            </li>
          </ul>
  
          <Divider />
  
          <ul className='functions'>
          <li>
              <SettingsIcon/>
              <p>Settings</p>
            </li>
            <li>
              <LogoutIcon/>
              <p>Logout</p>
            </li>
          </ul>
      </div>
    </>
  )
}

export default SideBar
