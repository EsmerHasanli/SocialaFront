import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../main';
import './index.scss';
import { Avatar, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { FollowContext } from '../../../context';
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dropdown, Input, Menu } from 'antd';

const SearchUsers = () => {
  const { store } = useContext(Context);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const { currentChatId, setCurrentChatId } = useContext(FollowContext);
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); 

  const navigate = useNavigate();

  let send;
  async function search(searchTerm) {
    clearTimeout(send);
    if (searchTerm) {
      send = setTimeout(async () => {
        const users = await store.searchNavbarUsers(searchTerm, skip);
        console.log(users);
        if (users.length < 10) setShowLoadMore(false);
        else setShowLoadMore(true);
        setSearchedUsers([...users]);
        setShowDropdown(true); 
      }, 600);
    } else {
      setSearchedUsers([]);
      setShowDropdown(false); 
    }
  }
  async function loadMore() {
    if (value) {
      const users = await store.searchNavbarUsers(value, skip);
      console.log(users);
      if (users.length < 10) setShowLoadMore(false);
      else setShowLoadMore(true);
      setSearchedUsers([...searchedUsers, ...users]);
    }
  }

  useEffect(() => {
    if (skip >= 0) search();
  }, [skip]);

  const menu = (
    <Menu id='navbar-search-users-wrapper' style={{ maxHeight: 300, overflowY: 'auto' }}>
      {searchedUsers?.map(user => (
        <Menu.Item key={user.userName}>
          <Link className="left" to={`/users/${user.userName}`}>
            <Avatar src={user.imageUrl} />
            <div className="info">
              <p>{user.name} {user.surname}</p>
              <p>@{user.userName}</p>
            </div>
          </Link>
          <div className="right">
            {user.chatId && <IconButton onClick={(e) => {
              setCurrentChatId(user.chatId);
              localStorage.setItem("chatId", user.chatId);
              navigate('/messages');
            }}><MapsUgcIcon /></IconButton>}
          </div>
        </Menu.Item>
      ))}
      {showLoadMore &&
        <Menu.Item>
          <Button onClick={(e) => {
            setSkip(skip + 10);
            loadMore();
          }}>Load more</Button>
        </Menu.Item>}
    </Menu>
  );

  return (
    <div id='search-wrapper'>
      <div className="search-inp-wrapper">
        <Input size="large" placeholder='Search friends...' id='userName' name='userName' value={value} onChange={(e) => {
          setValue(e.target.value);
          search(e.target.value);
        }} autoComplete='off' />
        {searchedUsers.length > 0 &&
        <IconButton onClick={() => {
          setSearchedUsers([]);
          setValue('');
          setShowDropdown(false); 
        }}>
          <CloseIcon style={{ fontSize: '12px' }} />
        </IconButton>}
      </div>
      {searchedUsers.length > 0 &&
          <Dropdown
            visible={showDropdown}
            placement="bottom"
            arrow
            overlay={menu}
          >
            <div></div>
          </Dropdown>}
    </div>
  );
};

export default observer(SearchUsers);
