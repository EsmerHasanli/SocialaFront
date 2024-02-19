import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../../../main'

const Searchusers = ({searchedUsers, setSearchedUsers}) => {
  const { store } = useContext(Context)

  const [skip, setSkip] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  
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

  return (
    <Input className='search-input' placeholder='Search users' id='userName' name='userName' onChange={search} autoComplete='off' />
  )
}

export default observer(Searchusers)