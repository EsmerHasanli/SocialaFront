import React, { useContext, useEffect, useState } from 'react';
import './index.scss'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';

const SideBar = () =>  {
  const { store } = useContext(Context);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  console.log(window.innerWidth);
  // useEffect(() => {
  //   // Function to update screenWidth state
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   // Add event listener to update screenWidth state when window is resized
  //   window.addEventListener('resize', handleResize);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []); 

  return(
    <>
      {window.innerWidth == 1024 &&
        <div className='side-bar'> 
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
      }
    </>
  )
}

export default observer(SideBar)
