import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../main';
import './index.scss';
import { Button, Input } from 'antd';
import { Avatar, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { FollowContext } from '../../../context';
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import CloseIcon from '@mui/icons-material/Close';

const SearchUsers = () => {
  const { store } = useContext(Context);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const {currentChatId, setCurrentChatId} = useContext(FollowContext)
  const navigate = useNavigate();

  let send;
  async function search(e) {
    clearTimeout(send)
    if (e?.target?.value?.length) {
      send = setTimeout(async () => 
      {
        const users = await store.searchNavbarUsers(e.target.value, skip)
        console.log(users);
        if (users.length < 10) setShowLoadMore(false) 
        else setShowLoadMore(true)
        setSearchedUsers(users)
        console.log("timeout")

      }
      , 600)
    }
    else setSearchedUsers([])
  }

  useEffect(() => {
    if (skip >= 0) search()
  },[skip])

  return (
    <div id='search-wrapper'>
      <div className="search-inp-wrapper">
        <Input size="large" placeholder='Search friends...' id='userName' name='userName' onChange={search} autoComplete='off'/>
        <IconButton onClick={()=>setSearchedUsers([])}><CloseIcon style={{fontSize:'12px'}}/></IconButton>
      </div>
      {searchedUsers.length > 0 &&<div className="search-results">
        <ul>
          {searchedUsers?.map(user => 
            <li>
              <Link to={`/users/${user.userName}`} className="left">
                <Avatar src={user.imageUrl}/>
                <div className="info">
                  <p>{user.name} {user.surname}</p>
                  <p>@{user.userName}</p>
                </div>
              </Link>
              <div className="right">
                {user.chatId && <IconButton onClick={(e) => {
                  setCurrentChatId(user.chatId);
                  localStorage.setItem("chatId", user.chatId);
                  navigate('/messages')
                  
                }}><MapsUgcIcon/></IconButton>}
              </div>
            </li>
          )}
        </ul>
      {showLoadMore &&
      <Button onClick={(e) => setSkip(skip + 10)}>Load more</Button>}
    </div>}
      
    </div>
  );
};

export default observer(SearchUsers);