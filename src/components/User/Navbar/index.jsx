import React, { useContext } from 'react'
import './index.scss'

import MenuIcon from '@mui/icons-material/Menu';
import { Input } from 'antd';

import AddDropdown from './AddDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
import { IconButton } from '@mui/material';

const Navbar = () => {   
  const {store} = useContext(Context)

  const handleOpenSideBar = () => {
    store.setShowSideBar(!store.showSideBar)
  }

  return (
    <header>
        <nav>
            <div className="wrapper">
                <div className="left-bar">
                    {
                        store.showSideBar && 
                        <IconButton className='mobile' onClick={handleOpenSideBar}>
                            <MenuIcon />
                        </IconButton>
                    }
                    <img className='desktop' src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png" alt="Socialate" />
                    <img className='mobile' src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo-mobile.png" alt="" />
                </div>
                <div className="center-bar">
                    <Input size="large" placeholder='Search Friends, videos... '/>
                </div>
                <div className="right-bar">
                    <ul>
                        <li>
                            <AddDropdown/>
                        </li>
                        <li>
                            <NotificationDropdown/>
                        </li>
                        <li>
                            <ProfileDropdown/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default observer(Navbar)