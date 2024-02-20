import React, { useContext, useState } from 'react';
import { Context } from '../../../main';
import './index.scss';
import { Input } from 'antd';
import { Avatar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';


const SearchUsers = () => {
  const { store } = useContext(Context);
  const [searchedUsers, setSearchedUsers] = useState([]);

  let send;
  async function search(e) {
    clearTimeout(send)
    if (e.target.value.length) {
      send = setTimeout(async () => 
      {
        const users = await store.getSearchedUsers(e.target.value, 0)
        console.log(users);
        setSearchedUsers(users)

      }
      , 600)
    }
    else setSearchedUsers([])
  }

  const searchResults = (
    <div className="search-results">
      <ul>
        {/* {searchedUsers && searchedUsers.map(user => (
          <Link to={`/users/${user.id}`}>
            <li key={user?.id}>
              <Avatar src={user?.imageUrl} />
              <p>{user?.userName}</p>
            </li>
          </Link>
        ))} */}
        <li>
          <Avatar/>
          <p>username</p>
        </li>
        <li>
          <Avatar/>
          <p>username</p>
        </li>
        <li>
          <Avatar/>
          <p>username</p>
        </li>
        <li>
          <Avatar/>
          <p>username</p>
        </li>
      </ul>
    </div>
  );

  return (
    <div id='search-wrapper'>
      <Input size="large" placeholder='Search friends...' id='userName' name='userName' onChange={search} autoComplete='off'/>
      {searchedUsers.length>0 && createPortal(searchResults, document.body)}
    </div>
  );
};

export default observer(SearchUsers);
