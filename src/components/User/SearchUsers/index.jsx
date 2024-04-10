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
  const [ value, setValue ] = useState('')
  
  const navigate = useNavigate();

  let send;
  async function search(searchTerm) {
    clearTimeout(send)
    if (searchTerm) {
      send = setTimeout(async () => 
      {
        const users = await store.searchNavbarUsers(searchTerm, skip)
        console.log(users);
        if (users.length < 10) setShowLoadMore(false) 
        else setShowLoadMore(true)
        setSearchedUsers([...users])
      }
      , 600)
    }
    else setSearchedUsers([])
  }
  async function loadMore() {
    if (value) {
      const users = await store.searchNavbarUsers(value, skip)
      console.log(users);
      if (users.length < 10) setShowLoadMore(false) 
      else setShowLoadMore(true)
      setSearchedUsers([...searchedUsers, ...users])
    }
  }

  useEffect(() => {
    if (skip >= 0) search()
  },[skip])

  return (
    <div id='search-wrapper'>
      <div className="search-inp-wrapper">
        <Input size="large" placeholder='Search friends...' id='userName' name='userName' value={value} onChange={(e) => {
          setValue(e.target.value);
          search(e.target.value);

          }} autoComplete='off'/>
        <IconButton onClick={()=>{
          setSearchedUsers([])
          setValue('')
        }}><CloseIcon style={{fontSize:'12px'}}/></IconButton>
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
      <Button onClick={(e) => {
        setSkip(skip + 10)
        loadMore();
        }}>Load more</Button>}
    </div>}
      
    </div>
  );
};

export default observer(SearchUsers);