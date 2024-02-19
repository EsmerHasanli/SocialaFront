import React, { useContext } from 'react'
import './index.scss'   
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import SearchUsers from '../SearchUsers';

const Navbar = () => {   
  const {store} = useContext(Context)

  return (
    <header>
        <nav>
            <div className="wrapper">
                <div className="left-bar">
                    <Link to='/'>
                        <img className='desktop' src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png" alt="Socialate" />
                        <img className='mobile' src="https://res.cloudinary.com/dg28bvc8m/image/upload/v1708340044/ubgagnsolorwnwnkvwmx.png" alt="Socialite" />
                    </Link>
                </div>
                <div className="center-bar">
                    <SearchUsers/>
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