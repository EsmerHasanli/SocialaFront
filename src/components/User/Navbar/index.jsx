import React from 'react'
import './index.scss'

import MenuIcon from '@mui/icons-material/Menu';
import { Input } from 'antd';

import AddDropdown from './AddDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {   
  return (
    <header>
        <nav>
            <div className="wrapper">
                <div className="left-bar">
                    <MenuIcon className='mobile'/>
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

export default Navbar