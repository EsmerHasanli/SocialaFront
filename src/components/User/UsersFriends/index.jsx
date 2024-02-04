import React from 'react'
import './index.scss';

const UsersFriendsCard = () => {
  return (
    <div id='users-friends-card'>
        <div className="header">
            <div>
                <h3>Friends</h3>
                <p>3489 Friends</p>
            </div>
            <button>Show All</button>
        </div>
        <div className="friends-cards-wrapper">
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
            <div className="friend-card">
                <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-7.jpg" alt="" />
                <h5>Jesse Steeve</h5>
            </div>
        </div>
    </div>
  )
}

export default UsersFriendsCard