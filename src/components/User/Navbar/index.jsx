import React, { useContext } from 'react'
import './index.scss'

import { Input } from 'antd';

// import AddDropdown from './AddDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const Navbar = () => {   
  const {store} = useContext(Context)

  return (
    <header>
        <nav>
            <div className="wrapper">
                <div className="left-bar">
                    <Link to='/'>
                        <img className='desktop' src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png" alt="Socialate" />
                    </Link>
                </div>
                <div className="center-bar">
                    <Input size="large" placeholder='Search Friends, videos... '/>
                </div>
                <div className="right-bar">
                    <ul>
                        {/* <li>
                            <AddDropdown/>
                        </li> */}
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