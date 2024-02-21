import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../main';
import './index.scss';
import { Button, Input } from 'antd';
import { Avatar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';


const SearchUsers = () => {
  const { store } = useContext(Context);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);

  let send;
  async function search(e) {
    clearTimeout(send)
    if (e.target.value.length) {
      send = setTimeout(async () => 
      {
        const users = await store.searchNavbarUsers(e.target.value, skip)
        console.log(users);
        if (users.length < 10) setShowLoadMore(false) 
        else setShowLoadMore(true)
        setSearchedUsers(users)

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
      <Input size="large" placeholder='Search friends...' id='userName' name='userName' onChange={search} autoComplete='off'/>
      {searchedUsers.length > 0 &&<div className="search-results">
        <ul>
          {searchedUsers?.map(user => 
            <li>
              <Avatar src={user.imageUrl}/>
              <p>{user.userName}</p>
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