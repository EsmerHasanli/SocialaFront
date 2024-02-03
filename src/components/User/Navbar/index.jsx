import React from 'react'
import './index.scss'

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
                    <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png" alt="Socialate" />
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