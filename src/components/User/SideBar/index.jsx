import React, { useContext } from 'react';
import './index.scss'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';

const SideBar = () =>  {
  const {store} = useContext(Context)

  const handleLogout = async () => {
    await store.logout();
    navigate('/login')
  }
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
          </ul>
  
          <Divider />
  
          <ul className='functions'>
          <li>
              <SettingsIcon/>
              <Link to='/settings'>Settings</Link>
            </li>
            <li onClick={handleLogout}>
              <LogoutIcon/>
              <p>Logout</p>
            </li>
          </ul>
      </div>
    </>
  )
}

export default observer(SideBar)
